"use client";

import React from "react";

const Overlays = () => {
  return (
    <>
      {/* Film Grain */}
      <div className="noise-overlay" />
      
      {/* Vignette */}
      <div className="vignette" />
      
      {/* Volumetric Light Bloom */}
      <div className="fixed inset-0 pointer-events-none z-30">
        <div className="absolute top-[-10%] left-[20%] w-[60%] h-[60%] bg-white/5 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-white/5 blur-[100px] rounded-full" />
      </div>

      {/* Atmospheric Haze */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-white/5 to-black/20 pointer-events-none z-10" />
    </>
  );
};

export default Overlays;
