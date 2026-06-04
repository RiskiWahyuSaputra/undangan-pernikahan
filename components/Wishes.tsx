"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

const wishes = [
  {
    name: "Sarah & David",
    relation: "Best Friends",
    message: "May your love bloom brighter and your companionship grow sweeter with each passing year. Congratulations to the beautiful couple!",
  },
  {
    name: "Aunt Maria",
    relation: "Family",
    message: "Watching you two together is like watching a beautiful dance. May your marriage be filled with harmony and joy.",
  },
  {
    name: "Michael Chen",
    relation: "College Friend",
    message: "To the perfect pair! May your life together be a grand adventure filled with laughter and endless love.",
  },
  {
    name: "The Pratama Family",
    relation: "Neighbors",
    message: "Your love story is an inspiration to us all. Wishing you a lifetime of happiness and prosperity.",
  },
];

const Wishes = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % wishes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-neutral-900 h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="font-serif text-[20vw] text-white/[0.02] select-none uppercase tracking-tighter">
          Love Story
        </span>
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Quote className="text-gold w-12 h-12 mx-auto mb-6 opacity-50" />
            <h2 className="font-serif text-4xl md:text-6xl text-ivory">Warm Wishes</h2>
          </motion.div>
        </div>

        <div className="h-[400px] md:h-[300px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
              <p className="font-serif text-2xl md:text-4xl text-rose leading-relaxed italic mb-8">
                "{wishes[index].message}"
              </p>
              <div className="flex flex-col items-center">
                <span className="font-sans text-ivory text-lg tracking-widest uppercase mb-1">
                  {wishes[index].name}
                </span>
                <span className="font-sans text-neutral-500 text-xs uppercase tracking-[0.3em]">
                  {wishes[index].relation}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-4 mt-12">
          {wishes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 transition-all duration-500 rounded-full ${
                i === index ? "w-12 bg-gold" : "w-4 bg-neutral-700 hover:bg-neutral-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wishes;
