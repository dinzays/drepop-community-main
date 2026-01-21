import type { Metadata } from 'next';
import { LeaderboardPageClient } from '@/components/LeaderboardPageClient';
import type { LeaderboardRow } from '@/components/LeaderboardTable';
import { getLeaderboardDisplayData, getAvailablePeriods } from '@/lib/leaderboard-service';

export const metadata: Metadata = {
  title: 'Leaderboard'
};

// Revalidate the data every 5 minutes
export const revalidate = 60;

// Calculate reward based on rank (you can adjust these values)
function calculateReward(rank: number): number {
  if (rank === 1) return 400;
  if (rank === 2) return 300;
  if (rank === 3) return 150;
  if (rank === 4) return 100;
  if (rank === 5) return 50;
  if (rank <= 10) return 0;
  return 0;
}

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ month?: string }>;
}) {
  const params = await searchParams;
  const selectedMonth = params?.month;

  // Parse selected month or undefined
  // selectedMonth is now expected to be YYYY-MM-DD

  // Fetch data
  const [dbData, availablePeriods] = await Promise.all([
    getLeaderboardDisplayData(selectedMonth),
    getAvailablePeriods()
  ]);

  // Transform to LeaderboardRow format
  const rows: LeaderboardRow[] = dbData.map((item, index: number) => ({
    rank: index + 1,
    username: item.username,
    totalWager: item.totalWager,
    reward: calculateReward(index + 1)
  }));

  // Calculate stats for LiveStats
  const totalWagerUsd = rows.reduce((acc, row) => acc + row.totalWager, 0);
  const totalRewardsUsd = rows.reduce((acc, row) => acc + row.reward, 0);
  const stats = {
    totalUsers: rows.length,
    totalWagerUsd,
    totalRewardsUsd,
    lastUpdated: new Date().toISOString()
  };

  // Calculate Countdown Target Date
  // If viewing a history month, we might want to hide countdown or just show next 10th relative to real time.
  // The countdown is for the "Upcoming" closure. It should probably always depend on real time?
  // Or if viewing history, "Period Ended on X".
  // Let's keep it real-time based for now as the user asked for "history view".
  // Hardcoded target date as requested: Jan 31, 2026
  const countdownTarget = new Date('2026-01-31T22:00:00');

  // Handle empty state gracefully
  // Logic mostly inside LeaderboardPageClient now? 
  // We should pass periods to client so it can render the selector.

  return (
    <LeaderboardPageClient
      data={rows}
      stats={stats}
      targetDate={countdownTarget}
      availablePeriods={availablePeriods}
      selectedPeriod={selectedMonth || availablePeriods[0]}
    />
  );
}


