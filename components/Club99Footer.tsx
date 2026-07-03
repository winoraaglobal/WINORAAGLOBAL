import React from 'react';
import Link from 'next/link';

export const Club99Footer = () => {
  return (
    <footer className="relative bg-[#060313] text-white py-16 px-6 md:px-12 lg:px-24 border-t border-[#1a152e] antialiased overflow-visible">
      {/* Subtle radial gradient background as seen in the image to give a slight glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left_center,rgba(20,10,40,0.4),transparent_50%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col">
        
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between mb-24 gap-16 lg:gap-8">
          
          {/* Left Side */}
          <div className="max-w-[420px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Closely matched geometric logo from image */}
                  <path d="M15.5 0L0 15.5L15.5 31L23 23.5L7.5 8L15.5 0Z" fill="white"/>
                  <path d="M31 15.5L23.5 8L15.5 16L23 23.5L31 15.5Z" fill="white"/>
                </svg>
              </div>
              <span className="text-[32px] font-bold tracking-tight text-white group-hover:opacity-90 transition-opacity" style={{ letterSpacing: '-0.03em' }}>
                99club
              </span>
            </Link>
            
            <p className="text-white text-[15px] leading-[1.6] mb-8 font-medium">
              Dance beneath neon lights, where every night is<br className="hidden md:block"/>
              unforgettable, and every beat creates memories.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="w-[42px] h-[42px] rounded-full bg-[#8b5cf6] hover:bg-[#7c3aed] flex items-center justify-center transition-colors shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="w-[42px] h-[42px] rounded-full bg-[#8b5cf6] hover:bg-[#7c3aed] flex items-center justify-center transition-colors shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              {/* X / Twitter */}
              <a href="#" aria-label="X (Twitter)" className="w-[42px] h-[42px] rounded-full bg-[#8b5cf6] hover:bg-[#7c3aed] flex items-center justify-center transition-colors shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
          
          {/* Right Side - Links */}
          <div className="grid grid-cols-2 gap-x-24 gap-y-12 lg:mr-32 pt-2">
            {/* Column 1 */}
            <div className="flex flex-col gap-[22px]">
              <Link href="#" className="text-[#a0abc0] hover:text-white transition-colors text-[15px] font-semibold tracking-wide">About</Link>
              <Link href="#" className="text-[#a0abc0] hover:text-white transition-colors text-[15px] font-semibold tracking-wide">Events</Link>
              <Link href="#" className="text-[#a0abc0] hover:text-white transition-colors text-[15px] font-semibold tracking-wide">Testimonial</Link>
              <Link href="#" className="text-[#a0abc0] hover:text-white transition-colors text-[15px] font-semibold tracking-wide">Team</Link>
            </div>
            
            {/* Column 2 */}
            <div className="flex flex-col gap-[22px]">
              <Link href="#" className="text-[#a0abc0] hover:text-white transition-colors text-[15px] font-semibold tracking-wide">License</Link>
              <Link href="#" className="text-[#a0abc0] hover:text-white transition-colors text-[15px] font-semibold tracking-wide">Style Guide</Link>
              <Link href="#" className="text-[#a0abc0] hover:text-white transition-colors text-[15px] font-semibold tracking-wide">Change Log</Link>
              <Link href="#" className="text-[#a0abc0] hover:text-white transition-colors text-[15px] font-semibold tracking-wide">404</Link>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t-[1px] border-white/[0.06] flex flex-col items-center lg:items-start relative">
          <p className="text-[#7d879c] text-[13px] font-medium tracking-wide">
            2025 © 99club. Powered by Webflow.
          </p>
          
          {/* Floating Webflow Banner (Absolute Positioned exactly as in the image) */}
          <div className="absolute right-0 bottom-4 lg:-bottom-2 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3 px-4 flex items-center gap-3 z-50 w-[290px] border border-gray-100/50 transform hover:-translate-y-1 transition-transform cursor-pointer">
            {/* Notification dot */}
            <div className="absolute -top-1.5 -right-1.5 w-[14px] h-[14px] bg-[#6d28d9] rounded-full border-[3px] border-[#060313] shadow-[0_0_12px_rgba(109,40,217,0.7)]"></div>
            
            {/* Template Icon Placeholder (Matched visually) */}
            <div className="w-[42px] h-[42px] bg-[#f3e8ff] rounded-lg flex items-center justify-center shrink-0">
               <div className="relative w-6 h-6 flex items-center justify-center">
                 <div className="absolute w-[18px] h-[18px] bg-[#a855f7] rounded-[4px] -rotate-12 opacity-40"></div>
                 <div className="absolute w-[18px] h-[18px] bg-[#8b5cf6] rounded-[4px] rotate-6 border-[1.5px] border-white"></div>
                 <div className="absolute w-[18px] h-[18px] bg-[#6d28d9] rounded-[4px] -rotate-6 shadow-sm border-[1.5px] border-white"></div>
               </div>
            </div>
            
            <div className="flex flex-col gap-0.5">
              <span className="text-[#64748b] text-[11px] font-semibold tracking-wide">Explore our collection of</span>
              <span className="text-[#4338ca] text-[13px] font-bold hover:underline flex items-center gap-1 group">
                Premium Webflow Templates
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
              </span>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Club99Footer;
