"use client";

import React from "react";
import { motion } from "framer-motion";

const BrandTransition = () => {
  return (
    <section className="relative h-[40vh] md:h-[50vh] bg-black overflow-hidden flex items-end justify-start px-10 md:px-20 pb-12 border-y border-white/5">
      {/* Three-Part Slanted Background Grid */}
      <div className="absolute inset-0 z-0 flex overflow-hidden">
        {/* ... (background zones remain same) */}
        <div 
          className="absolute inset-y-0 left-0 w-[40%] bg-[url('https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 contrast-125 saturate-150"
          style={{ clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0% 100%)' }}
        />
        <div 
          className="absolute inset-y-0 left-[30%] w-[45%] bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50 contrast-125 saturate-150"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 70% 100%, 0% 100%)' }}
        />
        <div 
          className="absolute inset-y-0 right-0 w-[40%] bg-[url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 contrast-125 saturate-150"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* WINORAA GLOBAL Simple and Small Branding - Left Aligned */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10"
      >
        <h2 className="text-[4vw] md:text-[2.5vw] font-bold text-white tracking-[0.4em] uppercase mix-blend-difference drop-shadow-2xl">
          {"WINORAA GLOBAL".split("").map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ 
                duration: 0.6, 
                delay: i * 0.04,
                ease: "easeOut"
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h2>
      </motion.div>
    </section>
  );
};

export default BrandTransition;
