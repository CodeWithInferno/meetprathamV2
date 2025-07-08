'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HoverReveal({ title, imgSrc, alignLeft = true }) {
  const [hover, setHover] = useState(false);
  const [pos, setPos]     = useState({ x: 0, y: 0 });
  const textRef = useRef();

  // Tracks mouse only when over text, not the full block
  function handleMouseMove(e) {
    const rect = textRef.current.getBoundingClientRect();
    setPos({
      x: rect.left + rect.width / 2 - 150,  // centers image over text
      y: rect.top + rect.height / 2 - 120   // centers image over text
    });
  }

  return (
    <div
      className="relative w-full flex items-center justify-center h-[20vh] overflow-visible"
    >
      {/* headline */}
      <span
        ref={textRef}
        onMouseEnter={() => setHover(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHover(false)}
        className={`
          cursor-pointer relative px-8 py-4 rounded-lg transition
          text-[4vw] font-black uppercase leading-none z-20
          ${alignLeft ? 'text-left ml-12' : 'text-right mr-12'}
        `}
        style={{
          opacity: hover ? 0.2 : 1,
          background: hover ? 'rgba(255,255,255,0.05)' : 'transparent',
        }}
      >
        {title}
      </span>

      {/* reveal-on-hover image */}
      <motion.img
        src={imgSrc}
        alt={title}
        className="fixed w-[24vw] h-[24vh] rounded-lg object-cover pointer-events-none z-30 shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: hover ? 1 : 0,
          left: hover ? pos.x : '-100vw',
          top:  hover ? pos.y : '-100vh',
        }}
        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
        style={{
          pointerEvents: 'none',
          mixBlendMode: 'lighten'
        }}
      />
    </div>
  );
}
