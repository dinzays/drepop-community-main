export type Overview = {
  totalUsers: number;
  totalWagerUsd: number;
  revenueShareUsd: number;
  lastUpdated?: string;
};

export async function fetchOverview(adminSecret?: string): Promise<Overview> {
  const res = await fetch('/api/stats/overview', {
    headers: adminSecret ? { 'x-admin-secret': adminSecret } : undefined,
    cache: 'no-store'
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Overview fetch failed: ${text}`);
  }
  const contentType = res.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await res.text();
    throw new Error(`Expected JSON but received: ${contentType}. Response: ${text.substring(0, 100)}`);
  }
  return res.json();
}

export type DailyPoint = { date: string; wagerUsd: number; revenueShareUsd: number };
export async function fetchDaily(adminSecret?: string): Promise<{ days: DailyPoint[] }> {
  const res = await fetch('/api/stats/daily', {
    headers: adminSecret ? { 'x-admin-secret': adminSecret } : undefined,
    cache: 'no-store'
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Daily fetch failed: ${text}`);
  }
  const contentType = res.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await res.text();
    throw new Error(`Expected JSON but received: ${contentType}. Response: ${text.substring(0, 100)}`);
  }
  return res.json();
}

export type Referral = { username: string; wagerUsd: number; profitUsd: number };
export async function fetchReferrals(adminSecret?: string): Promise<{ referrals: Referral[] }> {
  const res = await fetch('/api/stats/referrals', {
    headers: adminSecret ? { 'x-admin-secret': adminSecret } : undefined,
    cache: 'no-store'
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Referrals fetch failed: ${text}`);
  }
  const contentType = res.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await res.text();
    throw new Error(`Expected JSON but received: ${contentType}. Response: ${text.substring(0, 100)}`);
  }
  return res.json();
}


