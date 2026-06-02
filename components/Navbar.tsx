"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "#services" },
  { label: "EVENTS", href: "#events" },
  { label: "GALLERY", href: "#gallery" },
  { label: "CAREERS", href: "/careers" },
  { label: "CONTACT", href: "#contact" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-6 glass-nav">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="group">
            <h2 className="text-lg md:text-xl font-black tracking-[0.2em] uppercase leading-none">
              WINORAA GLOBAL
            </h2>
            <p className="text-[7px] tracking-[0.4em] font-medium opacity-50 uppercase mt-1">
              Events and Experiences
            </p>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative group flex items-center gap-1">
              <Link href={item.href} className="nav-link">
                {item.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            className="text-white opacity-70 p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <div className="w-6 h-0.5 bg-white mb-1.5" />
            <div className="w-6 h-0.5 bg-white" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col p-6 md:hidden">
          <div className="flex justify-end mb-12">
            <button 
              className="text-white p-2"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X size={32} />
            </button>
          </div>
          
          <div className="flex flex-col gap-8 items-center justify-center flex-1">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.label} 
                href={item.href} 
                className="text-white text-2xl font-black tracking-[0.2em] uppercase hover:text-[#91bf3e] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
