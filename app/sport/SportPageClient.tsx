// @ts-nocheck
'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SportsLeaderboard } from '@/components/SportsLeaderboard';
import popImage from './pop.jpg';

export default function SportPageClient() {
    const [showRulesModal, setShowRulesModal] = useState(false);
    const [codeCopied, setCodeCopied] = useState(false);

    // Calculate end of current month consistently
    const endDate = useMemo(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999).toISOString();
    }, []);

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText('drepop');
            setCodeCopied(true);
            setTimeout(() => setCodeCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Real leaderboard data from Shuffle
    const rawData = [
        { username: 'Anas1821', wins: 24, priceOfWins: 199.73 },
        { username: 'adamelajrabi', wins: 8, priceOfWins: 82.635 },
        { username: 'B3LOLA', wins: 1, priceOfWins: 20.465 },
        { username: 'ZBELBOULA', wins: 1, priceOfWins: 75 },
        { username: 'MOLTMR', wins: 0, priceOfWins: 0 },
        { username: 'erritox', wins: 0, priceOfWins: 0 },
        { username: 'Moncefking', wins: 0, priceOfWins: 0 },

    ];

    // Sort by total profits (priceOfWins) first, then by number of wins
    const sortedData = [...rawData].sort((a, b) => {
        if (b.priceOfWins !== a.priceOfWins) return b.priceOfWins - a.priceOfWins;
        return b.wins - a.wins;
    });

    // Assign prizes based on rank - Only first place gets $100
    const sportsLeaderboard = sortedData.map((player, index) => ({
        rank: index + 1,
        username: player.username,
        totalWins: player.wins,
        priceOfWins: player.priceOfWins,
        prize: index === 0 ? 100 : 0
    }));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* Football Background */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-neutral-950" />
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.7), rgba(10,10,10,0.95)), 
                                         repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.03) 49px, rgba(255,255,255,0.03) 50px)`,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 space-y-10"
            >
                {/* Challenge Hero Section */}
                <motion.section
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/20 via-neutral-900/50 to-neutral-900/80 backdrop-blur-sm"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-violet-600/10 opacity-50" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 blur-[120px] rounded-full pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 sm:p-12">
                        {/* Left: Challenge Info */}
                        <div className="flex flex-col justify-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-medium w-fit">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                                </span>
                                Active Challenge
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                                    رْبَح 100 دولار
                                </span>
                                <br />
                                تحدي الريهانات الرياضية
                            </h1>

                            <p className="text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed">
                                تنافس على المركز الأول! الترتيب على حسب <span className="font-bold text-blue-400">الربح الكامل</span>. اللاعب رقم 1 كيربح <span className="font-bold text-yellow-400">100 دولار</span>!
                            </p>

                            <div className="max-w-md">
                                <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-500/30">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-3xl sm:text-4xl font-bold text-yellow-400">$100</div>
                                        <div className="text-xl">🏆</div>
                                    </div>
                                    <div className="text-sm sm:text-base text-white/80 font-medium">
                                        Current Leader: <span className="text-yellow-400 font-bold">{sportsLeaderboard[0]?.username || 'TBD'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-2">
                                <motion.a
                                    href="https://shuffle.com/?r=drepop"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-primary"
                                >
                                    🎯 Join Challenge
                                </motion.a>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowRulesModal(true)}
                                    className="btn-ghost"
                                >
                                    📜 View Rules
                                </motion.button>
                            </div>
                        </div>

                        {/* Right: Challenge Image */}
                        <div className="flex items-center justify-center lg:justify-end">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                                className="relative w-full max-w-2xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-3xl blur-3xl" />
                                <div className="relative w-full rounded-2xl overflow-hidden border border-white/10">
                                    <Image
                                        src={popImage}
                                        alt="DRE POP - Welcome to the sports space"
                                        className="w-full h-auto object-cover"
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Leaderboard Section */}
                <motion.section variants={itemVariants}>
                    <SportsLeaderboard
                        data={sportsLeaderboard}
                        endDate={endDate}
                    />
                </motion.section>
            </motion.div>

            {/* Rules & How to Play Modal */}
            <AnimatePresence>
                {showRulesModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowRulesModal(false)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-900 to-purple-950/30 shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowRulesModal(false)}
                                className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110"
                            >
                                <span className="text-white text-xl">×</span>
                            </button>

                            {/* Header */}
                            <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-8">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-violet-600/10" />
                                <div className="relative z-10">
                                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                                        📜 القواعد وكيفاش تلعب
                                    </h2>
                                    <p className="text-neutral-300">اتبع هاد الخطوات باش تدخل للتحدي و تنافس على الجوائز!</p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-6">
                                {/* Step 1: Account Activation */}
                                <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-6 hover:border-emerald-500/50 transition-all duration-300">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none" />
                                    <div className="relative z-10">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
                                                1
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-white mb-2">💳 تفعيل الحساب</h3>
                                                <p className="text-neutral-300 mb-4 leading-relaxed">
                                                    ديپوزيتي <span className="font-bold text-emerald-400">على الأقل 10 دولار</span> باستعمال الكود الحصري باش تفعل حسابك و تدخل للتحدي.
                                                </p>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 font-mono text-lg text-white">
                                                        drepop
                                                    </div>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={handleCopyCode}
                                                        className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors duration-200 flex items-center gap-2"
                                                    >
                                                        {codeCopied ? (
                                                            <>
                                                                <span>✓</span>
                                                                <span>تنسخ!</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span>📋</span>
                                                                <span>نسخ الكود</span>
                                                            </>
                                                        )}
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2: Discord Verification */}
                                <div className="group relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-6 hover:border-purple-500/50 transition-all duration-300">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />
                                    <div className="relative z-10">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-lg">
                                                2
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-white mb-2">✅ التحقق عبر ديسكورد</h3>
                                                <p className="text-neutral-300 mb-4 leading-relaxed">
                                                    من بعد ما تحط الرهان ديالك، <span className="font-bold text-purple-400">صيفط الرابط ديال بت سليپ</span> لسيرفر ديسكورد ديالنا باش نأكدو. هادشي كيضمن تتبع جميع الرهانات بدقة.
                                                </p>
                                                <motion.a
                                                    href="https://discord.com/invite/mew4BCjR4U"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-colors duration-200"
                                                >
                                                    <svg className="w-5 h-5" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="currentColor" />
                                                    </svg>
                                                    <span>دخول لسيرفر ديسكورد</span>
                                                </motion.a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3: Admin Support */}
                                <div className="group relative overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-orange-600/5 p-6 hover:border-orange-500/50 transition-all duration-300">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full pointer-events-none" />
                                    <div className="relative z-10">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-lg">
                                                3
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-white mb-2">👥 الدعم و التحقق من الإدمنز</h3>
                                                <p className="text-neutral-300 mb-4 leading-relaxed">
                                                    الإدمنز ديالنا غادي يتحققو من الرهانات ديالك و يحدثو الترتيب. تواصل معاهم فديسكورد إذا كان عندك شي أسئلة أو مشاكل فالتحقق.
                                                </p>
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/10">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                                                            N
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-white">@Notorious Jbilo</div>
                                                            <div className="text-sm text-neutral-400">إدمن التحقق</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/10">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                                                            H
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-white">@H-ZORO</div>
                                                            <div className="text-sm text-neutral-400">إدمن التحقق</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer CTA */}
                                <div className="pt-4 border-t border-white/10">
                                    <div className="text-center">
                                        <p className="text-neutral-400 mb-4">واجد باش تنافس؟ دخول للتحدي دابا!</p>
                                        <motion.a
                                            href="https://shuffle.com/?r=drepop"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand to-violet-600 hover:from-brand/90 hover:to-violet-600/90 text-white font-bold text-lg transition-all duration-200 shadow-lg shadow-brand/25"
                                        >
                                            <span>🚀</span>
                                            <span>ابدا اللعب دابا</span>
                                        </motion.a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
