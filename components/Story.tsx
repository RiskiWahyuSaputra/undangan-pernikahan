"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Story = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const text = "Our journey began with a simple conversation that turned into a lifetime of laughter, growth, and unconditional love. From the quiet moments shared over coffee to the grand adventures that shaped our path, every step has led us to this beautiful beginning. We are so grateful to share our story with you as we embark on our greatest adventure yet.";

  const words = text.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative z-20 -mt-[100vh] min-h-[150vh] bg-ivory flex flex-col items-center justify-center px-6 py-32"
    >
      <div className="max-w-4xl mx-auto text-center sticky top-1/4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="font-sans text-rose uppercase tracking-[0.5em] text-xs md:text-sm mb-6 block font-medium">
            Our Story
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-neutral-800 mb-16 leading-tight">
            The Beginning of Forever
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
          {words.map((word, i) => (
            <Word 
              key={i} 
              progress={scrollYProgress} 
              range={[
                0.15 + (i / words.length) * 0.5, 
                0.15 + ((i + 1) / words.length) * 0.5
              ]}
            >
              {word}
            </Word>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="mt-20"
        >
          <div className="w-px h-24 bg-gradient-to-b from-rose to-transparent mx-auto" />
        </motion.div>
      </div>
    </section>
  );
};

const Word = ({ children, progress, range }: { children: string; progress: any; range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [10, 0]);
  
  return (
    <span className="relative inline-block overflow-hidden pb-1">
      <motion.span 
        style={{ opacity, y }} 
        className="text-neutral-700 font-serif text-2xl md:text-4xl lg:text-5xl leading-tight"
      >
        {children}
      </motion.span>
    </span>
  );
};

export default Story;
