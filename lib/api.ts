const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const API_URL = 'https://affiliate.shuffle.com/stats/6d0177c6-9050-4469-8776-ee2b1aac967e';

let cachedData: Array<{ username: string; campaignCode: string; wagerAmount: number }> | null = null;
let lastFetchTime = 0;

export async function fetchLeaderboardData() {
  const now = Date.now();
  
  // Return cached data if it's still valid
  if (cachedData && now - lastFetchTime < CACHE_DURATION) {
    return cachedData;
  }

  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 300 } // 5 minutes in seconds for Next.js revalidation
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter for campaignCode 'drepop' and sort by wagerAmount in descending order
    const processedData = data
      .filter((item: any) => item.campaignCode === 'drepop')
      .sort((a: any, b: any) => b.wagerAmount - a.wagerAmount);
    
    // Update cache
    cachedData = processedData;
    lastFetchTime = now;
    
    return processedData;
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return cachedData || []; // Return cached data if available, or empty array
  }
}
