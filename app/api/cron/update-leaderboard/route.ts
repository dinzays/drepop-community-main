import { updateLeaderboard } from '@/lib/leaderboard-service';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensure this route is not cached

export async function GET() {
    try {
        await updateLeaderboard();
        return NextResponse.json({ success: true, message: 'Leaderboard updated successfully' });
    } catch (error) {
        console.error('Leaderboard update failed:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
