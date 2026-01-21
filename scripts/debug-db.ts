import db from '../lib/db';
import { monthlySnapshots } from '../db/schema';

async function main() {
    console.log('Querying snapshots...');
    const snaps = await db.select().from(monthlySnapshots);
    console.log('Found', snaps.length, 'snapshots');
    if (snaps.length > 0) {
        const s = snaps[0];
        console.log('Sample snapshot date:', s.periodStartDate);
        console.log('Constructor:', s.periodStartDate ? s.periodStartDate.constructor.name : 'N/A');
        console.log('ISO:', s.periodStartDate ? s.periodStartDate.toISOString() : 'N/A');

        console.log('All Dates in DB:');
        snaps.forEach(snap => {
            console.log(`- ${snap.periodStartDate.toISOString()} (ID: ${snap.id})`);
        });
    }
    process.exit(0);
}

main().catch(console.error);
