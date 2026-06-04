"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgTextY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);

  const linkVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.3 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  return (
    <footer ref={sectionRef} className="bg-neutral-900 text-ivory py-24 px-6 relative z-20 overflow-hidden">
      {/* Parallax decorative elements */}
      <motion.div
        style={{ y: bgTextY, opacity: bgTextOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="font-serif text-[25vw] text-white/[0.02] select-none uppercase tracking-tighter">
          Forever
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 right-16 md:right-32 text-rose/5 pointer-events-none"
      >
        <Heart size={40} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-32 left-12 md:left-24 text-gold/5 pointer-events-none"
      >
        <Heart size={28} />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="font-serif text-6xl md:text-9xl mb-4 tracking-tighter opacity-20 select-none">
            R & L
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-rose">Riski & Laiza</h2>
          <p className="font-sans text-xs md:text-sm uppercase tracking-[0.5em] text-neutral-500 mt-4 font-medium">
            December 12th, 2026 • Amanjiwo, Indonesia
          </p>
        </motion.div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={linkVariants}
          >
            <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-500">
              © 2026 Riski & Laiza Wedding
            </span>
          </motion.div>
          <div className="flex gap-8">
            {["Instagram", "Facebook", "Spotify"].map((link, i) => (
              <motion.a
                key={link}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={linkVariants}
                href="#"
                className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 hover:text-gold transition-colors duration-300 relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={linkVariants}
          >
            <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-500">
              Made with Love for our Forever
            </span>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
