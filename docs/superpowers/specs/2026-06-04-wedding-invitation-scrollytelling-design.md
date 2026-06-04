# Design Spec: Riski & Laiza Scrollytelling Wedding Invitation

**Date:** 2026-06-04
**Status:** Approved
**Topic:** High-end "Scrollytelling" digital wedding invitation using Next.js and Motion.

## 1. Vision & Goals
Create a cinematic, Awwwards-level digital invitation for "Riski & Laiza". The primary mechanic is a scroll-linked image sequence that tells their story through 242 frames of video-to-image sequence, blended seamlessly with the website UI.

## 2. Technical Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS (Custom Theme)
- **Animation:** Motion (Framer Motion)
- **Scroll Physics:** Lenis (Smooth Scroll)
- **Rendering:** HTML5 Canvas API (for high-performance frame playback)
- **Typography:** Cormorant Garamond (Serif, Headlines) & DM Sans (Sans-serif, Body)

## 3. Architecture
### 3.1. Navigation & Global State
- **Navbar:** Fixed position, minimal design with "R&L" monogram.
- **Menu Overlay:** Fullscreen Motion-driven menu with large text links and reveal animations.
- **Scroll State:** Managed via `useScroll` from Motion to drive the Canvas frames and text overlays.

### 3.2. SequenceScroll Component (Hero)
- **Container:** `h-[400vh]` to define the "scroll track".
- **Canvas Engine:** 
  - Sticky `h-screen w-full top-0`.
  - Background color matches image sequence background (target: `#F7F4EF`).
  - Pre-loads 242 frames from `/sequence/ezgif-frame-[001-242].jpg`.
  - Draw loop updates based on scroll progress (0.0 to 1.0).
- **Text Layers:** 
  - Sequential fade-in/out blocks synchronized with specific scroll offsets.
  - 0%: "Riski & Laiza - We're getting married"
  - 30%: "Every love story is beautiful..."
  - 60%: "Two hearts, one forever."
  - 90%: Call to Action.

### 3.3. Content Sections (Post-Sequence)
- **Our Story:** Staggered character reveal on scroll.
- **Save the Date:** Bento grid layout with glassmorphic cards.
- **Countdown:** Real-time countdown with slide-transition digits.
- **Wishes:** Draggable/Autoplay slider for guest messages.
- **RSVP:** Interactive form with magnetic buttons and animated background.
- **Footer:** Initials, date, and social links.

## 4. Visual Language
- **Palette:** Warm Ivory (`#F7F4EF`), Dusty Rose (`#D4A373`), Sage Green (`#CCD5AE`), Gold (`#E9C46A`).
- **Interaction:** Magnetic buttons, custom cursor (optional), smooth transitions between sections.

## 5. Performance Strategy
- **Image Preloading:** Custom `Preloader` component ensures all 242 frames are cached in browser memory before showing the UI.
- **Canvas Optimization:** `requestAnimationFrame` for smooth frame swaps; canvas `drawImage` for efficient rendering.
- **Mobile:** `object-fit: cover` logic implemented within the canvas draw function to handle aspect ratio changes.

## 6. Implementation Plan
1. Project Setup (Next.js, Tailwind config, Fonts).
2. Canvas Engine & Frame Loading.
3. Scroll Logic (useScroll) & Frame Drawing.
4. Text Overlay Implementation.
5. Post-Hero Sections (Story, Bento, Countdown, RSVP).
6. Polish (Lenis, Preloader, Magnetic Buttons).
