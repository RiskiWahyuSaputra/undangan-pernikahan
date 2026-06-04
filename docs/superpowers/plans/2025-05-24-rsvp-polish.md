# RSVP & Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Preloader, Navbar, Countdown, RSVP, and Footer to finalize the wedding invitation with high-end polish.

**Architecture:** Component-based architecture using `framer-motion` for all animations. State-driven preloader for the entrance experience.

**Tech Stack:** Next.js (App Router), Tailwind CSS, Framer Motion, Lucide React.

---

### Task 1: Preloader Component

**Files:**
- Create: `components/Preloader.tsx`

- [ ] **Step 1: Create the Preloader component with SVG line drawing**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/Preloader.tsx
git commit -m "feat: add Preloader component with SVG line drawing"
```

---

### Task 2: Navbar & Menu Component

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Implement Navbar with blurred glass and full-screen menu**

```tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", href: "#home" },
  { name: "Our Story", href: "#story" },
  { name: "Save The Date", href: "#save-the-date" },
  { name: "Countdown", href: "#countdown" },
  { name: "RSVP", href: "#rsvp" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 bg-ivory/80 backdrop-blur-md border-b border-rose/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-serif text-2xl text-rose font-bold">R & L</div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-rose hover:text-gold transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-rose/95 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="font-serif text-4xl md:text-6xl text-ivory hover:text-gold transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add Navbar and full-screen menu overlay"
```

---

### Task 3: Countdown Timer Component

**Files:**
- Create: `components/Countdown.tsx`

- [ ] **Step 1: Implement Countdown logic and UI**

```tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET_DATE = new Date("2026-12-12T00:00:00");

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = TARGET_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label, showDivider = true }: any) => (
    <div className="flex items-center">
      <div className="flex flex-col items-center px-4 md:px-8">
        <div className="h-16 md:h-24 overflow-hidden relative w-20 md:w-32 flex justify-center">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              className="font-serif text-5xl md:text-7xl text-rose font-medium absolute"
            >
              {value.toString().padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-sage mt-2">
          {label}
        </span>
      </div>
      {showDivider && (
        <div className="h-12 w-[1px] bg-gold/30 hidden sm:block" />
      )}
    </div>
  );

  return (
    <section id="countdown" className="py-24 bg-ivory flex flex-col items-center">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="font-serif text-3xl text-rose mb-12"
      >
        The Countdown
      </motion.h2>
      <div className="flex flex-wrap justify-center items-center">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" showDivider={false} />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Countdown.tsx
git commit -m "feat: add Countdown timer with slide-up animations"
```

---

### Task 4: RSVP Component

**Files:**
- Create: `components/RSVP.tsx`

- [ ] **Step 1: Implement RSVP with animated background and magnetic button**

```tsx
"use client";
import { useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    attendance: "yes",
    guests: "1",
    message: "",
  });

  // Magnetic Button Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="rsvp" className="relative py-24 min-h-screen flex items-center justify-center overflow-hidden bg-ivory">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-sage/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 120, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-1/2 -right-20 w-80 h-80 bg-rose/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -100, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute -bottom-20 left-1/4 w-72 h-72 bg-gold/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl px-6"
      >
        <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-rose/10">
          <h2 className="font-serif text-4xl text-rose text-center mb-4">RSVP</h2>
          <p className="font-sans text-sage text-center mb-10 tracking-widest uppercase text-xs">Kindly Respond By Dec 1st</p>

          <form className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-sage mb-2">Your Name</label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-rose/30 py-2 focus:outline-none focus:border-rose transition-colors font-serif text-xl"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-sage mb-2">Will you attend?</label>
                <select className="w-full bg-transparent border-b border-rose/30 py-2 focus:outline-none focus:border-rose transition-colors font-serif text-xl appearance-none cursor-pointer">
                  <option value="yes">Accepts with pleasure</option>
                  <option value="no">Declines with regret</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-sage mb-2">Number of Guests</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  defaultValue="1"
                  className="w-full bg-transparent border-b border-rose/30 py-2 focus:outline-none focus:border-rose transition-colors font-serif text-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-sage mb-2">Special Message</label>
              <textarea
                rows={3}
                className="w-full bg-transparent border-b border-rose/30 py-2 focus:outline-none focus:border-rose transition-colors font-serif text-xl resize-none"
              />
            </div>

            <div className="pt-8 flex justify-center">
              <motion.button
                style={{ x: springX, y: springY }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="bg-rose text-ivory px-12 py-4 rounded-full font-sans tracking-widest text-sm uppercase hover:bg-gold transition-colors shadow-lg"
              >
                Send Invitation
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/RSVP.tsx
git commit -m "feat: add RSVP component with floating orbs and magnetic button"
```

---

### Task 5: Final Page Assembly & Footer

**Files:**
- Create: `components/Footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create Footer component**

```tsx
export default function Footer() {
  return (
    <footer className="py-12 bg-ivory border-t border-rose/10 flex flex-col items-center gap-4">
      <div className="font-serif text-2xl text-rose font-bold">R & L</div>
      <p className="text-sage text-[10px] uppercase tracking-[0.3em]">Thank You for Joining Us</p>
      <p className="text-rose/50 text-[8px] mt-4 uppercase tracking-[0.1em]">© 2026 Riski & Laiza</p>
    </footer>
  );
}
```

- [ ] **Step 2: Assemble all components in page.tsx**

```tsx
"use client";
import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import Story from "@/components/Story";
import SaveTheDate from "@/components/SaveTheDate";
import Countdown from "@/components/Countdown";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load or wait for resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-ivory">
      <Preloader isLoading={isLoading} />
      
      {!isLoading && (
        <>
          <Navbar />
          <section id="home" className="relative w-full">
            <SequenceScroll />
          </section>
          <Story />
          <SaveTheDate />
          <Countdown />
          <RSVP />
          <Footer />
        </>
      )}
    </main>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx app/page.tsx
git commit -m "feat: assemble final page with all components and Preloader logic"
```
