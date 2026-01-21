// @ts-nocheck
"use client";
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CountdownTimer } from './CountdownTimer';

export type SportsLeaderboardRow = {
    rank: number;
    username: string;
    totalWins: number;
    priceOfWins: number;
    prize: number;
};

export function SportsLeaderboard({ data, endDate }: { data: SportsLeaderboardRow[], endDate: string }) {
    const [sortBy, setSortBy] = useState<'rank' | 'totalWins' | 'priceOfWins' | 'prize'>('rank');
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

    function toggleSort(key: 'rank' | 'totalWins' | 'priceOfWins' | 'prize') {
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
            {/* Header with Countdown */}
            <div className="px-4 sm:px-6 py-6 border-b border-white/10 bg-white/[0.02]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Sports Challenge Leaderboard</h3>
                        <p className="text-neutral-400 text-sm">Compete for the top spot. Highest profit wins!</p>
                    </div>
                    <div className="flex-shrink-0">
                        <CountdownTimer targetDate={new Date(endDate)} />
                    </div>
                </div>
            </div>

            {/* Search Input */}
            <div className="p-4 sm:p-6 pb-4">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Search by username..."
                        className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all placeholder:text-white/40"
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
                                    className="px-4 sm:px-6 py-4 cursor-pointer select-none touch-target text-xs sm:text-sm font-medium"
                                    onClick={() => toggleSort('rank')}
                                >
                                    Rank {sortBy === 'rank' ? (direction === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th className="px-4 sm:px-6 py-4 text-xs sm:text-sm font-medium">Username</th>
                                <th
                                    className="px-4 sm:px-6 py-4 cursor-pointer select-none touch-target text-xs sm:text-sm font-medium whitespace-nowrap"
                                    onClick={() => toggleSort('totalWins')}
                                >
                                    Wins {sortBy === 'totalWins' ? (direction === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th
                                    className="px-4 sm:px-6 py-4 cursor-pointer select-none touch-target text-xs sm:text-sm font-medium whitespace-nowrap"
                                    onClick={() => toggleSort('priceOfWins')}
                                >
                                    Profit ($) {sortBy === 'priceOfWins' ? (direction === 'asc' ? '↑' : '↓') : ''}
                                </th>
                                <th
                                    className="px-4 sm:px-6 py-4 cursor-pointer select-none touch-target text-xs sm:text-sm font-medium whitespace-nowrap"
                                    onClick={() => toggleSort('prize')}
                                >
                                    Prize ($) {sortBy === 'prize' ? (direction === 'asc' ? '↑' : '↓') : ''}
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
                                        <td colSpan={5} className="px-4 sm:px-6 py-12 text-center text-white/50 text-sm">
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
                                        className={`border-t border-white/[0.06] hover:bg-white/[0.03] transition-colors ${row.rank === 1 ? 'bg-yellow-500/5' : ''}`}
                                    >
                                        <td className="px-4 sm:px-6 py-4 font-semibold text-white/90 text-xs sm:text-sm whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                {row.rank === 1 && <span className="text-lg">🥇</span>}
                                                {row.rank === 2 && <span className="text-lg">🥈</span>}
                                                {row.rank === 3 && <span className="text-lg">🥉</span>}
                                                <span className={row.rank <= 3 ? "text-white font-bold" : "text-white/70"}>#{row.rank}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm font-medium text-white">{row.username}</td>
                                        <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm whitespace-nowrap text-white/80">{row.totalWins}</td>
                                        <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm whitespace-nowrap text-emerald-400 font-medium">
                                            ${row.priceOfWins.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                        <td className={`px-4 sm:px-6 py-4 font-bold text-xs sm:text-sm whitespace-nowrap ${row.prize > 0 ? 'text-yellow-400' : 'text-neutral-500'}`}>
                                            {row.prize > 0 ? `$${row.prize}` : '-'}
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-4 border-t border-white/[0.06]">
                    <div className="text-xs text-white/50">
                        Showing {startIndex + 1}-{Math.min(endIndex, sorted.length)} of {sorted.length} players
                    </div>
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 text-xs rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Previous
                        </button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
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
                                        className={`min-w-[28px] px-2 py-1.5 text-xs rounded-lg border transition-all ${currentPage === page
                                                ? 'bg-brand border-brand text-white font-semibold shadow-lg shadow-brand/20'
                                                : 'border-white/10 hover:bg-white/5'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1.5 text-xs rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
