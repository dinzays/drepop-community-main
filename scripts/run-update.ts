import { updateLeaderboard } from '@/lib/leaderboard-service';

async function main() {
    try {
        await updateLeaderboard();
        console.log("Success");
        process.exit(0);
    } catch (e) {
        console.error("Error:", e);
        process.exit(1);
    }
}
main();
