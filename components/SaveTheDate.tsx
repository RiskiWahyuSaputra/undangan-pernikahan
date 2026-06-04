"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Clock, MapPin, Shirt, Heart, ChevronRight } from "lucide-react";
import { useRef } from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const SaveTheDate = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blob1Y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], [60, -20]);

  return (
    <section ref={sectionRef} className="bg-ivory py-24 md:py-32 px-4 md:px-6 relative z-20 overflow-hidden">
      {/* Background decorative elements with parallax */}
      <motion.div style={{ y: blob1Y }} className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-rose/5 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: blob2Y }} className="absolute bottom-0 left-0 w-56 h-56 md:w-80 md:h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: blob3Y }} className="absolute top-1/3 left-1/4 w-32 h-32 bg-sage/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="font-sans text-rose uppercase tracking-[0.5em] text-[10px] md:text-sm mb-4 block font-medium">
              Join Us
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-neutral-800 mb-6 tracking-tight">
              Save The Date
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent via-rose/30 to-rose/30" />
              <Heart size={14} className="text-rose/40 fill-rose/20" />
              <span className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent via-rose/30 to-rose/30" />
            </div>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6">
          {/* Date Card */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="md:col-span-2 md:row-span-1 bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-center items-center text-center group hover:bg-white/80 transition-all duration-500 shadow-sm hover:shadow-lg"
          >
            <div className="absolute -top-4 -left-4 text-rose/[0.04] font-serif text-9xl leading-none select-none pointer-events-none">
              &ldquo;
            </div>
            <Calendar className="text-rose mb-5 md:mb-6 w-7 h-7 md:w-10 md:h-10 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="font-serif text-xl md:text-3xl text-neutral-800 mb-2 md:mb-3 font-medium">
              Saturday
            </h3>
            <div className="relative inline-block">
              <p className="font-serif text-4xl md:text-7xl text-rose tracking-tighter font-light">
                12<span className="mx-0.5 md:mx-2">.</span>12<span className="mx-0.5 md:mx-2">.</span>26
              </p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-rose/40 to-transparent" />
            </div>
            <p className="font-sans text-[10px] md:text-sm text-neutral-400 uppercase tracking-[0.3em] mt-4 md:mt-6 font-medium">
              December 2026
            </p>
          </motion.div>

          {/* Time Card */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="md:col-span-1 md:row-span-1 bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl md:rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-center items-center text-center group hover:bg-white/80 transition-all duration-500 shadow-sm hover:shadow-lg"
          >
            <Clock className="text-sage mb-5 md:mb-6 w-7 h-7 md:w-10 md:h-10 group-hover:rotate-12 transition-transform duration-500" />
            <div className="space-y-5 md:space-y-6 w-full">
              <div>
                <h3 className="font-serif text-lg md:text-2xl text-neutral-800 mb-1 font-medium">
                  Ceremony
                </h3>
                <p className="font-sans text-base md:text-xl text-neutral-600 tracking-widest">
                  09:00 AM
                </p>
              </div>
              <div className="w-10 md:w-12 h-px bg-sage/30 mx-auto" />
              <div>
                <h3 className="font-serif text-lg md:text-2xl text-neutral-800 mb-1 font-medium">
                  Reception
                </h3>
                <p className="font-sans text-base md:text-xl text-neutral-600 tracking-widest">
                  11:00 AM
                </p>
              </div>
            </div>
          </motion.div>

          {/* Dress Code Card */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="md:col-span-1 md:row-span-2 bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl md:rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-center items-center text-center group hover:bg-white/80 transition-all duration-500 shadow-sm hover:shadow-lg"
          >
            <Shirt className="text-gold mb-5 md:mb-6 w-7 h-7 md:w-10 md:h-10 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="font-serif text-2xl md:text-4xl text-neutral-800 mb-4 md:mb-6 font-medium">
              Dress Code
            </h3>

            <div className="mb-5 md:mb-6">
              <span className="inline-block px-4 md:px-5 py-1.5 md:py-2 bg-neutral-800 text-white rounded-full font-sans text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] font-medium">
                Formal Attire
              </span>
            </div>

            <div className="space-y-2 md:space-y-3">
              <p className="font-sans text-[9px] md:text-xs text-neutral-400 uppercase tracking-[0.2em]">
                Preferred Palette
              </p>
              <div className="flex gap-2 md:gap-3 justify-center">
                <div
                  className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-sage shadow-inner ring-2 ring-white/50 transition-transform hover:scale-125 duration-300 cursor-default"
                  title="Sage Green"
                />
                <div
                  className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-rose shadow-inner ring-2 ring-white/50 transition-transform hover:scale-125 duration-300 cursor-default"
                  title="Rose Gold"
                />
                <div
                  className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-gold shadow-inner ring-2 ring-white/50 transition-transform hover:scale-125 duration-300 cursor-default"
                  title="Gold"
                />
                <div
                  className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-ivory border border-neutral-200 shadow-inner ring-2 ring-white/50 transition-transform hover:scale-125 duration-300 cursor-default"
                  title="Ivory"
                />
              </div>
            </div>

            <p className="font-serif italic text-neutral-400 text-xs md:text-base mt-6 md:mt-8 leading-relaxed max-w-[220px] md:max-w-xs">
              &ldquo;Your presence is our greatest gift, but earth tones are warmly welcomed.&rdquo;
            </p>
          </motion.div>

          {/* Venue Card */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="md:col-span-3 md:row-span-1 bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-start justify-between relative overflow-hidden group hover:bg-white/80 transition-all duration-500 shadow-sm hover:shadow-lg"
          >
            <div className="relative z-10 w-full md:w-auto">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <MapPin className="text-rose w-5 h-5 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-500" />
                <span className="font-sans text-[9px] md:text-xs uppercase tracking-[0.3em] text-rose font-medium">
                  Venue
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl text-neutral-800 mb-2 md:mb-3">
                Amanjiwo Resort
              </h3>
              <p className="font-sans text-xs md:text-base text-neutral-500 max-w-xl leading-relaxed">
                Ds. Majaksingi, Borobudur, Magelang
              </p>
              <p className="font-sans text-xs md:text-base text-neutral-500 max-w-xl">
                Central Java, Indonesia
              </p>
            </div>

            <div className="relative z-10 mt-6 md:mt-0 flex-shrink-0 self-stretch md:self-auto flex items-start md:items-center">
              <button className="group/btn relative inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-neutral-800 text-white rounded-full font-sans tracking-widest text-[10px] md:text-sm hover:bg-rose transition-all duration-500 uppercase font-medium overflow-hidden w-full md:w-auto justify-center">
                <span className="relative z-10">Open Maps</span>
                <ChevronRight
                  size={14}
                  className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-rose to-rose/80 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-12 md:-right-16 -bottom-12 md:-bottom-16 w-36 md:w-48 h-36 md:h-48 bg-rose/5 rounded-full blur-2xl group-hover:bg-rose/10 transition-colors duration-500 pointer-events-none" />
            <div className="absolute -right-4 md:-right-8 -bottom-4 md:-bottom-8 w-16 md:w-24 h-16 md:h-24 bg-gold/5 rounded-full blur-xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SaveTheDate;
