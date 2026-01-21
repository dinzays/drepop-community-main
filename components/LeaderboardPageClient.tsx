// @ts-nocheck
"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LeaderboardTable, type LeaderboardRow } from '@/components/LeaderboardTable';
import { LiveStats } from '@/components/LiveStats';
import { CountdownTimer } from '@/components/CountdownTimer';
import leadboard1Image from '../logo/leadboard1.png';
import type { AffiliateStats } from '@/lib/affiliate';
import { useRouter } from 'next/navigation';

export function LeaderboardPageClient({ 
  data, 
  stats, 
  targetDate,
  availablePeriods,
  selectedPeriod
}: { 
  data: LeaderboardRow[]; 
  stats: AffiliateStats; 
  targetDate: Date;
  availablePeriods: string[];
  selectedPeriod: string;
}) {
  const router = useRouter();

  function handlePeriodChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    router.push(`/leaderboard?month=${value}`);
  }

  function formatPeriodLabel(dateStr: string) {
    const d = new Date(dateStr);
    // Format: "Month Year" (e.g. November 2025)
    // Or closer relation: "Period Starting Nov 10, 2025"
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  return (
    <section className="relative space-y-4 xs:space-y-5 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute -left-52 top-32 hidden xl:block z-10 pointer-events-none"
      >
        <Image
          src={leadboard1Image}
          alt=""
          width={180}
          height={600}
          className="object-contain"
          loading="lazy"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-2 xs:px-4 sm:px-0"
      >
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold">Monthly Leaderboard</h1>
        <p className="mt-2 text-xs xs:text-sm sm:text-base text-white/70">Updated live with the latest wagers and rewards.</p>
        
        {/* Period Selector */}
        {availablePeriods.length > 0 && (
          <div className="mt-4 flex justify-center">
            <div className="relative">
              <select
                value={selectedPeriod}
                onChange={handlePeriodChange}
                className="appearance-none bg-white/10 border border-white/10 rounded-lg px-4 py-2 pr-8 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand/50"
              >
                {availablePeriods.map((period) => (
                  <option key={period} value={period} className="bg-zinc-900 text-white">
                    Period Starting {formatPeriodLabel(period)}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                ▼
              </div>
            </div>
          </div>
        )}
      </motion.div>
      <CountdownTimer targetDate={targetDate} />
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <LiveStats stats={stats} />
      </motion.div> */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <LeaderboardTable data={data} />
      </motion.div>
    </section>
  );
}
