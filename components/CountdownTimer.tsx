// @ts-nocheck
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' }
  ];

  return (
    <div>
      <h2 className="text-sm sm:text-base font-semibold text-center text-white/70 mb-4">
        Time Remaining
      </h2>
      <div className="flex justify-center gap-2 sm:gap-3">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="bg-neutral-900/60 ring-1 ring-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 min-w-[60px] sm:min-w-[70px] flex items-center justify-center">
              <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {String(unit.value).padStart(2, '0')}
              </div>
            </div>
            <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-white/50 font-medium">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
