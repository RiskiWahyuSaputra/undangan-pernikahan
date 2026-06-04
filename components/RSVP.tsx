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
      petals = Array.from({ length: 50 }, () => new Petal());
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

  return (
    <section id="rsvp" className="relative min-h-screen bg-ivory py-32 px-6 flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-2xl bg-white/40 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-[3rem] shadow-xl"
      >
        <div className="text-center mb-12">
          <h2 className="font-serif text-5xl text-neutral-800 mb-4">Will You Attend?</h2>
          <p className="font-sans text-neutral-500 uppercase tracking-widest text-xs">Kindly respond by November 1st, 2026</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-sans text-xs uppercase tracking-widest text-neutral-400 mb-2 ml-4">Full Name</label>
            <input
              type="text"
              required
              className="w-full bg-white/50 border border-neutral-100 rounded-2xl px-6 py-4 outline-none focus:border-rose transition-colors duration-300 font-sans"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-neutral-400 mb-2 ml-4">Attendance</label>
              <select
                className="w-full bg-white/50 border border-neutral-100 rounded-2xl px-6 py-4 outline-none focus:border-rose transition-colors duration-300 font-sans appearance-none"
                value={form.attendance}
                onChange={(e) => setForm({ ...form, attendance: e.target.value })}
              >
                <option value="yes">Accept with pleasure</option>
                <option value="no">Decline with regret</option>
              </select>
            </div>
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-neutral-400 mb-2 ml-4">Guests</label>
              <select
                className="w-full bg-white/50 border border-neutral-100 rounded-2xl px-6 py-4 outline-none focus:border-rose transition-colors duration-300 font-sans appearance-none"
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
              >
                <option value="1">1 Person</option>
                <option value="2">2 Persons</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-sans text-xs uppercase tracking-widest text-neutral-400 mb-2 ml-4">Message for the Couple</label>
            <textarea
              rows={4}
              className="w-full bg-white/50 border border-neutral-100 rounded-2xl px-6 py-4 outline-none focus:border-rose transition-colors duration-300 font-sans resize-none"
              placeholder="Write your wishes..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-neutral-800 text-white py-5 rounded-2xl font-sans uppercase tracking-[0.3em] text-sm hover:bg-rose transition-colors duration-500 shadow-lg shadow-neutral-800/10"
          >
            Send Invitation
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default RSVP;
