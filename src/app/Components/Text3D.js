'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Text3D({ text, className }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const rect = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - rect.left - rect.width / 2) / rect.width;
      const y = (clientY - rect.top - rect.height / 2) / rect.height;
      
      containerRef.current.style.transform = `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${-y * 10}deg)
      `;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={`relative inline-block transition-transform duration-100 ease-out ${className}`}>
      <h1 className="relative">
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: i * 0.05,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{
              y: -5,
              color: '#FACC15',
              transition: { duration: 0.2 }
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </h1>
      {/* 3D shadow layers */}
      {[...Array(5)].map((_, i) => (
        <h1
          key={i}
          className="absolute top-0 left-0 opacity-20"
          style={{
            transform: `translateZ(${-i * 2}px) translateX(${i * 2}px) translateY(${i * 2}px)`,
            color: '#FACC15',
            filter: `blur(${i * 0.5}px)`
          }}
          aria-hidden="true"
        >
          {text}
        </h1>
      ))}
    </div>
  );
}