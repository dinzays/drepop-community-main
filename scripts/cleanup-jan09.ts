import db from '../lib/db';
import { monthlySnapshots } from '../db/schema';
import { sql } from 'drizzle-orm';

/**
 * Delete all 2026-01-09 snapshots so they can be recreated with correct values
 * This is needed because they were created before we fixed the previous period closure logic
 */
async function main() {
    console.log('=== Cleaning up 2026-01-09 snapshots ===\n');
    
    const period = '2026-01-09';
    
    // Count first
    const count = await db.select({ count: sql<number>`COUNT(*)` })
        .from(monthlySnapshots)
        .where(sql`DATE(${monthlySnapshots.periodStartDate}) = ${period}`);
    
    console.log(`Found ${count[0].count} snapshots for ${period}`);
    
    if (count[0].count === 0) {
        console.log('Nothing to delete.');
        process.exit(0);
    }
    
    // Delete
    await db.delete(monthlySnapshots)
        .where(sql`DATE(${monthlySnapshots.periodStartDate}) = ${period}`);
    
    console.log(`✓ Deleted all ${count[0].count} snapshots for ${period}`);
    console.log('\nNow run the update to recreate them properly:');
    console.log('  npx tsx scripts/run-update.ts');
    
    process.exit(0);
}

main().catch(error => {
    console.error('Error:', error);
    process.exit(1);
});
