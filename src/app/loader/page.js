// src/components/Loader.jsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Define the three shapes and their clip styles
const SHAPES = [
  { key: 'circle',   style: { borderRadius: '50%' } },
  { key: 'square',   style: {} },
  { key: 'triangle', style: { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' } },
];

// Utility to pick a nice random HSL color
function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 60%)`;
}

export default function Loader() {
  // Track the “base” color for each shape
  const [baseColors, setBaseColors] = useState(() =>
    SHAPES.map(() => getRandomColor())
  );

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex space-x-8">
        {SHAPES.map((shape, i) => (
          <motion.div
            key={shape.key}
            className="w-16 h-16"
            style={shape.style}
            animate={{
              y: [0, -60, 0],                         // bounce up then down
              rotate: [0, 360],                       // spin full circle
              backgroundColor: [
                baseColors[i],                        // start at the current base color
                getRandomColor(),                     // mid-bounce pick a new random color
                baseColors[i],                        // land back at the base
              ],
            }}
            transition={{
              y: {
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              rotate: {
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              },
              backgroundColor: {
                duration: 1,
                times: [0, 0.5, 1],
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            onUpdate={(latest) => {
              // when y hits (or rounds to) 0, pick a new base color for next cycle
              if (Math.round(latest.y) === 0) {
                setBaseColors((prev) => {
                  const copy = [...prev];
                  copy[i] = getRandomColor();
                  return copy;
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
