"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop", alt: "Wedding ceremony moment", tall: true },
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop", alt: "Bridal portrait", tall: false },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=700&fit=crop", alt: "Wedding rings close-up", tall: false },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=800&fit=crop", alt: "Couple walking together", tall: false },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=500&fit=crop", alt: "Wedding reception", tall: false },
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=900&fit=crop", alt: "Romantic couple portrait", tall: true },
  { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=600&fit=crop", alt: "Wedding bouquet detail", tall: false },
  { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&h=650&fit=crop", alt: "First dance moment", tall: false },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    );
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + galleryImages.length) % galleryImages.length
        : null
    );
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, goNext, goPrev]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <section className="bg-ivory py-24 md:py-32 px-4 md:px-6 relative z-20 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rose/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-sage/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Camera className="w-8 h-8 md:w-10 md:h-10 text-rose/50 mx-auto mb-5" />
            <span className="font-sans text-rose uppercase tracking-[0.5em] text-[10px] md:text-sm mb-4 block font-medium">
              Prewedding
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-neutral-800 mb-6 tracking-tight">
              Our Gallery
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent via-rose/30 to-rose/30" />
              <Camera size={14} className="text-rose/40" />
              <span className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent via-rose/30 to-rose/30" />
            </div>
          </motion.div>
        </div>

        {/* Photo Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {galleryImages.map((img, i) => (
            <motion.button
              key={i}
              variants={imageVariants}
              onClick={() => openLightbox(i)}
              className={`relative overflow-hidden rounded-2xl md:rounded-3xl group cursor-pointer ${
                img.tall ? "row-span-1 md:row-span-2" : "row-span-1"
              }`}
            >
              <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition-colors duration-500 z-10 rounded-2xl md:rounded-3xl" />
              <div className="w-full h-full min-h-[160px] md:min-h-[200px]">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Camera className="text-white w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 z-10 group"
            >
              <X className="text-white w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 font-sans text-white/50 text-xs md:text-sm tracking-widest">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 group"
            >
              <ChevronLeft className="text-white w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform duration-300" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 group"
            >
              <ChevronRight className="text-white w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>

            {/* Bottom hint */}
            <div className="absolute bottom-6 md:bottom-10 font-sans text-white/30 text-[10px] md:text-xs tracking-widest">
              Use keyboard arrows to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
