// @ts-nocheck
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TopThree } from '@/components/TopThree';
import lockupImage from '../logo/lockup-1.png';
import dreStImage from '../logo/dre_st_2.png';
import miwiGif from '../logo/miwi.gif';
import drePop1Image from '../logo/drepop1.jpg';
import zeus1Image from '../logo/zeus1.png';

type TopThreeUser = {
  username: string;
  wagered: number | null;
};

export function HomeHero({ topThree }: { topThree: TopThreeUser[] }) {
  const text = "$1000";
  const leaderboardText = "LEADERBOARD";

  return (
    <section className="relative">
      {/* @ts-expect-error - Framer Motion className type issue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
        >
          Join the Ultimate <span className="text-brand">Rewards</span> Challenge!
        </motion.h1>
        {/* @ts-expect-error - Framer Motion className type issue */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-5 text-base sm:text-lg text-white/70"
        >
          Use drepop referral promo code at sign up, start wagering to earn points, and climb the leaderboard to claim exclusive rewards.
        </motion.p>
        {/* @ts-expect-error - Framer Motion className type issue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <a className="btn-primary" href="https://shuffle.com?r=drepop" target="_blank" rel="noopener noreferrer">
            Join Now
          </a>
          <Link href="/how-it-works" className="btn-ghost">
            How it works
          </Link>
        </motion.div>
        {/* @ts-expect-error - Framer Motion className type issue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-6 flex justify-center"
        >
          <Image
            src={lockupImage}
            alt="Logo"
            width={400}
            height={80}
            className="object-contain"
          />
        </motion.div>
        {/* @ts-expect-error - Framer Motion className type issue */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-8"
        >
          <h1
            className="text-6xl font-extrabold bg-gradient-to-b from-[#b999ff] via-[#762cfb] to-[#3d138e] text-transparent bg-clip-text drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]"
            style={{
              textShadow: "0 0 20px rgba(255,215,0,0.8), 0 0 40px rgba(255,215,0,0.6), 0 2px 4px rgba(0,0,0,0.8)",
              WebkitTextStroke: "2px rgba(255,215,0,0.9)",
            }}
          >
            $1000
          </h1>
          <h2
            className="text-5xl font-extrabold bg-gradient-to-b from-[#b999ff] via-[#762cfb] to-[#3d138e] text-transparent bg-clip-text drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)] mt-2"
            style={{
              textShadow: "0 0 20px rgba(255,215,0,0.8), 0 0 40px rgba(255,215,0,0.6), 0 2px 4px rgba(0,0,0,0.8)",
              WebkitTextStroke: "2px rgba(255,215,0,0.9)",
            }}
          >
            LEADERBOARD
          </h2>
        </motion.div>
      </motion.div>

      {/* @ts-expect-error - Framer Motion className type issue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="pointer-events-none absolute -inset-x-16 -top-24 h-64 blur-3xl"
        style={{
          background: 'radial-gradient(600px 200px at 50% 50%, rgba(121,40,254,0.35), rgba(0,0,0,0))'
        }}
      />
      
      {/* @ts-expect-error - Framer Motion className type issue */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute -right-36 top-0 hidden lg:block"
      >
        <Image
          src={dreStImage}
          alt="Dre St"
          width={350}
          height={600}
          className="object-contain"
        />
      </motion.div>
      
      {/* @ts-expect-error - Framer Motion className type issue */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute -right-48 top-1/3 -translate-y-1/2 hidden lg:block"
      >
        <Image
          src={miwiGif}
          alt="Miwi"
          width={240}
          height={500}
          className="object-contain"
        />
      </motion.div>
      
      {/* @ts-expect-error - Framer Motion className type issue */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute -left-20 top-0 hidden lg:block"
      >
        <Image
          src={drePop1Image}
          alt="Dre Pop"
          width={250}
          height={300}
          className="object-contain"
        />
      </motion.div>
      
      {/* @ts-expect-error - Framer Motion className type issue */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          y: [0, -20, 0]
        }}
        transition={{ 
          opacity: { delay: 0.6, duration: 0.8 },
          x: { delay: 0.6, duration: 0.8 },
          y: { 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="absolute -left-32 top-1/3 -translate-y-1/2 hidden lg:block"
      >
        <Image
          src={zeus1Image}
          alt="Zeus"
          width={300}
          height={400}
          className="object-contain"
        />
      </motion.div>
      
      <TopThree topThree={topThree} />
    </section>
  );
}


