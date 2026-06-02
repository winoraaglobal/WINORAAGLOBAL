"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, RootState } from "@react-three/fiber";
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Float, 
  Stars, 
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// --- Constants & Types ---
const LOCATIONS = [
  { name: "USA", lat: 37.0902, lng: -95.7129, label: "North America" },
  { name: "EUROPE", lat: 54.5260, lng: 15.2551, label: "European Hub" },
  { name: "UAE", lat: 23.4241, lng: 53.8478, label: "Middle East" },
  { name: "RUSSIA", lat: 61.5240, lng: 105.3188, label: "Eurasia" },
  { name: "CHINA", lat: 35.8617, lng: 104.1954, label: "East Asia" },
  { name: "INDIA", lat: 20.5937, lng: 78.9629, label: "South Asia" },
];

const CONNECTIONS = [
  { from: "USA", to: "EUROPE" },
  { from: "EUROPE", to: "UAE" },
  { from: "UAE", to: "INDIA" },
  { from: "INDIA", to: "CHINA" },
  { from: "CHINA", to: "RUSSIA" },
];

// --- Helper: Lat/Lng to Vector3 ---
const latLngToVector3 = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

// --- Sub-Component: Connection Arcs ---
const ConnectionArc = ({ fromPos, toPos }: { fromPos: THREE.Vector3, toPos: THREE.Vector3 }) => {
  const lineRef = useRef<THREE.Line>(null);
  
  const curve = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(fromPos, toPos).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(5.5); // Arcing height
    return new THREE.QuadraticBezierCurve3(fromPos, mid, toPos);
  }, [fromPos, toPos]);

  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  useFrame(() => {
    if (lineRef.current) {
      // Subtle pulse or animation can be added here
    }
  });

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: "#FFD700", opacity: 0.3, transparent: true }))} ref={lineRef} />
  );
};

// --- Sub-Component: Globe Scene ---
const Globe = () => {
  const globeRef = useRef<THREE.Mesh>(null);

  useFrame((_state: RootState, delta: number) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1; // Slow infinite rotation
    }
  });

  return (
    <group>
      {/* The Core Sphere */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial 
          color="#050505" 
          roughness={0.2} 
          metalness={0.8} 
          emissive="#111"
        />
        
        {/* Glow Atmosphere */}
        <mesh scale={[1.02, 1.02, 1.02]}>
          <sphereGeometry args={[5, 64, 64]} />
          <meshPhongMaterial 
            color="#FFD700" 
            opacity={0.05} 
            transparent 
            side={THREE.BackSide} 
          />
        </mesh>

        {/* Location Markers */}
        {LOCATIONS.map((loc, idx) => {
          const pos = latLngToVector3(loc.lat, loc.lng, 5.05);
          return (
            <group key={idx} position={pos}>
              {/* Point */}
              <mesh>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color="#FFD700" />
              </mesh>
              {/* Pulse Ring */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.1, 0.2, 32]} />
                <meshBasicMaterial color="#FFD700" transparent opacity={0.5} />
              </mesh>
              {/* Label */}
              <Html distanceFactor={15}>
                <div className="whitespace-nowrap pointer-events-none select-none">
                  <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-yellow-500/30 text-[10px] text-white uppercase tracking-widest font-bold">
                    {loc.name}
                  </div>
                </div>
              </Html>
            </group>
          );
        })}

        {/* Connection Arcs */}
        {CONNECTIONS.map((conn, idx) => {
          const from = LOCATIONS.find(l => l.name === conn.from);
          const to = LOCATIONS.find(l => l.name === conn.to);
          if (!from || !to) return null;
          const fromPos = latLngToVector3(from.lat, from.lng, 5);
          const toPos = latLngToVector3(to.lat, to.lng, 5);
          return <ConnectionArc key={idx} fromPos={fromPos} toPos={toPos} />;
        })}
      </mesh>

      {/* Grid Floor Atmosphere */}
      <gridHelper args={[100, 50, 0x333333, 0x111111]} position={[0, -10, 0]} />
    </group>
  );
};

// --- Main Exported Component ---
const GlobalNetwork = () => {
  return (
    <section className="relative w-full h-[100vh] bg-black overflow-hidden flex flex-col justify-center items-center">
      {/* Cinematic Title Overlay */}
      <div className="absolute top-20 left-0 w-full z-20 text-center pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[8vw] md:text-[5vw] font-black text-white leading-none tracking-tighter uppercase opacity-20"
        >
          Global Network
        </motion.h2>
        <p className="text-yellow-500/50 tracking-[1em] text-xs uppercase font-bold mt-4">
          World Class Presence
        </p>
      </div>

      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Globe />
          </Float>

          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <OrbitControls 
            enableZoom={false} 
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 1.5} 
            rotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-12 right-12 z-20 text-right hidden md:block">
        <p className="text-white/40 text-[10px] tracking-widest uppercase mb-2">Connect with us</p>
        <h4 className="text-white text-2xl font-light">Winoraa <span className="font-bold">Global</span></h4>
      </div>
    </section>
  );
};

export default GlobalNetwork;
