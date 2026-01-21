import db from '../lib/db';
import { monthlySnapshots, users } from '../db/schema';
import { sql, eq } from 'drizzle-orm';
import { getPeriodStartDate } from '../lib/dateUtils';

async function main() {
    const currentPeriod = getPeriodStartDate();
    const currentIso = currentPeriod.toISOString().split('T')[0];
    
    console.log(`Current period: ${currentIso}\n`);
    
    // Count snapshots for current period
    const currentCount = await db.select({ count: sql`COUNT(*)` })
        .from(monthlySnapshots)
        .where(sql`DATE(${monthlySnapshots.periodStartDate}) = ${currentIso}`);
    
    console.log(`Snapshots for ${currentIso}: ${currentCount[0].count}`);
    
    // Count snapshots for previous period (2025-12-10)
    const prevIso = '2025-12-10';
    const prevCount = await db.select({ count: sql`COUNT(*)` })
        .from(monthlySnapshots)
        .where(sql`DATE(${monthlySnapshots.periodStartDate}) = ${prevIso}`);
    
    console.log(`Snapshots for ${prevIso}: ${prevCount[0].count}`);
    
    // Show a sample user's snapshots
    const sampleUser = await db.select()
        .from(users)
        .limit(1);
    
    if (sampleUser.length > 0) {
        console.log(`\nSample user: ${sampleUser[0].username}`);
        console.log(`  Current lifetime wager: ${sampleUser[0].current_lifetime_wager}`);
        
        const userSnaps = await db.select()
            .from(monthlySnapshots)
            .where(eq(monthlySnapshots.userId, sampleUser[0].id));
        
        console.log(`  Snapshots:`);
        userSnaps.forEach(s => {
            const dateStr = s.periodStartDate.toISOString().split('T')[0];
            console.log(`    ${dateStr}: start=${s.startSnapshotAmount}, end=${s.endSnapshotAmount}`);
        });
    }
    
    process.exit(0);
}

main().catch(console.error);
