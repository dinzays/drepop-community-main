// @ts-nocheck
"use client";
import { motion } from 'framer-motion';

type TopThreeUser = {
  username: string;
  wagered: number | null;
};

type Row = {
  rank: number;
  username: string;
  totalWager: number;
  reward: number;
};

function formatCurrency(value: number) {
  return `$${value.toLocaleString()}`;
}

// Calculate rewards based on rank
function calculateReward(rank: number): number {
  if (rank === 1) return 400; // hna ch7al idi mol rank 1
  if (rank === 2) return 300; // Second place: $150
  if (rank === 3) return 150; // Third place: $100
  return 0;
}

export function TopThree({ topThree }: { topThree: TopThreeUser[] }) {
  // Transform database data to match the Row type
  const rows: Row[] = topThree.map((user, index) => ({
    rank: index + 1,
    username: user.username,
    totalWager: user.wagered ?? 0,
    reward: calculateReward(index + 1)
  }));

  const [first, second, third] = rows;

  return (
    <div className="mt-12 sm:mt-14 md:mt-16">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white/90">Top Performers</h2>
        <p className="text-xs sm:text-sm text-white/60 mt-1">This month's Top 3 on the board.</p>
      </div>
      <div className="relative mx-auto max-w-5xl">
        <div className="flex items-end justify-center gap-2 sm:gap-4 md:gap-6">
          {/* Second */}
          {second && (
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              whileHover={{ rotate: -1, y: -2 }}
              className="w-24 sm:w-32 md:w-40 lg:w-48 -rotate-3"
            >
              <Card row={second} accent="left" />
            </motion.div>
          )}

          {/* First (center, larger) */}
          {first && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="w-32 sm:w-40 md:w-56 lg:w-64 z-10"
            >
              <Card row={first} featured />
            </motion.div>
          )}

          {/* Third */}
          {third && (
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ rotate: 1, y: -2 }}
              className="w-24 sm:w-32 md:w-40 lg:w-48 rotate-3"
            >
              <Card row={third} accent="right" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ row, featured, accent }: { row: Row; featured?: boolean; accent?: 'left' | 'right' }) {
  return (
    <div
      className={[
        'relative overflow-hidden rounded-xl sm:rounded-2xl backdrop-blur-xl',
        'ring-1 ring-white/15 shadow-xl',
        'bg-gradient-to-b from-violetC-500/15 to-blue_violet-500/10',
        featured ? 'p-4 sm:p-6 md:p-7 min-h-52 sm:min-h-60 md:min-h-72' : 'p-3 sm:p-5 md:p-6 min-h-44 sm:min-h-48 md:min-h-60'
      ].join(' ')}
    >
      {/* Accent glows */}
      <div
        className="pointer-events-none absolute -inset-16 opacity-30"
        style={{
          background:
            accent === 'left'
              ? 'radial-gradient(400px 160px at 20% 20%, rgba(118,44,251,0.35), rgba(0,0,0,0))'
              : accent === 'right'
              ? 'radial-gradient(400px 160px at 80% 20%, rgba(116,47,233,0.35), rgba(0,0,0,0))'
              : 'radial-gradient(500px 200px at 50% 0%, rgba(121,40,254,0.5), rgba(0,0,0,0))'
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 font-medium">Rank</div>
          <div
            className={[
              'rounded-full px-2 sm:px-3 py-0.5 sm:py-1 font-bold',
              'bg-gradient-to-r from-brand/20 to-brand/10 text-brand',
              'ring-1 ring-brand/30 shadow-lg shadow-brand/20'
            ].join(' ')}
          >
            <span className="text-base sm:text-lg">{row.rank === 1 ? '🥇' : row.rank === 2 ? '🥈' : row.rank === 3 ? '🥉' : `#${row.rank}`}</span>
          </div>
        </div>
        <div className="mt-3 sm:mt-4 text-base sm:text-xl md:text-2xl font-bold text-yellow-400 tracking-tight truncate">{row.username}</div>
        <div className="mt-2 text-xs sm:text-sm text-yellow-400">
          <span className="text-yellow-400">Wagered</span>
          <span className="ml-1 sm:ml-2 font-semibold text-yellow-400">{formatCurrency(row.totalWager)}</span>
        </div>
        <div className="mt-3 sm:mt-4 md:mt-5 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2.5 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#2d1b4e] to-[#1a0f33] px-2 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3.5 text-xs sm:text-base md:text-lg lg:text-xl font-bold text-white shadow-xl ring-1 ring-white/5">
          <span className="text-sm sm:text-lg md:text-xl lg:text-2xl drop-shadow-lg">🏆</span>
          <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent truncate">{formatCurrency(row.reward)}</span>
        </div>
      </div>
    </div>
  );
}


