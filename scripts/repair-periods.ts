import db from '../lib/db';
import { monthlySnapshots, users } from '../db/schema';
import { sql, and, eq } from 'drizzle-orm';

/**
 * Repair script to fix the incorrect period closures
 * - Reopen 2026-01-09 (set endSnapshotAmount to NULL)
 * - Close 2025-12-10 with current API values
 */
async function main() {
    console.log('=== Repairing Period Closures ===\n');
    
    // Step 1: Reopen all 2026-01-09 snapshots
    console.log('Step 1: Reopening 2026-01-09 period...');
    const reopenResult = await db.update(monthlySnapshots)
        .set({ endSnapshotAmount: null })
        .where(sql`DATE(${monthlySnapshots.periodStartDate}) = '2026-01-09'`);
    
    console.log('✓ Reopened 2026-01-09 snapshots\n');
    
    // Step 2: Close all 2025-12-10 snapshots with current lifetime wager values
    console.log('Step 2: Closing 2025-12-10 period with current wager values...');
    
    const openSnapshots = await db.select({
        snapshotId: monthlySnapshots.id,
        userId: users.id,
        username: users.username,
        currentLifetime: users.current_lifetime_wager,
    })
        .from(monthlySnapshots)
        .innerJoin(users, eq(users.id, monthlySnapshots.userId))
        .where(and(
            sql`DATE(${monthlySnapshots.periodStartDate}) = '2025-12-10'`,
            sql`${monthlySnapshots.endSnapshotAmount} IS NULL`
        ));
    
    console.log(`Found ${openSnapshots.length} open snapshots for 2025-12-10`);
    
    let closed = 0;
    for (const snap of openSnapshots) {
        await db.update(monthlySnapshots)
            .set({ endSnapshotAmount: snap.currentLifetime })
            .where(eq(monthlySnapshots.id, snap.snapshotId));
        
        closed++;
        if (closed % 50 === 0) {
            console.log(`Progress: ${closed}/${openSnapshots.length}...`);
        }
    }
    
    console.log(`✓ Closed ${closed} snapshots for 2025-12-10\n`);
    
    console.log('=== Repair Complete ===');
    console.log('\nRun verification to confirm:');
    console.log('  npx tsx scripts/verify-transition.ts');
    
    process.exit(0);
}

main().catch(error => {
    console.error('Error:', error);
    process.exit(1);
});
