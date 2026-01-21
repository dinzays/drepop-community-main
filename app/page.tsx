import type { Metadata } from 'next';
import { HomeHero } from '@/components/HomeHero';
import { getLeaderboardDisplayData } from '@/lib/leaderboard-service';

export const metadata: Metadata = {
  title: 'Home'
};

// Revalidate the data every 5 minutes
export const revalidate = 60;

export default async function Page() {
  // Fetch top 3 users from the new DB service
  const dbData = await getLeaderboardDisplayData();
  
  // Transform DB data to match the expected format for HomeHero
  const topThree = (dbData || [])
    .slice(0, 3) // Get top 3
    .map((item) => ({
      username: item.username,
      wagered: item.totalWager
    }));

  return <HomeHero topThree={topThree} />;
}




