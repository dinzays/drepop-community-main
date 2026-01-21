// @ts-nocheck
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import shuffleCoinImage from '../logo/shufflecoin.png';
import usaFlag from '../logo/usa.png';
import maroccoFlag from '../logo/marocco.png';

const links = [
  { href: '/', label: 'Home' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/sport', label: 'Sports' },
  { href: '/bonuses', label: 'Bonuses' },
  { href: '/challenges', label: 'Challenges' },
  { href: '/how-it-works', label: 'How It Works' }
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/50">
      <div className="container-inner flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-white min-h-[44px] min-w-[44px] -ml-2 pl-2"
          aria-label="Drepop Community Home"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Image
              src={shuffleCoinImage}
              alt="Shuffle Coin"
              width={30}
              height={30}
              className="object-contain"
              priority
            />
          </motion.div>
          <span>Drepop Community</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3" aria-label="Main navigation">
          <div className="flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm text-white/80 hover:text-white transition-colors min-h-[44px] flex items-center"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-brand"
                      style={{ display: 'block' }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center min-h-[44px] min-w-[44px] -mr-2 text-white/80 hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/10 bg-neutral-950/95 backdrop-blur-lg"
          >
            <nav className="container-inner py-4" aria-label="Mobile navigation">
              <ul className="space-y-1">
                {links.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={[
                          'block px-4 py-3 rounded-lg text-base font-medium transition-colors min-h-[44px] flex items-center',
                          active
                            ? 'bg-brand/10 text-brand'
                            : 'text-white/80 hover:bg-white/5 hover:text-white'
                        ].join(' ')}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


