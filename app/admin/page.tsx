"use client";
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { fetchDaily, fetchOverview, fetchReferrals, type DailyPoint, type Referral } from '@/lib/stake';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [secret, setSecret] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const s = sessionStorage.getItem('adminSecret');
    if (s) {
      setSecret(s);
      setUnlocked(true);
    }
  }, []);

  const { data: overview, error: overviewError, isLoading: loadingOverview } = useSWR(
    unlocked ? ['overview', secret] : null,
    () => fetchOverview(secret),
    { refreshInterval: 180_000 }
  );
  const { data: daily, error: dailyError, isLoading: loadingDaily } = useSWR(
    unlocked ? ['daily', secret] : null,
    () => fetchDaily(secret),
    { refreshInterval: 180_000 }
  );
  const { data: referrals, error: referralsError, isLoading: loadingReferrals } = useSWR(
    unlocked ? ['referrals', secret] : null,
    () => fetchReferrals(secret),
    { refreshInterval: 300_000 }
  );

  if (!unlocked) return <PasswordGate onUnlock={(s) => { setSecret(s); setUnlocked(true); sessionStorage.setItem('adminSecret', s); }} />;

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">Affiliate Dashboard</h1>
        <p className="mt-2 text-white/70">Live overview, daily stats, and referrals</p>
      </div>

      <OverviewCards loading={loadingOverview} error={!!overviewError} data={overview} />

      <div className="card p-5 sm:p-6">
        <h3 className="text-lg font-semibold">Daily stats</h3>
        <div className="mt-4">
          {loadingDaily ? <Loader /> : dailyError ? <ErrorNote /> : <DailyChart days={daily?.days || []} />}
        </div>
      </div>

      <div className="card p-5 sm:p-6">
        <h3 className="text-lg font-semibold">Referrals</h3>
        <div className="mt-4 overflow-x-auto">
          {loadingReferrals ? <Loader /> : referralsError ? <ErrorNote /> : <ReferralsTable referrals={referrals?.referrals || []} />}
        </div>
      </div>
    </section>
  );
}

function PasswordGate({ onUnlock }: { onUnlock: (secret: string) => void }) {
  const [val, setVal] = useState('');
  return (
    <div className="mx-auto max-w-sm card p-6 text-center">
      <h2 className="text-xl font-semibold">Admin Access</h2>
      <p className="mt-2 text-sm text-white/70">Enter the admin password to view the dashboard.</p>
      <input
        type="password"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Password"
        className="mt-4 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
      />
      <button className="btn-primary mt-4 w-full" onClick={() => onUnlock(val)}>Unlock</button>
    </div>
  );
}

function OverviewCards({ loading, error, data }: { loading: boolean; error: boolean; data: any }) {
  const items = [
    { label: 'Total players', value: data?.totalUsers },
    { label: 'Total wagered', value: currency(data?.totalWagerUsd) },
    { label: 'Revenue share', value: currency(data?.revenueShareUsd) }
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <div key={it.label} className="card p-5">
          <div className="text-xs uppercase tracking-wider text-white/60">{it.label}</div>
          <div className="mt-2 text-2xl font-semibold">{loading ? <Loader small /> : error ? '—' : it.value ?? '—'}</div>
        </div>
      ))}
    </div>
  );
}

function DailyChart({ days }: { days: DailyPoint[] }) {
  const max = Math.max(1, ...days.map((d) => d.wagerUsd));
  const points = days.map((d, i) => {
    const x = (i / Math.max(days.length - 1, 1)) * 100;
    const y = 100 - (d.wagerUsd / max) * 100;
    return `${x},${y}`;
  }).join(' ');
  return (
    <div className="h-40">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        <polyline fill="none" stroke="currentColor" strokeWidth="2" className="text-brand" points={points} />
      </svg>
      <div className="mt-2 text-xs text-white/60">Wagered (last {days.length} days)</div>
    </div>
  );
}

function ReferralsTable({ referrals }: { referrals: Referral[] }) {
  return (
    <table className="min-w-full text-sm">
      <thead className="bg-white/[0.03]">
        <tr className="text-left text-white/70">
          <th className="px-4 py-2">Username</th>
          <th className="px-4 py-2">Wager ($)</th>
          <th className="px-4 py-2">Profit ($)</th>
        </tr>
      </thead>
      <tbody>
        {referrals.map((r) => (
          <tr key={r.username} className="border-t border-white/10 hover:bg-white/5">
            <td className="px-4 py-2">{r.username}</td>
            <td className="px-4 py-2">{currency(r.wagerUsd)}</td>
            <td className="px-4 py-2">{currency(r.profitUsd)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Loader({ small }: { small?: boolean }) {
  return <div className={`inline-block animate-spin rounded-full border-2 border-white/20 border-t-brand ${small ? 'h-4 w-4' : 'h-8 w-8'}`} />;
}

function ErrorNote() {
  return <div className="text-amber-400 text-sm">API temporarily unavailable.</div>;
}

function currency(n?: number) {
  if (typeof n !== 'number') return '—';
  return `$${n.toLocaleString()}`;
}


