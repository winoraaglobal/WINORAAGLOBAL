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
    title: "Innovative Stall Designing & Premium Fabrication.",
    body: "Your brand's physical presence speaks volumes. At Winoraa Global, we conceptualize and build custom exhibition stalls that captivate and engage. From the initial 3D design to the final on-site fabrication, we use premium materials and cutting-edge techniques to ensure your booth stands out and effectively communicates your brand's unique story.",
  },
  {
    title: "Spectacular Stage Designing.",
    body: "The stage is where the magic happens. We design immersive and technically advanced stage setups that elevate any event. Whether it's an intimate corporate gathering or a massive award ceremony, our stage designs integrate state-of-the-art lighting, AV production, and dynamic structures to create an unforgettable focal point that leaves audiences in awe.",
  },
  {
    title: "Flawlessly Executed Corporate Shows.",
    body: "We understand that corporate events are a reflection of your company's excellence. Winoraa Global provides end-to-end production for corporate shows, dealer meets, and galas. We handle the logistics, aesthetics, and technical execution with military precision, ensuring a seamless experience that impresses your stakeholders and achieves your business objectives.",
  },
  {
    title: "Unforgettable Product Launches and Experiential Marketing.",
    body: "Introduce your latest innovations to the world with maximum impact. We orchestrate spectacular product launches that generate buzz and drive engagement. By combining creative staging, immersive sound, and breathtaking visual effects, we help you create a powerful narrative that connects with your audience and ensures your new product makes a monumental entrance.",
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
