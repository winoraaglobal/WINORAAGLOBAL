"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundVideoProps {
  src?: string;
  className?: string;
}

const BackgroundVideo = ({ 
  src = "https://assets.mixkit.co/videos/preview/mixkit-concert-crowd-silhouette-at-night-4340-large.mp4",
  className 
}: BackgroundVideoProps) => {
  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden", className)}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover grayscale brightness-[0.7] contrast-[1.1] scale-[1.1]"
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      <div className="bloom-layer absolute inset-0 opacity-40 scale-150" />
    </div>
  );
};

export default BackgroundVideo;
