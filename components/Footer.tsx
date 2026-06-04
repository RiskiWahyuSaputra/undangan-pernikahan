"use client";

import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-ivory py-24 px-6 relative z-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="font-serif text-6xl md:text-9xl mb-4 tracking-tighter opacity-20">R & L</div>
          <h2 className="font-serif text-3xl md:text-5xl text-rose">Riski & Laiza</h2>
          <p className="font-sans text-xs md:text-sm uppercase tracking-[0.5em] text-neutral-500 mt-4 font-medium">
            December 12th, 2026 • Amanjiwo, Indonesia
          </p>
        </motion.div>

        <div className="w-full h-px bg-white/10 mb-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-sans text-[10px] uppercase tracking-widest text-neutral-500">
            © 2026 Riski & Laiza Wedding
          </div>
          <div className="flex gap-8">
            {["Instagram", "Facebook", "Spotify"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 hover:text-gold transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="font-sans text-[10px] uppercase tracking-widest text-neutral-500">
            Made with Love for our Forever
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
