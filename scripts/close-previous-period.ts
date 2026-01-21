import db from '../lib/db';
import { monthlySnapshots, users } from '../db/schema';
import { sql, and, eq } from 'drizzle-orm';

/**
 * One-time script to close all open snapshots for the 2025-12-10 period
 * by setting their endSnapshotAmount to match the current lifetime wager
 */
async function main() {
    console.log('=== Closing Previous Period (2025-12-10) ===\n');
    
    const prevPeriod = '2025-12-10';
    
    // Get all users with open snapshots for 2025-12-10
    const openSnapshots = await db.select({
        userId: monthlySnapshots.userId,
        username: users.username,
        currentLifetime: users.current_lifetime_wager,
        snapshotId: monthlySnapshots.id,
        startAmount: monthlySnapshots.startSnapshotAmount,
    })
        .from(monthlySnapshots)
        .innerJoin(users, eq(users.id, monthlySnapshots.userId))
        .where(and(
            sql`DATE(${monthlySnapshots.periodStartDate}) = ${prevPeriod}`,
            sql`${monthlySnapshots.endSnapshotAmount} IS NULL`
        ));
    
    console.log(`Found ${openSnapshots.length} open snapshots for ${prevPeriod}\n`);
    
    if (openSnapshots.length === 0) {
        console.log('✓ No open snapshots to close. All done!');
        process.exit(0);
    }
    
    let updated = 0;
    
    for (const snap of openSnapshots) {
        // Set endSnapshotAmount to current lifetime wager
        await db.update(monthlySnapshots)
            .set({ endSnapshotAmount: snap.currentLifetime })
            .where(eq(monthlySnapshots.id, snap.snapshotId));
        
        updated++;
        
        if (updated % 50 === 0) {
            console.log(`Progress: ${updated}/${openSnapshots.length} snapshots closed...`);
        }
    }
    
    console.log(`\n✓ Successfully closed ${updated} snapshots for period ${prevPeriod}`);
    console.log('\nNow run the verification script to confirm:');
    console.log('  npx tsx scripts/verify-transition.ts');
    
    process.exit(0);
}

main().catch(error => {
    console.error('Error:', error);
    process.exit(1);
});
