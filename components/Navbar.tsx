"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#" },
    { name: "Our Story", href: "#story" },
    { name: "Save The Date", href: "#save-the-date" },
    { name: "RSVP", href: "#rsvp" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[80] px-6 py-8 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-serif text-3xl text-neutral-800 tracking-tighter"
          >
            R&L
          </motion.div>
        </div>

        <div className="pointer-events-auto">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 group"
          >
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-500 group-hover:text-rose transition-colors duration-300">
              Menu
            </span>
            <div className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-rose group-hover:border-rose transition-all duration-300">
              <Menu size={20} className="text-neutral-800 group-hover:text-white transition-colors duration-300" />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ivory flex flex-col items-center justify-center p-6"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-6 flex items-center gap-3 group"
            >
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-500 group-hover:text-rose transition-colors duration-300">
                Close
              </span>
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-rose transition-all duration-300">
                <X size={20} className="text-white" />
              </div>
            </button>

            <div className="flex flex-col items-center gap-8">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-5xl md:text-7xl text-neutral-800 hover:text-rose transition-colors duration-300 relative group overflow-hidden"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-rose transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </motion.a>
              ))}
            </div>

            <div className="absolute bottom-12 text-center">
              <p className="font-sans text-xs uppercase tracking-[0.5em] text-neutral-400">
                Riski & Laiza • 12.12.2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
