'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ─── helper: loop only first 15 s of the background clip ─── */
function useLoopFirst15(videoRef) {
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const loop = () => {
      if (vid.currentTime >= 15) vid.currentTime = 0.05;
    };
    vid.addEventListener('timeupdate', loop);
    return () => vid.removeEventListener('timeupdate', loop);
  }, [videoRef]);
}

/* ─── MAIN BlogBanner ─── */
export default function BlogBanner() {
  const videoRef = useRef(null);
  useLoopFirst15(videoRef);

  return (
    <section className="relative h-screen overflow-hidden bg-[#2e241a]">
      {/* ▪ background particles video */}
      <video
        ref={videoRef}
        src="/video/fx.mp4"
        playsInline
        muted
        preload="auto"
        onLoadedData={e => e.currentTarget.play()}
        className="absolute inset-0 w-full h-full object-cover
                   opacity-25 contrast-[.9] hue-rotate-[-8deg] saturate-[.8]
                   pointer-events-none"
      />

      {/* ▪ vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/35 via-transparent to-black/40" />

      {/* ▪ content grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center h-full px-6 md:px-20 gap-y-12">
        {/* — Left: animated heading — */}
        <motion.h1
          className="text-white uppercase tracking-tight leading-[0.9]
                     text-[clamp(8vw,6rem,10rem)] text-center md:text-left"
          style={{ fontFamily: 'var(--font-tusker)' }}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Latest&nbsp;Thoughts
        </motion.h1>

        {/* — Right: “Why I write” blurb — */}
        <motion.div
          className="text-white text-base md:text-lg leading-relaxed max-w-lg mx-auto md:mx-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          <p>
            I write to explore the space where technology meets humanity—
            to turn complex ideas into clear, engaging stories that spark
            curiosity and creativity. Whether I’m unpacking the latest
            design trend, sharing a personal insight, or reflecting on
            professional lessons learned, my goal is always the same:
            to inspire you to think differently, build with purpose, and
            push the boundaries of what’s possible.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
