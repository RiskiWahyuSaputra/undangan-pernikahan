"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const RSVP = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [form, setForm] = useState({
    name: "",
    attendance: "yes",
    guests: "1",
    message: "",
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let petals: Petal[] = [];

    class Petal {
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
      spin: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height - canvas!.height;
        this.size = Math.random() * 5 + 5;
        this.speed = Math.random() * 1 + 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = Math.random() * 0.02 - 0.01;
      }

      update() {
        this.y += this.speed;
        this.x += Math.sin(this.y / 50) * 0.5;
        this.angle += this.spin;
        if (this.y > canvas!.height) {
          this.y = -20;
          this.x = Math.random() * canvas!.width;
        }
      }

      draw() {
        ctx!.save();
        ctx!.translate(this.x, this.y);
        ctx!.rotate(this.angle);
        ctx!.beginPath();
        ctx!.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(212, 163, 115, 0.3)"; // Rose color
        ctx!.fill();
        ctx!.restore();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      petals = Array.from({ length: 25 }, () => new Petal());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", init);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your RSVP, " + form.name + "!");
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  return (
    <section id="rsvp" className="relative min-h-screen bg-ivory py-32 px-6 flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />

      {/* Parallax decorative blobs */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-48 h-48 bg-rose/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-10 w-56 h-56 bg-gold/5 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        variants={formVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative z-10 w-full max-w-2xl bg-white/70 border border-white/60 p-8 md:p-12 rounded-[3rem] shadow-xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-neutral-800 mb-4">Will You Attend?</h2>
          <p className="font-sans text-neutral-500 uppercase tracking-widest text-xs">Kindly respond by November 1st, 2026</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fieldVariants}
          >
            <label className="block font-sans text-xs uppercase tracking-widest text-neutral-400 mb-2 ml-4">Full Name</label>
            <input
              type="text"
              required
              className="w-full bg-white/50 border border-neutral-100 rounded-2xl px-6 py-4 outline-none focus:border-rose focus:shadow-lg focus:shadow-rose/5 transition-all duration-300 font-sans"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fieldVariants}
            >
              <label className="block font-sans text-xs uppercase tracking-widest text-neutral-400 mb-2 ml-4">Attendance</label>
              <select
                className="w-full bg-white/50 border border-neutral-100 rounded-2xl px-6 py-4 outline-none focus:border-rose focus:shadow-lg focus:shadow-rose/5 transition-all duration-300 font-sans appearance-none"
                value={form.attendance}
                onChange={(e) => setForm({ ...form, attendance: e.target.value })}
              >
                <option value="yes">Accept with pleasure</option>
                <option value="no">Decline with regret</option>
              </select>
            </motion.div>
            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fieldVariants}
            >
              <label className="block font-sans text-xs uppercase tracking-widest text-neutral-400 mb-2 ml-4">Guests</label>
              <select
                className="w-full bg-white/50 border border-neutral-100 rounded-2xl px-6 py-4 outline-none focus:border-rose focus:shadow-lg focus:shadow-rose/5 transition-all duration-300 font-sans appearance-none"
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
              >
                <option value="1">1 Person</option>
                <option value="2">2 Persons</option>
              </select>
            </motion.div>
          </div>

          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fieldVariants}
          >
            <label className="block font-sans text-xs uppercase tracking-widest text-neutral-400 mb-2 ml-4">Message for the Couple</label>
            <textarea
              rows={4}
              className="w-full bg-white/50 border border-neutral-100 rounded-2xl px-6 py-4 outline-none focus:border-rose focus:shadow-lg focus:shadow-rose/5 transition-all duration-300 font-sans resize-none"
              placeholder="Write your wishes..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fieldVariants}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-neutral-800 text-white py-5 rounded-2xl font-sans uppercase tracking-[0.3em] text-sm hover:bg-rose transition-colors duration-500 shadow-lg shadow-neutral-800/10"
            >
              Send Invitation
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
};

export default RSVP;
