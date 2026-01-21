import db from '../lib/db';
import { monthlySnapshots, users } from '../db/schema';
import { desc, sql } from 'drizzle-orm';

async function main() {
    console.log('=== LEADERBOARD DEBUG ===\n');
    
    // Get all periods
    const periods = await db.selectDistinct({
        date: monthlySnapshots.periodStartDate
    })
        .from(monthlySnapshots)
        .orderBy(desc(monthlySnapshots.periodStartDate));
    
    console.log(`Found ${periods.length} distinct periods:`);
    periods.forEach(p => {
        console.log(`  - ${p.date.toISOString().split('T')[0]}`);
    });
    
    // Get snapshots grouped by period
    for (const period of periods) {
        const periodStr = period.date.toISOString().split('T')[0];
        console.log(`\n--- Period: ${periodStr} ---`);
        
        const snaps = await db.select({
            username: users.username,
            startSnapshot: monthlySnapshots.startSnapshotAmount,
            endSnapshot: monthlySnapshots.endSnapshotAmount,
            periodStart: monthlySnapshots.periodStartDate,
        })
            .from(monthlySnapshots)
            .innerJoin(users, sql`${users.id} = ${monthlySnapshots.userId}`)
            .where(sql`DATE(${monthlySnapshots.periodStartDate}) = ${periodStr}`)
            .limit(5);
        
        console.log(`  Total snapshots: ${snaps.length}`);
        snaps.forEach(s => {
            console.log(`    ${s.username}: start=${s.startSnapshot}, end=${s.endSnapshot}`);
        });
    }
    
    process.exit(0);
}

main().catch(console.error);
