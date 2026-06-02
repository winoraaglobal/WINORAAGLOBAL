"use client";

import React from "react";

export default function WinorraBannerSection() {
  return (
    <section className="relative z-20 w-full h-[390px] overflow-hidden bg-black flex items-center">
      
      {/* CENTER PANEL (Base Background) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center center"
        }}
      />

      {/* LEFT PANEL */}
      <div 
        className="absolute left-0 top-0 h-full w-[45%] lg:w-[32%] z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          clipPath: "polygon(0 0, 100% 0, calc(100% - 100px) 100%, 0 100%)"
        }}
      >
        {/* Extra darkness for left panel */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* RIGHT PANEL */}
      <div 
        className="absolute right-0 top-0 h-full w-[45%] lg:w-[28%] z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          clipPath: "polygon(100px 0, 100% 0, 100% 100%, 0 100%)"
        }}
      >
        {/* Extra darkness for right panel */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* GLOBAL OVERLAY (Very light now) */}
      <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

      {/* OVERSIZED LOGO TEXT */}
      <div className="absolute left-[30px] lg:left-[85px] top-[115px] z-20 pointer-events-none w-full max-w-[90vw]">
        <h2 
          className="font-brush text-white leading-[1] tracking-tight uppercase"
          style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 80px)',
            textShadow: '0px 4px 20px rgba(0,0,0,0.8)'
          }}
        >
          WINORRA<br/>GLOBAL
        </h2>
      </div>

    </section>
  );
}
