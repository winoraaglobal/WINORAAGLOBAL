"use client";

import React from "react";
import Link from "next/link";

export default function CareersSection() {
  return (
    <section className="relative w-full min-h-[600px] lg:min-h-[805px] py-12 lg:py-24 overflow-hidden flex flex-col justify-center">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop')" }}
      />
      
      {/* Heavy Dark Overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.84)' }} />

      {/* Centered Main Heading */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center mb-16 lg:mb-20">
        <h2 className="text-white font-heading font-black text-4xl lg:text-5xl uppercase tracking-tighter">
          JOIN OUR TEAM
        </h2>
      </div>

      {/* Content Block */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-12 xl:pl-[190px]">
        <div className="max-w-[900px]">

          {/* Sub Heading */}
          <h3 className="text-white font-sans font-bold uppercase text-[22px] md:text-[26px] xl:text-[30px] leading-tight tracking-tight mb-10">
            CURRENTLY ACCEPTING RESUMES FOR THE FOLLOWING POSITIONS:
          </h3>

          {/* Job List */}
          <div className="flex flex-col space-y-8 mb-10">
            {[
              {
                title: "EVENT MANAGER",
                experience: "3+ Years of relevant experience in corporate events and project management"
              },
              {
                title: "CLIENT SERVICING",
                experience: "2+ Years of relevant experience in corporate events and client relations"
              },
              {
                title: "OPERATION & PRODUCTION",
                experience: "2+ Years of relevant experience in corporate events and production management"
              },
              {
                title: "GRAPHIC DESIGNER",
                experience: "1+ Years of relevant experience in corporate events, marketing agency, media and advertising"
              }
            ].map((job, idx) => (
              <div key={idx} className="group flex flex-col">
                <div className="text-white font-sans font-bold text-[18px] md:text-[20px] xl:text-[22px] tracking-wide mb-1">
                  {job.title}
                </div>
                <div className="text-gray-300 font-sans text-[15px] md:text-[16px] mb-2 max-w-[600px]">
                  {job.experience}
                </div>
                <Link href="#" className="inline-flex items-center text-[#aaaaaa] hover:text-white font-sans font-bold text-[13px] uppercase tracking-wider transition-colors mt-1 w-max">
                  APPLY NOW <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Description Line */}
          <p className="text-gray-300 font-sans text-[16px] md:text-[18px] xl:text-[20px] leading-[1.6] mb-[35px] max-w-[800px]">
            Please inquire by email regarding all positions listed above, or with any questions you may have.
          </p>

          {/* Button */}
          <Link 
            href="#"
            className="inline-block"
          >
            <div className="bg-[#111111] text-[#eeeeee] hover:text-white hover:bg-black font-sans font-semibold text-[15px] md:text-[16px] px-[24px] py-[14px] rounded-[8px] transition-all duration-300 shadow-lg border border-white/5">
              Email us here.
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
