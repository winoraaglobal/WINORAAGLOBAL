"use client";

import React from "react";
import { motion } from "framer-motion";

const leftHeadingLines = [
  "CREATING",
  "AMAZING",
  "EXPERIENCES",
  "IS WHAT",
  "WE DO.",
];

const rightContent = [
  {
    title: "Music Festivals, Concerts and incredible music experiences.",
    body: "Festival Haus, our Flagship Music and Entertainment brand, is where some of our biggest moments happen. The Fathom // Festival Haus Studio develops, promotes, and produces large-scale Live Concerts and Music Festival events, in-house. Our passion for music runs deep, and from concept-to-show, we strategically develop and execute to produce incredible mega-events that bring together thousands.",
  },
  {
    title: "World-Class Athletic Experiences.",
    body: "Our original foray into event production began in 2012. It all started with the Mud Challenger Adventure Series, a secret, navy-seal designed challenge course. That first event brought two thousand people together to get muddy and complete our challenge out in the wilderness. Fast forward a few years, and our portfolio of unique athletic brands is second to none, and includes a diverse line-up of healthy, fun, and challenging experiences.",
  },
  {
    title: "We provide turn-key production services for every type of event.",
    body: "Our production reputation is stellar. We are well-known for our rapid brand development, effective marketing strategies and production logistics, all done in-house. From conceptualization and creative, to marketing and physical site logistics, and a wide gamut of equipment, our Services Team is available to collaborate on projects at any stage and of any scale, using the same techniques, equipment, and partners we use to produce our own smash-hit events and festivals.",
  },
  {
    title: "Innovating guest experience and the technology that powers it.",
    body: "Our craft is where the arts converge with technology. The Fathom Labs team is at the core of our research, technology development, and innovation pipeline that shapes how we operate. Our proprietary technology systems allow us to be agile, flexible, move swiftly and launch rapidly. Fathom has the ability to deploy experiences and brands from the ground-up; faster and better than any other production company.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function EditorialContent() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row px-6 md:px-16 lg:px-24 py-20 lg:py-0">
      
      {/* Texture Definition for CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .grunge-text {
          background-image: 
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E"),
            linear-gradient(to bottom, #111111, #222222);
          background-blend-mode: multiply;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
      `}} />

      {/* LEFT COLUMN (55%) */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center lg:h-screen mb-16 lg:mb-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          {leftHeadingLines.map((line, idx) => (
            <motion.div key={idx} variants={itemVariants} className="overflow-hidden">
              <h1 
                className="font-montserrat font-black text-[12vw] sm:text-[10vw] lg:text-[7.5vw] xl:text-[6.5vw] uppercase tracking-[-0.04em] leading-[0.85] m-0 p-0 grunge-text"
              >
                {line}
              </h1>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* RIGHT COLUMN (45%) */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center lg:h-screen">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl flex flex-col gap-12 lg:gap-14 xl:gap-16 pt-8 lg:pt-0"
        >
          {rightContent.map((block, idx) => (
            <motion.div key={idx} variants={itemVariants} className="flex flex-col gap-3 group">
              <h2 className="font-montserrat font-bold text-xl md:text-2xl text-black leading-tight tracking-tight group-hover:translate-x-2 transition-transform duration-500 ease-out">
                {block.title}
              </h2>
              <p className="font-inter text-[#333333] text-sm md:text-base leading-relaxed max-w-[90%]">
                {block.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
    </div>
  );
}
