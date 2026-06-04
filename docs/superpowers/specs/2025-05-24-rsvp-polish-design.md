# Design Specification: Task 5 - RSVP & Polish (Navbar, Countdown, Preloader)

**Status:** Approved
**Approach:** Refined Luxury
**Aesthetic:** Ivory/Rose/Sage/Gold palette with high-end motion design using `framer-motion`.

## 1. Preloader (`components/Preloader.tsx`)
- **Visuals**: Full-screen background (`bg-ivory`).
- **Monogram**: SVG path of "R & L" centered.
- **Animation**: 
    - `pathLength` from 0 to 1 over 2 seconds.
    - `stroke`: Gold (`#E9C46A`).
- **Exit Transition**: 
    - Background splits into two vertical halves (`framer-motion` variants).
    - Halves slide to the left and right (`x: -100%`, `x: 100%`).
- **State Management**: Use a `loading` state in `layout.tsx` or `page.tsx` to handle visibility.

## 2. Navbar & Menu (`components/Navbar.tsx`)
- **Position**: `fixed top-0 left-0 w-full z-40`.
- **Background**: `bg-ivory/80 backdrop-blur-md`.
- **Logo**: "R & L" monogram in `Cormorant Garamond` (Rose/Gold).
- **Menu Button**: Hamburger icon (3 lines) in Sage/Rose.
- **Full-screen Overlay**:
    - `AnimatePresence` for smooth entrance/exit.
    - Links: Home, Our Story, Save The Date, Countdown, RSVP.
    - Links animation: Staggered `y: 20` to `y: 0` with `opacity: 0` to `opacity: 1`.
    - Background: `bg-rose/95`.
    - Text: `text-ivory`.

## 3. Countdown (`components/Countdown.tsx`)
- **Target Date**: December 12, 2026.
- **Structure**: Flex container with 4 blocks.
- **Visuals**:
    - Numbers: `text-5xl md:text-7xl font-serif text-rose`.
    - Labels: `text-xs uppercase tracking-widest text-sage`.
    - Dividers: Gold thin lines between blocks.
- **Animation**: Numbers slide up when they change (`key` change in `framer-motion`).

## 4. RSVP (`components/RSVP.tsx`)
- **Background**:
    - Three `div`s with `blur-3xl opacity-30`.
    - Colors: Sage (`#CCD5AE`), Rose (`#D4A373`), Gold (`#E9C46A`).
    - Animation: Infinite floating motion (`animate={{ x: [...], y: [...] }}`).
- **Form Card**:
    - Container: `bg-ivory/90 p-8 md:p-12 rounded-2xl shadow-xl max-w-2xl mx-auto`.
    - Fields: Name (Input), Attendance (Radio/Toggle), Guests (Select/Input), Message (Textarea).
    - Field Style: Minimalist with bottom-border focus (`border-b border-rose/30 focus:border-rose`).
- **Button**:
    - Text: "Send Invitation".
    - Effect: Magnetic (subtle attraction to cursor within 50px).
    - Visuals: `bg-rose text-ivory px-8 py-3 rounded-full hover:bg-gold transition-colors`.

## 5. Integration (`app/page.tsx`)
- **Order**:
    1. Preloader (conditionally rendered)
    2. Navbar
    3. SequenceScroll (Hero)
    4. Story
    5. SaveTheDate
    6. Countdown
    7. RSVP
    8. Footer (Simple ivory text)

## Technical Constraints
- Use `framer-motion` for all animations.
- Use `lucide-react` for icons if needed.
- Ensure responsive design for all new components.
- Maintain `SmoothScroll` compatibility.
