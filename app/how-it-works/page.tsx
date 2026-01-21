// @ts-nocheck
'use client';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import codePromoImage from '../../logo/codepromo.png';
import bonanzaImage from '../../logo/bonanza.png';
import zeus22Image from '../../logo/zeus22.png';

const steps = [
  {
    title: 'Sign up with referral',
    desc: 'Enter drepop promo code to join the challenge.',
    icon: '🎟️'
  },
  {
    title: 'Play and earn points',
    desc: 'Wager and participate to accumulate points every day.',
    icon: '🎮'
  },
  {
    title: 'Climb and claim',
    desc: 'Reach the top of the leaderboard to unlock rewards.',
    icon: '🏆'
  }
];

export default function HowItWorksPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="px-2 xs:px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 sm:mb-8 md:mb-10"
      >
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold">How It Works</h1>
        <p className="mt-2 text-xs xs:text-sm sm:text-base text-white/70">Three simple steps to start earning.</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {steps.map((s) => (
          <div key={s.title} className="card p-4 xs:p-5 sm:p-6 transition hover:translate-y-[-2px] hover:shadow-lg hover:shadow-brand/10">
            <div className="text-xl xs:text-2xl sm:text-3xl">{s.icon}</div>
            <h3 className="mt-2 xs:mt-3 sm:mt-4 text-sm xs:text-base sm:text-lg font-semibold">{s.title}</h3>
            <p className="mt-1.5 xs:mt-2 text-xs sm:text-sm text-white/70">{s.desc}</p>
          </div>
        ))}
      </motion.div>
      
      <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6 lg:gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ 
            opacity: 1,
            x: 0,
            y: [0, -20, 0]
          }}
          transition={{ 
            opacity: { delay: 0.4, duration: 0.6 },
            x: { delay: 0.4, duration: 0.6 },
            y: { 
              delay: 1,
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="hidden lg:flex justify-start flex-shrink-0"
        >
          <Image
            src={bonanzaImage}
            alt=""
            width={150}
            height={100}
            className="object-contain rounded-lg"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col items-center w-full lg:w-auto px-2"
        >
          <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold mb-2 xs:mb-3 sm:mb-4">Referral Code:</h3>
          <button
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand/60 rounded-lg w-full max-w-sm xs:max-w-md lg:max-w-lg"
            aria-label="View referral code"
          >
            <Image
              src={codePromoImage}
              alt="Referral Code"
              width={600}
              height={400}
              className="object-contain rounded-lg w-full h-auto"
              priority
            />
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ 
            opacity: 1,
            x: 0,
            y: [0, -20, 0]
          }}
          className="hidden lg:flex justify-end flex-shrink-0"
          transition={{ 
            y: { 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <Image
            src={zeus22Image}
            alt=""
            width={150}
            height={100}
            className="object-contain rounded-lg"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300 p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 xs:top-3 xs:right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white text-2xl xs:text-3xl sm:text-4xl font-light transition-colors z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close modal"
          >
            ×
          </button>
          <div
            className="relative max-w-4xl w-full animate-in zoom-in-95 duration-300 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold mb-2 xs:mb-3 sm:mb-4 text-center text-white">Referral Code:</h3>
            <Image
              src={codePromoImage}
              alt="Referral Code"
              width={800}
              height={600}
              className="object-contain rounded-lg max-h-[70vh] w-full h-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
}


