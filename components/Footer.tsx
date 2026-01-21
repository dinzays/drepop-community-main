import Link from 'next/link';
import Image from 'next/image';
import rewardsLogo from '../logo/Rewards.png';
import gambleAwareLogo from '../logo/gambleaware.png';

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 md:py-10 mt-12 md:mt-16">
      <div className="container-inner">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0">
          {/* Left side - Branding */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src={rewardsLogo}
              alt="Rewards"
              width={150}
              height={40}
              className="object-contain mb-3"
            />
            <div className="flex items-center justify-center md:justify-start mb-3">
              <Image
                src={gambleAwareLogo}
                alt="GambleAware"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-sm text-white/60 text-center md:text-left">© {new Date().getFullYear()} All Rights Reserved</p>
          </div>
          
          {/* Right side - Community */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-sm font-bold text-white mb-4 tracking-wider">COMMUNITY</h3>
            <div className="flex gap-2 sm:gap-3 items-center">
            <Link 
              href="https://x.com/Drepopbets" 
              className="flex items-center justify-center min-h-[44px] min-w-[44px] text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Link>
            <Link 
              href="https://discord.gg/mew4BCjR4U" 
              className="flex items-center justify-center min-h-[44px] min-w-[44px] text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </Link>
            <Link 
              href="https://kick.com/dre_pop" 
              className="flex items-center justify-center min-h-[44px] min-w-[44px] text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kick"
            >
              <svg className="w-6 h-6" fill="#53fc18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm2 4v10h2V13l4 4h3l-4.5-4.5L17 8h-3l-4 4V7H8z"/>
              </svg>
            </Link>
            <Link 
              href="https://www.instagram.com/drepopbets/" 
              className="flex items-center justify-center min-h-[44px] min-w-[44px] text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


