import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bonuses'
};

export default function BonusesPage() {
  return (
    <section className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16 xl:gap-24 min-h-[420px]">
      <div className="relative z-10 flex-1 max-w-xl space-y-6">
        <div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-[#ffd86f] via-[#ffb347] to-[#f9a825] text-transparent bg-clip-text drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
          >
            BONUSES
          </h1>
          <p className="mt-3 text-base sm:text-lg font-semibold">
            Unlock <span className="text-[#ffd86f]">EXCLUSIVE</span> Rewards
          </p>
        </div>

        <p className="text-sm sm:text-base text-white/70 max-w-lg">
          AWL DEPOSIT MINIMUM $30 + $200 WAGER = FREE $10
           </p>
           <p>
          CREE TICKET F DISCORD BACH TAKHD BONUS
        </p>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href="https://shuffle.com/?r=drepop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ffd86f] text-black font-semibold text-sm sm:text-base px-5 sm:px-6 py-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.6)] hover:bg-[#ffe28f] transition-colors"
          >
            <span className="text-lg">🎁</span>
            <span>Apply for $10 Bonus</span>
          </a>

          <a
            href="https://discord.gg/mew4BCjR4U"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-white/5 border border-white/10 text-sm sm:text-base px-5 sm:px-6 py-2.5 text-white/90 hover:bg-white/10 transition-colors"
          >
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#5865F2]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-3 h-3 text-white"
                fill="currentColor"
              >
                <path d="M20 4.5a19.91 19.91 0 0 0-4.23-1.3l-.2.4c.64.16 1.26.38 1.86.64A8.98 8.98 0 0 0 14.5 3h-.03a9.1 9.1 0 0 0-5.0 0H9.5A8.98 8.98 0 0 0 6.57 4.24c.6-.26 1.22-.48 1.86-.64l-.2-.4A19.9 19.9 0 0 0 4 4.5C2.28 7.07 1.7 9.56 1.9 11.99c.02.24.05.47.09.7A8.98 8.98 0 0 0 7 18.5a10.4 10.4 0 0 0 1.94.5l.4-.78a7.4 7.4 0 0 1-1.5-.54l.24-.17c1.06.5 2.23.77 3.42.77 1.2 0 2.37-.27 3.44-.78l.24.17c-.47.27-.97.4-1.48.55l.4.78c.67-.12 1.32-.3 1.95-.53a8.98 8.98 0 0 0 5.0-5.8c.05-.27.09-.54.12-.81.18-2.3-.39-4.78-2.1-7.35ZM9.75 13.5c-.83 0-1.5-.75-1.5-1.67 0-.92.67-1.67 1.5-1.67.83 0 1.5.75 1.5 1.67 0 .92-.67 1.67-1.5 1.67Zm4.5 0c-.83 0-1.5-.75-1.5-1.67 0-.92.67-1.67 1.5-1.67.83 0 1.5.75 1.5 1.67 0 .92-.67 1.67-1.5 1.67Z" />
              </svg>
            </span>
            <span>Join Discord</span>
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-6 text-sm sm:text-base text-white/80">
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#ffd86f]">$10</div>
            <div className="text-xs sm:text-sm text-white/60">Bonus</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#ffd86f]">24/7</div>
            <div className="text-xs sm:text-sm text-white/60">Support</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-[#ffd86f]">VIP</div>
            <div className="text-xs sm:text-sm text-white/60">Access</div>
          </div>
        </div>

        <p
          className="mt-6 text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-[#ffd86f] via-[#ffb347] to-[#f9a825] text-transparent bg-clip-text drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
        >
          Exclusive Rank Rewards:
        </p>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1 text-sm sm:text-base text-white/80">
          <p>
            🥈 Silver 1 🥈 :{' '}
            <span className="text-[#ffd86f]">$10</span>
          </p>
          <p>
            🥈 Silver 5 🥈 :{' '}
            <span className="text-[#ffd86f]">$25</span>
          </p>
          <p>
            🥇 Gold 2 🥇 :{' '}
            <span className="text-[#ffd86f]">$50</span>
          </p>
          <p>
            💎 Platinum 1 💎 :{' '}
            <span className="text-[#ffd86f]">$100</span>
          </p>
          <p>
            💎 Platinum 3 💎 :{' '}
            <span className="text-[#ffd86f]">$200</span>
          </p>
          <p>
            💎 Platinum 5 💎 :{' '}
            <span className="text-[#ffd86f]">$500</span>
          </p>
        </div>
      </div>

      <div className="relative flex-1 flex items-center justify-center w-full lg:w-auto">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(255,216,111,0.25),transparent_60%)] opacity-80" />
        <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-3xl border border-[#ffd86f]/40 bg-gradient-to-br from-[#2b210a]/80 via-[#15120a]/90 to-black shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-[#ffd86f]/5 blur-xl" />
          <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#ffd86f]/15 border border-[#ffd86f]/40">
            <span className="text-4xl sm:text-5xl text-[#ffd86f]">🎁</span>
          </div>
        </div>
      </div>
    </section>
  );
}
