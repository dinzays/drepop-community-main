export type AffiliateStats = {
  totalUsers: number;
  totalWagerUsd: number;
  totalRewardsUsd: number;
  lastUpdated: string; // ISO string
};

export async function fetchAffiliateStats(signal?: AbortSignal): Promise<AffiliateStats> {
  const res = await fetch('/api/affiliate/stats', { signal, cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch affiliate stats');
  }
  return res.json();
}


