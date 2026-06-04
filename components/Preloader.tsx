"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          {/* Background Panels */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 bg-ivory"
          />
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 bg-ivory"
          />

          {/* Monogram SVG */}
          <div className="relative z-10 w-32 h-32 md:w-48 md:h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <motion.path
                d="M30 20 L30 80 M30 20 Q60 20 60 40 Q60 60 30 60 M50 60 L70 80"
                fill="none"
                stroke="#E9C46A"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.path
                d="M45 45 L55 55 M55 45 L45 55"
                fill="none"
                stroke="#D4A373"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              />
              <motion.path
                d="M75 20 L75 80 L90 80"
                fill="none"
                stroke="#E9C46A"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
