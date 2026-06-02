"use client";

import React from "react";

export default function AboutHeroSection() {
  return (
    <section className="relative w-full h-[560px] lg:h-[725px] flex items-center justify-center overflow-hidden">
      
      {/* Background Image Layer (Partially Black & White) */}
      <div 
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          filter: "grayscale(75%)"
        }}
      />
      {/* Colorful Gradient / Dark Overlay for Contrast */}
      <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))' }} />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 -mt-10 lg:-mt-12" style={{ textShadow: '0px 4px 20px rgba(0,0,0,0.8)' }}>
        
        {/* We Are Logo */}
        <h2 className="font-brush text-white text-5xl md:text-[48px] lg:text-[56px] leading-none mb-1 transform -rotate-2">
          WE ARE
        </h2>

        {/* Subtitle */}
        <h3 className="text-white font-bold uppercase text-[9px] md:text-[11px] tracking-[4px] md:tracking-[8px] mt-2">
          EXPERIENCE CREATORS  //  FESTIVAL PRODUCERS
        </h3>

        {/* Paragraph */}
        <p 
          className="text-white font-sans font-normal mt-[34px] mx-auto text-[15px] lg:text-[16px]"
          style={{ 
            maxWidth: '520px', 
            lineHeight: '1.5'
          }}
        >
          Fathom Producers is a full-spectrum production powerhouse that
          creates, promotes, and produces world-class events, festivals, and live
          concerts. Known for crafting powerful brands, our creative energy
          drives the passion we have for producing amazing experiences that we
          can share with the world.
        </p>

      </div>
    </section>
  );
}
