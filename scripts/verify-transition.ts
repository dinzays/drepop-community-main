import db from '../lib/db';
import { monthlySnapshots, users } from '../db/schema';
import { sql, eq } from 'drizzle-orm';
import * as fs from 'fs';

async function main() {
    const output: string[] = [];
    output.push('=== VERIFICATION: Period Transition Check ===\n');
    
    // Check both periods
    const periods = ['2025-12-10', '2026-01-09'];
    
    for (const periodStr of periods) {
        const count = await db.select({ count: sql<number>`COUNT(*)` })
            .from(monthlySnapshots)
            .where(sql`DATE(${monthlySnapshots.periodStartDate}) = ${periodStr}`);
        
        output.push(`Period ${periodStr}: ${count[0].count} snapshots`);
    }
    
    output.push('\n--- Sample User Data ---');
    
    // Get a user with activity
    const sampleUser = await db.select()
        .from(users)
        .limit(1);
    
    if (sampleUser.length > 0) {
        const username = sampleUser[0].username;
        const userId = sampleUser[0].id;
        const currentLifetime = sampleUser[0].current_lifetime_wager;
        
        output.push(`\nUser: ${username}`);
        output.push(`Current Lifetime Wager: ${currentLifetime}`);
        
        const userSnaps = await db.select()
            .from(monthlySnapshots)
            .where(eq(monthlySnapshots.userId, userId))
            .orderBy(monthlySnapshots.periodStartDate);
        
        output.push(`\nSnapshots:`);
        userSnaps.forEach(s => {
            const dateStr = s.periodStartDate.toISOString().split('T')[0];
            const status = s.endSnapshotAmount ? 'CLOSED' : 'ONGOING';
            output.push(`  [${status}] ${dateStr}:`);
            output.push(`    Start: ${s.startSnapshotAmount}`);
            output.push(`    End: ${s.endSnapshotAmount || 'null (ongoing)'}`);
        });
        
        // Validate
        if (userSnaps.length >= 2) {
            const oldPeriod = userSnaps.find(s => s.periodStartDate.toISOString().includes('2025-12-10'));
            const newPeriod = userSnaps.find(s => s.periodStartDate.toISOString().includes('2026-01-09'));
            
            output.push('\n--- Validation ---');
            
            if (oldPeriod && oldPeriod.endSnapshotAmount) {
                output.push('✓ Previous period (2025-12-10) is CLOSED');
            } else if (oldPeriod) {
                output.push('✗ Previous period (2025-12-10) is still OPEN');
            }
            
            if (newPeriod && !newPeriod.endSnapshotAmount) {
                output.push('✓ New period (2026-01-09) is ONGOING');
            } else if (!newPeriod) {
                output.push('✗ New period (2026-01-09) does not exist');
            }
        }
    }
    
    const result = output.join('\n');
    console.log(result);
    fs.writeFileSync('verification-result.txt', result);
    process.exit(0);
}

main().catch(console.error);
