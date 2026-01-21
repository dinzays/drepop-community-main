import { eq, and, sql, desc } from 'drizzle-orm';
import db from './db';
import { users, monthlySnapshots } from '@/db/schema';
import { getPeriodStartDate } from './dateUtils';

const SHUFFLE_API_URL = 'https://affiliate.shuffle.com/stats/6d0177c6-9050-4469-8776-ee2b1aac967e';

type ShuffleApiItem = {
    username: string;
    campaignCode: string;
    wagerAmount: number;
};

export async function updateLeaderboard() {
    console.log('Starting leaderboard update...');

    // 1. Fetch data from Shuffle API
    const response = await fetch(SHUFFLE_API_URL, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error(`Failed to fetch from Shuffle API: ${response.statusText}`);
    }
    const data: ShuffleApiItem[] = await response.json();

    // Filter for valid campaign code
    const drepopUsers = data.filter(item => item.campaignCode === 'drepop');

    const currentPeriodStart = getPeriodStartDate();
    console.log(`Current period start date: ${currentPeriodStart.toISOString()}`);

    for (const item of drepopUsers) {
        // 2. Upsert User
        // We use MySQL's ON DUPLICATE KEY UPDATE via Drizzle's $onDuplicateKeyUpdate (if available) or check/update manually.
        // Since Drizzle's MySQL support for upsert can be tricky depending on version, let's try a check first or basic insert/update.
        // Actually, let's use standard insert ... on duplicate key update if possible, or simple check.

        // Simple check-and-update flow for ensuring user exists and updating lifetime wager
        let user = await db.query.users.findFirst({
            where: eq(users.username, item.username)
        });

        if (!user) {
            await db.insert(users).values({
                username: item.username,
                current_lifetime_wager: item.wagerAmount.toString(),
            });
            // Fetch again to get ID
            user = await db.query.users.findFirst({ where: eq(users.username, item.username) });
        } else {
            await db.update(users)
                .set({ current_lifetime_wager: item.wagerAmount.toString() })
                .where(eq(users.id, user.id));
        }

        if (!user) continue; // Should not happen

        // 3. Handle Snapshot
        // Use SQL comparison for date to be safe against timezone mismatches
        const currentIso = currentPeriodStart.toISOString().split('T')[0];

        const snapshot = await db.query.monthlySnapshots.findFirst({
            where: and(
                eq(monthlySnapshots.userId, user.id),
                sql`DATE(${monthlySnapshots.periodStartDate}) = DATE(${currentPeriodStart})`
            )
        });

        if (!snapshot) {
            console.log(`No snapshot found for ${item.username} in period ${currentIso}, creating new snapshot...`);
            
            // First, find the previous period to get its end value
            const previousSnapshot = await db.query.monthlySnapshots.findFirst({
                where: and(
                    eq(monthlySnapshots.userId, user.id),
                    sql`DATE(${monthlySnapshots.periodStartDate}) < DATE(${currentPeriodStart})`
                ),
                orderBy: desc(monthlySnapshots.periodStartDate),
            });

            // Determine the start amount for the new period
            let startAmount: string;
            if (previousSnapshot && previousSnapshot.endSnapshotAmount) {
                // Use the previous period's end value as the new period's start
                startAmount = previousSnapshot.endSnapshotAmount;
                console.log(`Using previous period end (${startAmount}) as start for ${item.username}`);
            } else {
                // First period for this user, start from current API value
                startAmount = item.wagerAmount.toString();
                console.log(`First period for ${item.username}, starting from ${startAmount}`);
            }
            
            // Create new snapshot
            await db.insert(monthlySnapshots).values({
                userId: user.id,
                periodStartDate: currentPeriodStart,
                startSnapshotAmount: startAmount,
            });
            console.log(`✓ Created snapshot for ${item.username} for period ${currentIso}`);

            // Close the previous snapshot if it exists and is still open
            if (previousSnapshot && !previousSnapshot.endSnapshotAmount) {
                const prevIso = previousSnapshot.periodStartDate.toISOString().split('T')[0];
                await db.update(monthlySnapshots)
                    .set({ endSnapshotAmount: item.wagerAmount.toString() })
                    .where(eq(monthlySnapshots.id, previousSnapshot.id));
                
                console.log(`✓ Closed previous period (${prevIso}) for ${item.username}`);
            }
        } else {
            // Snapshot exists for current period - no action needed
        }
    }

    console.log('Leaderboard update complete.');
}

export async function getLeaderboardDisplayData(periodDateStr?: string) {
    const currentPeriodStart = getPeriodStartDate();

    // Parse target date from string (YYYY-MM-DD) -> UTC Date
    // If param is missing, use current period start.
    const targetPeriod = periodDateStr ? new Date(periodDateStr) : currentPeriodStart;

    // Check if target is current to decide calculation mode
    // Compare via ISO string (YYYY-MM-DD) to avoid time issues
    const targetIso = targetPeriod.toISOString().split('T')[0];
    const currentIso = currentPeriodStart.toISOString().split('T')[0];
    const isCurrentPeriod = targetIso === currentIso;

    const results = await db.select({
        username: users.username,
        currentLifetime: users.current_lifetime_wager,
        startSnapshot: monthlySnapshots.startSnapshotAmount,
        endSnapshot: monthlySnapshots.endSnapshotAmount,
    })
        .from(users)
        .innerJoin(monthlySnapshots,
            and(
                eq(monthlySnapshots.userId, users.id),
                sql`DATE(${monthlySnapshots.periodStartDate}) = ${targetIso}`
            )
        );

    // Calculate score
    const leaderboard = results.map(row => {
        let score = 0;
        const start = parseFloat(row.startSnapshot);

        if (isCurrentPeriod) {
            // Live: Current - Start
            const current = parseFloat(row.currentLifetime);
            score = current - start;
        } else {
            // History: End - Start
            if (row.endSnapshot) {
                const end = parseFloat(row.endSnapshot);
                score = end - start;
            } else {
                // FALLBACK: If no end snapshot exists, use current lifetime (treat as ongoing/unclosed)
                const current = parseFloat(row.currentLifetime);
                score = current - start;
            }
        }

        return {
            username: row.username,
            totalWager: score,
        };
    })
        .filter(item => item.totalWager >= 0)
        .sort((a, b) => b.totalWager - a.totalWager);

    return leaderboard;
}

export async function getAvailablePeriods(): Promise<string[]> {
    // Select distinct periodStartDate from monthlySnapshots
    const result = await db.selectDistinct({
        date: monthlySnapshots.periodStartDate
    })
        .from(monthlySnapshots)
        .orderBy(desc(monthlySnapshots.periodStartDate));

    // format as YYYY-MM-DD
    return result.map(r => r.date.toISOString().split('T')[0]);
}
