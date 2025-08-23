// app/me/HeroSection.jsx
'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function HeroSection() {
  // Optional: A subtle mouse-move parallax for the background
  useEffect(() => {
    const handleMouseMove = (e) => {
        if (window.innerWidth < 1024) return;
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 40;
        const y = (clientY / window.innerHeight - 0.5) * 40;
        gsap.to('.hero-bg-svg', { x, y, duration: 1, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen bg-[#f0f0f0] flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 opacity-10 hero-bg-svg">
        <Image src="/images/make-a-sag-of-white-colored-waves-with-transparent-bg-make-it-ja.svg" alt="background wave" className="w-full h-full object-cover" layout="fill" />
      </div>
      <div className="relative">
        <h1 className="text-6xl md:text-8xl font-mono uppercase">YOU WANT TO KNOW MORE ABOUT ME?</h1>
        <p className="blinking-text text-xl md:text-2xl font-mono mt-8">[ SCROLL_TO_EXPLORE ]</p>
      </div>
    </section>
  );
}