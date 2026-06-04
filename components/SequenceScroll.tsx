"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

const TOTAL_FRAMES = 242;

export default function SequenceScroll({ onLoad }: { onLoad?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0-1) to frame index (1-242)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);

  // Text Overlay Animations
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [20, 0, 0, -20]);

  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.55], [20, 0, 0, -20]);

  const opacity3 = useTransform(scrollYProgress, [0.6, 0.65, 0.8, 0.9], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.6, 0.65, 0.8, 0.9], [20, 0, 0, -20]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${frameNumber}.jpg`;
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
          onLoad?.();
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index - 1];

    if (canvas && ctx && img) {
      // Handle "cover" logic
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const x = canvasWidth / 2 - (imgWidth / 2) * scale;
      const y = canvasHeight / 2 - (imgHeight / 2) * scale;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
    }
  };

  // Update canvas on scroll — throttle to avoid excessive redraws
  const lastRenderedFrame = useRef(0);
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (imagesLoaded) {
      const rounded = Math.round(latest);
      if (rounded !== lastRenderedFrame.current) {
        lastRenderedFrame.current = rounded;
        renderFrame(rounded);
      }
    }
  });

  // Handle resize and initial render
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        if (imagesLoaded) {
          renderFrame(Math.round(frameIndex.get()));
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden will-change-transform">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover will-change-contents"
        />

        {/* Text Overlays */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center px-10">
          {/* Section 1: Center */}
          <motion.div style={{ opacity: opacity1, y: y1 }} className="text-center absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="font-serif text-6xl md:text-8xl text-ivory drop-shadow-2xl">Riski & Laiza</h2>
            <p className="font-sans tracking-[0.4em] text-rose mt-6 drop-shadow-lg font-medium">WE'RE GETTING MARRIED</p>
          </motion.div>

          {/* Section 2: Left */}
          <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute left-10 md:left-24 text-left max-w-2xl">
            <h2 className="font-serif text-5xl md:text-7xl text-ivory drop-shadow-2xl leading-tight">Every love story is beautiful,</h2>
            <p className="font-sans tracking-widest text-rose mt-6 drop-shadow-lg font-medium italic">BUT OURS IS MY FAVORITE</p>
          </motion.div>

          {/* Section 3: Right */}
          <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute right-10 md:right-24 text-right max-w-2xl">
            <h2 className="font-serif text-5xl md:text-7xl text-ivory drop-shadow-2xl leading-tight">Two hearts, one forever.</h2>
            <p className="font-sans tracking-widest text-rose mt-6 drop-shadow-lg font-medium uppercase">DECEMBER 12, 2026</p>
          </motion.div>
        </div>

        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
            <p className="font-serif text-2xl animate-pulse">Loading Magic...</p>
          </div>
        )}
      </div>
    </div>
  );
}
