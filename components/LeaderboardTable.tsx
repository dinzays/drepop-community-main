// @ts-nocheck
"use client";
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type LeaderboardRow = {
  rank: number;
  username: string;
  totalWager: number;
  reward: number;
};

export function LeaderboardTable({ data }: { data: LeaderboardRow[] }) {
  const [sortBy, setSortBy] = useState<'rank' | 'totalWager' | 'reward'>('rank');
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return data;
    return data.filter(row => 
      row.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const mul = direction === 'asc' ? 1 : -1;
      if (a[sortBy] < b[sortBy]) return -1 * mul;
      if (a[sortBy] > b[sortBy]) return 1 * mul;
      return 0;
    });
    return copy;
  }, [filtered, sortBy, direction]);

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sorted.slice(startIndex, endIndex);

  function toggleSort(key: 'rank' | 'totalWager' | 'reward') {
    if (sortBy === key) {
      setDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setDirection('desc');
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  }

  function goToPage(page: number) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when search changes
  }

  function clearSearch() {
    setSearchQuery('');
    setCurrentPage(1);
  }

  return (
    <div className="card overflow-hidden">
      <div className="px-4 sm:px-6 py-4">
        <h3 className="text-base sm:text-lg font-semibold">Monthly Leaderboard</h3>
      </div>
      
      {/* Search Input */}
      <div className="px-4 sm:px-6 pb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by username..."
            className="w-full px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all placeholder:text-white/40"
            aria-label="Search users"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        {searchQuery && (
          <div className="mt-2 text-xs text-white/50">
            Found {filtered.length} user{filtered.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03]">
              <tr className="text-left text-white/70">
                <th 
                  className="px-4 sm:px-4 md:px-6 py-3 cursor-pointer select-none touch-target text-xs sm:text-sm font-medium" 
                  onClick={() => toggleSort('rank')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && toggleSort('rank')}
                >
                  Rank {sortBy === 'rank' ? (direction === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="px-4 sm:px-4 md:px-6 py-3 text-xs sm:text-sm font-medium">Username</th>
                <th 
                  className="px-4 sm:px-4 md:px-6 py-3 cursor-pointer select-none touch-target text-xs sm:text-sm font-medium whitespace-nowrap" 
                  onClick={() => toggleSort('totalWager')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && toggleSort('totalWager')}
                >
                  <span className="hidden sm:inline">Total Wager ($)</span>
                  <span className="sm:hidden">Wager ($)</span>
                  {sortBy === 'totalWager' ? (direction === 'asc' ? ' ↑' : ' ↓') : ''}
                </th>
                <th 
                  className="px-4 sm:px-4 md:px-6 py-3 cursor-pointer select-none touch-target text-xs sm:text-sm font-medium whitespace-nowrap" 
                  onClick={() => toggleSort('reward')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && toggleSort('reward')}
                >
                  Reward ($) {sortBy === 'reward' ? (direction === 'asc' ? '↑' : '↓') : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false} mode="wait">
                {paginatedData.length === 0 ? (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan={4} className="px-4 sm:px-6 py-8 text-center text-white/50 text-sm">
                      {searchQuery ? `No users found matching "${searchQuery}"` : 'No data available'}
                    </td>
                  </motion.tr>
                ) : paginatedData.map((row, index) => (
                  <motion.tr
                    key={`${row.username}-${currentPage}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.03,
                      ease: "easeOut"
                    }}
                    className="border-t border-white/[0.06] hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-4 sm:px-4 md:px-6 py-3 sm:py-4 font-semibold text-white/90 text-xs sm:text-sm whitespace-nowrap">#{row.rank}</td>
                    <td className="px-4 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm min-w-[100px]">{row.username}</td>
                    <td className="px-4 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap text-yellow-400">{row.totalWager.toLocaleString()} $</td>
                    <td className={`px-4 sm:px-4 md:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm whitespace-nowrap ${row.rank <= 5 ? 'text-[#85bb65]' : 'text-brand'}`}>
                      {row.reward.toLocaleString()} $
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      <div className="px-4 sm:px-6 py-3 text-xs text-center text-white/50 border-t border-white/[0.06] sm:hidden">
        <p>← Scroll horizontally to view all columns →</p>
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 sm:px-6 py-3 border-t border-white/[0.06]">
          <div className="text-[10px] sm:text-xs text-white/50">
            Showing {startIndex + 1}-{Math.min(endIndex, sorted.length)} of {sorted.length}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 text-[10px] sm:text-xs rounded border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous page"
            >
              ← Prev
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                const showPage = 
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1);
                
                const showEllipsis = 
                  (page === currentPage - 2 && currentPage > 3) ||
                  (page === currentPage + 2 && currentPage < totalPages - 2);

                if (showEllipsis) {
                  return <span key={page} className="px-1 text-[10px] text-white/40">...</span>;
                }

                if (!showPage) return null;

                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`min-w-[24px] sm:min-w-[28px] px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs rounded border transition-all ${
                      currentPage === page
                        ? 'bg-brand border-brand text-white font-semibold'
                        : 'border-white/10 hover:bg-white/5'
                    }`}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 text-[10px] sm:text-xs rounded border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next page"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


