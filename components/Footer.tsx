"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  const linkVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.3 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  return (
    <footer className="bg-neutral-900 text-ivory py-24 px-6 relative z-20 overflow-hidden">
      {/* Static background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="font-serif text-[25vw] text-white/[0.02] select-none uppercase tracking-tighter">
          Forever
        </span>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="font-serif text-6xl md:text-9xl mb-4 tracking-tighter opacity-20 select-none">
            R &amp; L
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-rose">Riski &amp; Laiza</h2>
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
              © 2026 Riski &amp; Laiza Wedding
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
      </div>
    </footer>
  );
};

export default Footer;
