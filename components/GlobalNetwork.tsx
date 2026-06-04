"use client";

import React, { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import * as d3 from "d3-geo";

const MARKERS = [
  { name: "USA", coords: [-98.5795, 39.8283] }, // Longitude, Latitude
  { name: "EUROPE", coords: [15.2551, 54.5260] },
  { name: "UAE", coords: [53.8478, 23.4241] },
  { name: "INDIA", coords: [78.9629, 20.5937] },
  { name: "CHINA", coords: [104.1954, 35.8617] },
  { name: "RUSSIA", coords: [105.3188, 61.5240] }
];

// Helper to convert lat/lng to 3D sphere coordinates
const get3DCoordinates = (lng: number, lat: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = lng * (Math.PI / 180); // Exact match for SphereGeometry UVs

  const x = radius * Math.sin(phi) * Math.cos(theta);
  const z = -radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

// --- Sub-Component: Globe Scene ---
const Globe = () => {
  const globeRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const [globeTexture, setGlobeTexture] = useState<THREE.CanvasTexture | null>(null);
  const [countryLabels, setCountryLabels] = useState<{name: string, coords: [number, number]}[]>([]);

  // Gentle rotation (increased speed)
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0015;
    }
  });

  useEffect(() => {
    fetch("/countries.geojson")
      .then((res) => res.json())
      .then((data) => {
        const canvas = document.createElement("canvas");
        canvas.width = 4096; // High res for crisp borders
        canvas.height = 2048;
        const context = canvas.getContext("2d");
        if (!context) return;

        const projection = d3.geoEquirectangular().translate([2048, 1024]).scale(651.8986);
        const path = d3.geoPath().projection(projection).context(context);

        context.clearRect(0, 0, 4096, 2048);

        const labels: {name: string, coords: [number, number]}[] = [];
        
        const EUROPEAN_COUNTRIES = [
          "ALBANIA", "ANDORRA", "AUSTRIA", "BELARUS", "BELGIUM", "BOSNIA AND HERZEGOVINA", 
          "BULGARIA", "CROATIA", "CYPRUS", "CZECHIA", "DENMARK", "ESTONIA", "FINLAND", "FRANCE", 
          "GERMANY", "GREECE", "HUNGARY", "ICELAND", "IRELAND", "ITALY", "KOSOVO", "LATVIA", 
          "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MALTA", "MOLDOVA", "MONACO", 
          "MONTENEGRO", "NETHERLANDS", "NORTH MACEDONIA", "NORWAY", "POLAND", "PORTUGAL", 
          "ROMANIA", "SAN MARINO", "SERBIA", "SLOVAKIA", "SLOVENIA", "SPAIN", "SWEDEN", 
          "SWITZERLAND", "UKRAINE", "UNITED KINGDOM", "VATICAN"
        ];
        
        const HIGHLIGHTED_COUNTRIES = [
          "UNITED STATES OF AMERICA", 
          "UNITED ARAB EMIRATES", 
          "INDIA", 
          "CHINA", 
          "RUSSIA"
        ];

        const isHighlighted = (name: string) => {
          if (!name) return false;
          const upper = name.toUpperCase();
          return HIGHLIGHTED_COUNTRIES.includes(upper) || EUROPEAN_COUNTRIES.includes(upper);
        };

        data.features.forEach((feature: any) => {
          const name = feature.properties.name || feature.properties.ADMIN;
          const highlighted = isHighlighted(name);

          context.beginPath();
          path(feature);
          
          // Only highlight the specified countries in blue, keep the rest pale grey
          context.fillStyle = highlighted ? "rgba(40, 120, 255, 0.8)" : "rgba(220, 220, 225, 0.4)";
          context.fill();

          // Borders
          context.strokeStyle = highlighted ? "rgba(20, 100, 240, 1)" : "rgba(180, 180, 190, 0.6)";
          context.lineWidth = highlighted ? 1.5 : 1;
          context.stroke();

          // Collect country names for HTML labels
          if (name && name !== "Antarctica") {
            const bounds = path.bounds(feature);
            if (bounds && bounds[0] && bounds[1] && !isNaN(bounds[0][0])) {
              const w = bounds[1][0] - bounds[0][0];
              const h = bounds[1][1] - bounds[0][1];
              // Only label medium/large countries to prevent extreme clutter
              if (w * h > 1500) {
                const centroid = d3.geoCentroid(feature);
                labels.push({ name: name.toUpperCase(), coords: [centroid[0], centroid[1]] });
              }
            }
          }
        });
        
        setCountryLabels(labels);

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 16;
        setGlobeTexture(texture);
      })
      .catch((err) => console.error("Error loading geojson", err));
  }, []);

  return (
    <group ref={globeRef} rotation={[0, -Math.PI / 2, 0]}>
      {/* Invisible Globe Core for occlusion */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[5, 64, 64]} />
        <meshBasicMaterial transparent={true} opacity={0} depthWrite={false} />
      </mesh>

      {/* Subtle Map Overlay */}
      {globeTexture && (
        <mesh scale={[1.002, 1.002, 1.002]}>
          <sphereGeometry args={[5, 64, 64]} />
          <meshStandardMaterial 
            map={globeTexture}
            transparent={true}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      )}

      {/* HTML Markers (Main) */}
      {MARKERS.map((marker, index) => {
        const pos = get3DCoordinates(marker.coords[0], marker.coords[1], 5.01);
        return (
          <mesh key={index} position={pos}>
            {/* The HTML Marker Pill */}
            <Html center occlude={[sphereRef]} zIndexRange={[100, 0]}>
              <div 
                className="flex items-center gap-1.5 group cursor-default transition-opacity duration-300" 
                style={{ transform: 'translate(20px, -15px)' }}
              >
                {/* Gold Dot */}
                <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#b69238] z-10 shadow-[0_0_8px_rgba(182,146,56,0.8)]"></div>
                  <div className="absolute w-4 h-4 rounded-full bg-[#b69238]/30 animate-pulse"></div>
                </div>
                {/* Connector Line (Tiny) */}
                <div className="w-3 h-[1px] bg-black/20"></div>
                {/* Black Pill */}
                <div className="bg-black text-white uppercase font-[800] text-[8px] md:text-[10px] px-[9px] py-[6px] rounded-full tracking-wider whitespace-nowrap shadow-lg">
                  {marker.name}
                </div>
              </div>
            </Html>
          </mesh>
        );
      })}

      {/* HTML Country Labels (Subtle) */}
      {countryLabels.map((label, index) => {
        // Skip if this country is already in MARKERS
        if (MARKERS.some(m => m.name === label.name || (m.name === "USA" && label.name === "UNITED STATES OF AMERICA"))) return null;
        
        const pos = get3DCoordinates(label.coords[0], label.coords[1], 5.01);
        return (
          <mesh key={`lbl-${index}`} position={pos}>
            <Html center occlude={[sphereRef]} zIndexRange={[10, 0]}>
              <div className="text-[#a0a0aa] font-[700] text-[5px] md:text-[7px] uppercase tracking-widest pointer-events-none drop-shadow-sm transition-opacity duration-300 text-center leading-tight">
                {label.name}
              </div>
            </Html>
          </mesh>
        );
      })}
    </group>
  );
};

// --- Main Exported Component ---
const GlobalNetwork = () => {
  return (
    <section className="relative w-full min-h-[860px] md:h-[920px] bg-[#f0f0f0] overflow-hidden flex flex-col items-center">
      
      {/* Background Radial Light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04),transparent_55%)] pointer-events-none" />

      {/* Heading Area (y=70px approx via padding/margin) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full z-20 text-center pt-[70px] px-4 flex flex-col items-center"
      >
        <h2 className="text-[44px] md:text-[72px] lg:text-[118px] font-black text-black leading-[0.9] tracking-tighter uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
          GLOBAL NETWORK
        </h2>
        <p className="text-[#b69238] tracking-[5px] md:tracking-[10px] text-[10px] md:text-[12px] uppercase font-extrabold mt-[12px]">
          Crafting Experiences Beyond Borders
        </p>
      </motion.div>

      {/* 3D Globe Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="relative w-full max-w-[1200px] h-[330px] md:h-[520px] lg:h-[680px] mt-10 md:mt-[60px] z-10 flex-1 flex items-center justify-center mb-[60px]"
      >
        <Canvas 
          camera={{ position: [0, 0, 13], fov: 45 }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          dpr={[1, 2]}
        >
          <ambientLight intensity={1.2} />
          {/* Subtle rim light / highlight */}
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#e0e0e0" />
          
          <Suspense fallback={null}>
            <Globe />
          </Suspense>
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 1.5} 
            rotateSpeed={0.6}
          />
        </Canvas>

        {/* Soft shadow below the globe */}
        <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[60%] h-[20px] md:h-[40px] bg-black/10 blur-xl rounded-full pointer-events-none" />
      </motion.div>

    </section>
  );
};

export default GlobalNetwork;
