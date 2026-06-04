# Riski & Laiza Scrollytelling Invitation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cinematic, Awwwards-level digital wedding invitation featuring a scroll-linked image sequence on canvas with high-end typography and interactive sections.

**Architecture:** A Next.js 15 application using a sticky HTML5 Canvas hero driven by Framer Motion's `useScroll`. Subsequent sections transition over the canvas, utilizing Lenis for smooth scrolling and staggered animations for content delivery.

**Tech Stack:** Next.js 15, Tailwind CSS, Motion (Framer Motion), Lenis, HTML5 Canvas, Google Fonts (Cormorant Garamond, DM Sans).

---

### Task 1: Project Initialization & Configuration

**Files:**
- Create: `tailwind.config.ts`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `components/SmoothScroll.tsx`

- [ ] **Step 1: Configure Tailwind with custom fonts and palette**

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F4EF",
        rose: "#D4A373",
        sage: "#CCD5AE",
        gold: "#E9C46A",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)"],
        sans: ["var(--font-dm-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Setup Root Layout with Google Fonts**

```tsx
// app/layout.tsx
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-ivory text-neutral-900 antialiased font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Implement Lenis Smooth Scroll Wrapper**

```tsx
// components/SmoothScroll.tsx
"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
```

- [ ] **Step 4: Commit**
```bash
git add .
git commit -m "setup: initial project config with fonts, colors, and smooth scroll"
```

---

### Task 2: The Canvas Engine (SequenceScroll)

**Files:**
- Create: `components/SequenceScroll.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Implement SequenceScroll with Frame Loading**

```tsx
// components/SequenceScroll.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const totalFrames = 242;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, totalFrames]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/sequence/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) setImages(loadedImages);
      };
      loadedImages.push(img);
    }
  }, []);

  useEffect(() => {
    const render = () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || images.length < totalFrames) return;

      const index = Math.floor(frameIndex.get());
      const img = images[index - 1] || images[0];

      // Draw cover logic
      const canvas = canvasRef.current!;
      const iw = img.width;
      const ih = img.height;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      const nx = (cw - nw) / 2;
      const ny = (ch - nh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, nx, ny, nw, nh);
    };

    return frameIndex.on("change", render);
  }, [images, frameIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update Page to include SequenceScroll**
```tsx
// app/page.tsx
import SequenceScroll from "@/components/SequenceScroll";

export default function Home() {
  return (
    <main>
      <SequenceScroll />
      {/* Subsequent sections will go here */}
    </main>
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add .
git commit -m "feat: implement high-performance canvas sequence scroll engine"
```

---

### Task 3: Hero Text Overlays

**Files:**
- Modify: `components/SequenceScroll.tsx`

- [ ] **Step 1: Add Scroll-Linked Text Overlays**

```tsx
// Inside components/SequenceScroll.tsx return div
// Add this after the sticky container
<div className="pointer-events-none absolute inset-0 z-10">
  <OverlayText progress={scrollYProgress} range={[0, 0.2]} title="Riski & Laiza" subtitle="WE'RE GETTING MARRIED" />
  <OverlayText progress={scrollYProgress} range={[0.3, 0.5]} title="Every love story is beautiful," subtitle="BUT OURS IS MY FAVORITE" align="left" />
  <OverlayText progress={scrollYProgress} range={[0.6, 0.8]} title="Two hearts, one forever." subtitle="DECEMBER 12, 2026" align="right" />
</div>

// Helper Component (defined outside or in new file)
function OverlayText({ progress, range, title, subtitle, align = "center" }: any) {
  const opacity = useTransform(progress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[1]], [50, -50]);

  const alignmentClasses = {
    center: "items-center text-center",
    left: "items-start text-left pl-10 md:pl-20",
    right: "items-end text-right pr-10 md:pr-20",
  }[align as "center" | "left" | "right"];

  return (
    <motion.div style={{ opacity, y }} className={`absolute inset-0 flex flex-col justify-center ${alignmentClasses}`}>
      <h2 className="font-serif text-5xl md:text-8xl tracking-widest text-neutral-800 uppercase">{title}</h2>
      <p className="font-sans text-sm md:text-lg tracking-[0.3em] text-rose mt-4 font-medium">{subtitle}</p>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add .
git commit -m "feat: add scroll-synced cinematic text overlays to hero"
```

---

### Task 4: Content Sections (Story & Bento)

**Files:**
- Create: `components/Story.tsx`
- Create: `components/SaveTheDate.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Implement "Our Story" Section with Text Reveal**

```tsx
// components/Story.tsx
"use client";
import { motion } from "framer-motion";

export default function Story() {
  const text = "From a chance meeting to a lifetime of love. We invite you to witness the beginning of our forever.";
  return (
    <section className="relative z-20 -mt-[100vh] min-h-screen bg-ivory flex items-center justify-center px-6 py-24">
      <div className="max-w-4xl text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-serif text-3xl md:text-5xl leading-relaxed text-neutral-800"
        >
          {text}
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Implement "Save The Date" Bento Grid**

```tsx
// components/SaveTheDate.tsx
export default function SaveTheDate() {
  return (
    <section className="bg-ivory py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
        <div className="md:col-span-2 md:row-span-2 bg-rose/10 rounded-3xl p-8 flex flex-col justify-end backdrop-blur-sm border border-white/20">
          <h3 className="font-serif text-4xl mb-2">The Venue</h3>
          <p className="font-sans opacity-70">Grand Ballroom, St. Regis Hotel</p>
        </div>
        <div className="bg-sage/10 rounded-3xl p-8 flex flex-col justify-center items-center text-center backdrop-blur-sm border border-white/20">
          <span className="text-4xl mb-2">12</span>
          <p className="font-serif uppercase tracking-widest">DEC 2026</p>
        </div>
        <div className="bg-gold/10 rounded-3xl p-8 flex flex-col justify-center backdrop-blur-sm border border-white/20">
          <h3 className="font-serif text-2xl">18:00</h3>
          <p className="text-xs uppercase tracking-tighter">PM Western Time</p>
        </div>
        <div className="md:col-span-2 bg-neutral-900 rounded-3xl p-8 flex items-center justify-between text-white">
          <p className="font-serif text-2xl italic">Dress Code</p>
          <p className="font-sans text-sm tracking-widest uppercase">Classic Formal</p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add .
git commit -m "feat: add story and bento grid sections with overlap transition"
```

---

### Task 5: RSVP & Polish (Navbar, Countdown)

**Files:**
- Create: `components/Navbar.tsx`
- Create: `components/RSVP.tsx`
- Create: `components/Preloader.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Implement Preloader**

```tsx
// components/Preloader.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-neutral-900 flex items-center justify-center text-ivory"
        >
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-serif text-4xl tracking-[0.5em]"
          >
            R & L
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Assemble Full Page**
```tsx
// app/page.tsx
import SequenceScroll from "@/components/SequenceScroll";
import Story from "@/components/Story";
import SaveTheDate from "@/components/SaveTheDate";
import RSVP from "@/components/RSVP";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Preloader />
      <Navbar />
      <SequenceScroll />
      <Story />
      <SaveTheDate />
      <RSVP />
    </main>
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add .
git commit -m "feat: complete application assembly with preloader and rsvp"
```
