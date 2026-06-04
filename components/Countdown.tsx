"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const Countdown = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const targetDate = new Date("2026-12-12T09:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blob1Y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], [80, -30]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay: 0.1 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="bg-ivory py-32 px-6 flex flex-col items-center relative overflow-hidden"
    >
      {/* Parallax decorative blobs */}
      <motion.div
        style={{ y: blob1Y }}
        className="absolute top-20 right-10 w-64 h-64 bg-rose/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: blob2Y }}
        className="absolute bottom-20 left-10 w-48 h-48 bg-sage/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: blob3Y }}
        className="absolute top-1/2 right-1/3 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="font-serif text-4xl md:text-6xl text-neutral-800 mb-4">
          Counting the Days
        </h2>
        <p className="font-sans text-rose tracking-[0.3em] uppercase text-xs font-medium">
          Until we say "I Do"
        </p>
      </motion.div>

      <div className="flex gap-4 md:gap-12 relative z-10">
        {units.map((unit, i) => (
          <motion.div
            key={unit.label}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={cardVariants}
            className="flex flex-col items-center"
          >
            <div className="relative w-16 md:w-32 h-20 md:h-40 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl flex items-center justify-center overflow-hidden border border-white/60 group hover:shadow-md transition-shadow duration-500">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="font-serif text-4xl md:text-7xl text-neutral-800"
                >
                  {String(unit.value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] to-transparent pointer-events-none" />
            </div>
            <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-neutral-400 mt-4">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Countdown;
