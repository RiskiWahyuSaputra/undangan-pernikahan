"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Shirt } from "lucide-react";

const SaveTheDate = () => {
  return (
    <section className="bg-ivory py-32 px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-sans text-rose uppercase tracking-[0.5em] text-xs md:text-sm mb-4 block font-medium">
              Join Us
            </span>
            <h2 className="font-serif text-5xl md:text-8xl text-neutral-800">
              Save The Date
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
          {/* Date Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 md:row-span-1 bg-rose/5 backdrop-blur-md border border-rose/10 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center group hover:bg-rose/10 transition-colors duration-500"
          >
            <Calendar className="text-rose mb-6 w-10 h-10 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="font-serif text-3xl text-neutral-800 mb-3">Saturday</h3>
            <div className="relative">
              <p className="font-serif text-6xl md:text-7xl text-rose">12 . 12 . 26</p>
              <div className="absolute -bottom-2 left-0 w-full h-px bg-rose/30" />
            </div>
          </motion.div>

          {/* Time Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-1 md:row-span-1 bg-sage/5 backdrop-blur-md border border-sage/10 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center group hover:bg-sage/10 transition-colors duration-500"
          >
            <Clock className="text-sage mb-6 w-10 h-10 group-hover:rotate-12 transition-transform duration-500" />
            <h3 className="font-serif text-2xl text-neutral-800 mb-2 font-medium">Ceremony</h3>
            <p className="font-sans text-xl text-neutral-600 tracking-widest">09:00 AM</p>
            <div className="mt-4 pt-4 border-t border-sage/20 w-full">
              <h3 className="font-serif text-2xl text-neutral-800 mb-2 font-medium">Reception</h3>
              <p className="font-sans text-xl text-neutral-600 tracking-widest">11:00 AM</p>
            </div>
          </motion.div>

          {/* Dress Code Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-1 md:row-span-2 bg-gold/5 backdrop-blur-md border border-gold/10 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center group hover:bg-gold/10 transition-colors duration-500"
          >
            <Shirt className="text-gold mb-8 w-12 h-12 group-hover:animate-bounce transition-all duration-500" />
            <h3 className="font-serif text-4xl text-neutral-800 mb-6">Dress Code</h3>
            <div className="space-y-4">
              <p className="font-sans text-lg text-neutral-700 font-medium tracking-wide">FORMAL ATTIRE</p>
              <div className="flex flex-col gap-2 items-center">
                <span className="font-sans text-sm text-neutral-500 uppercase tracking-tighter">Preferred Palette:</span>
                <div className="flex gap-3 mt-2">
                  <div className="w-6 h-6 rounded-full bg-sage shadow-inner" title="Sage Green" />
                  <div className="w-6 h-6 rounded-full bg-rose shadow-inner" title="Rose Gold" />
                  <div className="w-6 h-6 rounded-full bg-gold shadow-inner" title="Gold" />
                  <div className="w-6 h-6 rounded-full bg-ivory border border-neutral-200 shadow-inner" title="Ivory" />
                </div>
              </div>
              <p className="font-serif italic text-neutral-600 text-lg mt-6">
                Your presence is our greatest gift, but if you wish to follow our theme, earth tones are preferred.
              </p>
            </div>
          </motion.div>

          {/* Venue Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3 md:row-span-1 bg-white/20 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="flex flex-col md:flex-row items-start justify-between relative z-10">
              <div>
                <MapPin className="text-rose mb-6 w-10 h-10 group-hover:animate-bounce" />
                <h3 className="font-serif text-5xl text-neutral-800 mb-4">Amanjiwo Resort</h3>
                <p className="font-sans text-xl text-neutral-600 max-w-xl leading-relaxed">
                  Ds. Majaksingi, Borobudur, Magelang, Central Java, Indonesia
                </p>
              </div>
              <button className="mt-8 md:mt-0 px-8 py-4 bg-neutral-800 text-white rounded-full font-sans tracking-widest text-sm hover:bg-rose transition-colors duration-500 uppercase font-medium">
                Open Maps
              </button>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-rose/5 rounded-full blur-3xl group-hover:bg-rose/10 transition-colors duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SaveTheDate;
