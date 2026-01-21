import { type AffiliateStats } from '@/lib/affiliate';

export function LiveStats({ stats }: { stats: AffiliateStats }) {
  return (
    <div className="card p-4 sm:p-5 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <h3 className="text-base sm:text-lg font-semibold">Live Affiliate Stats</h3>
        <span className="text-[10px] sm:text-xs text-white/50">{stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : ''}</span>
      </div>
      <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Stat label="Total Users" value={formatNum(stats?.totalUsers)} />
        <Stat label="Total Wager" value={formatUsd(stats?.totalWagerUsd)} />
        <Stat label="Rewards Paid" value={formatUsd(stats?.totalRewardsUsd)} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg sm:rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/60">{label}</div>
      <div className="mt-1 sm:mt-2 text-lg sm:text-xl font-semibold text-white/90">
        {value}
      </div>
    </div>
  );
}

function formatUsd(n?: number) {
  if (typeof n !== 'number') return '—';
  return `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function formatNum(n?: number) {
  if (typeof n !== 'number') return '—';
  return n.toLocaleString();
}


