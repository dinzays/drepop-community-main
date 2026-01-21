import db from '../lib/db';
import { monthlySnapshots } from '../db/schema';
import { sql, and, eq } from 'drizzle-orm';

/**
 * Fix 2026-01-09 snapshots to use the correct start amounts
 * (should be the end value of 2025-12-10, not the current API value)
 */
async function main() {
    console.log('=== Fixing 2026-01-09 Start Amounts ===\n');
    
    // Get all 2026-01-09 snapshots
    const jan09Snapshots = await db.select({
        id: monthlySnapshots.id,
        userId: monthlySnapshots.userId,
        currentStart: monthlySnapshots.startSnapshotAmount,
    })
        .from(monthlySnapshots)
        .where(sql`DATE(${monthlySnapshots.periodStartDate}) = '2026-01-09'`);
    
    console.log(`Found ${jan09Snapshots.length} snapshots for 2026-01-09\n`);
    
    let fixed = 0;
    
    for (const snap of jan09Snapshots) {
        // Find the 2025-12-10 snapshot for this user
        const dec10Snapshot = await db.query.monthlySnapshots.findFirst({
            where: and(
                eq(monthlySnapshots.userId, snap.userId),
                sql`DATE(${monthlySnapshots.periodStartDate}) = '2025-12-10'`
            ),
        });
        
        if (dec10Snapshot && dec10Snapshot.endSnapshotAmount) {
            // Update the 2026-01-09 start to match the 2025-12-10 end
            await db.update(monthlySnapshots)
                .set({ startSnapshotAmount: dec10Snapshot.endSnapshotAmount })
                .where(eq(monthlySnapshots.id, snap.id));
            
            fixed++;
            
            if (fixed % 50 === 0) {
                console.log(`Progress: ${fixed}/${jan09Snapshots.length}...`);
            }
        }
    }
    
    console.log(`\n✓ Fixed ${fixed} snapshots`);
    console.log('\nVerify with:');
    console.log('  npx tsx scripts/verify-transition.ts');
    
    process.exit(0);
}

main().catch(error => {
    console.error('Error:', error);
    process.exit(1);
});
