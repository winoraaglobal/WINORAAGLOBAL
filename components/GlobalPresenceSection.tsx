"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3-geo';
import { MapPin } from 'lucide-react';

const LOCATIONS = [
  { name: "EUROPE", coordinates: [15.2551, 54.5260] },
  { name: "UAE", coordinates: [53.8478, 23.4241] },
  { name: "USA", coordinates: [-98.5795, 39.8283] },
  { name: "RUSSIA", coordinates: [105.3188, 61.5240] },
  { name: "CHINA", coordinates: [104.1954, 35.8617] },
  { name: "INDIA", coordinates: [78.9629, 20.5937], textOffset: { x: 0, y: 16 } },
];

const GlobalPresenceSection = () => {
  const [geographies, setGeographies] = useState<any[]>([]);

  useEffect(() => {
    fetch('/world-small.geojson')
      .then(res => res.json())
      .then(data => {
        setGeographies(data.features);
      })
      .catch(err => console.error("Error loading geojson", err));
  }, []);

  // Use a standard projection to fit the SVG box
  const projection = useMemo(() => {
    return d3.geoMercator()
      .scale(120)
      .translate([400, 380]); // center map in 800x600 canvas
  }, []);

  // Compute a single path string for the entire world map to vastly improve performance
  const worldMapPath = useMemo(() => {
    if (!geographies || geographies.length === 0) return "";
    
    // Filter out Antarctica
    const filteredFeatures = geographies.filter(geo => geo.properties?.name !== "Antarctica" && geo.id !== "ATA");
    
    const pathGenerator = d3.geoPath().projection(projection);
    return pathGenerator({ type: "FeatureCollection", features: filteredFeatures } as any) || "";
  }, [geographies, projection]);

  return (
    <section className="py-24 bg-[#030712] relative overflow-hidden min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-full relative z-10 max-w-[1400px] mx-auto px-4 flex flex-col items-center">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center w-full mb-12 md:mb-16 z-20"
        >
          <h2 className="font-heading font-black text-white text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter max-w-6xl mx-auto drop-shadow-sm">
            Crafting Experiences Beyond Borders
          </h2>
        </motion.div>

        <div className="w-full relative aspect-[4/3] md:aspect-[16/9] mx-auto">
          <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-2xl overflow-visible">
            <g className="landmass">
              {worldMapPath && (
                <path
                  d={worldMapPath}
                  fill="#0e336b"
                  stroke="#1e40af"
                  strokeWidth={0.5}
                />
              )}
            </g>
            <g className="markers">
              {LOCATIONS.map((loc, i) => {
                const coords = projection(loc.coordinates as [number, number]);
                if (!coords) return null;
                const [x, y] = coords;
                const textOffsetX = loc.textOffset?.x ?? 0;
                const textOffsetY = loc.textOffset?.y ?? -20;
                
                return (
                  <g key={`marker-${i}`} transform={`translate(${x}, ${y})`}>
                    <motion.g 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + (i * 0.1), type: "spring" }}
                      className="group cursor-pointer"
                    >
                      {/* Pulse effect at the base */}
                      <circle cx={0} cy={0} r={4} fill="#60a5fa" className="animate-ping opacity-75" />
                      <circle cx={0} cy={0} r={1.5} fill="#ffffff" />

                      {/* Map Pin */}
                      <g transform="translate(0, 0)">
                        <path 
                          d="M0,0 C-5,-5 -7,-8 -7,-12 A7,7 0 1,1 7,-12 C7,-8 5,-5 0,0 Z" 
                          fill="#0e336b" 
                          stroke="#ffffff" 
                          strokeWidth="2" 
                          className="drop-shadow-lg"
                        />
                        <circle cx="0" cy="-12" r="2.5" fill="#ffffff" />
                      </g>
                      
                      {/* Label */}
                      <text 
                        x={loc.textOffset?.x ?? 0} 
                        y={loc.textOffset?.y ?? -26} 
                        textAnchor="middle" 
                        fill="#ffffff" 
                        fontSize="13"
                        fontWeight="700"
                        className="drop-shadow-md font-sans tracking-wide"
                        style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.8)" }}
                      >
                        {loc.name}
                      </text>
                    </motion.g>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default GlobalPresenceSection;
