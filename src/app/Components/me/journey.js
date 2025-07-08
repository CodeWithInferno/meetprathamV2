'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function HeroToGallery() {
  const [revealed, setRevealed] = useState(false);
  const transitionRef = useRef(null);
  const lineRef = useRef(null);
  const nextSectionRef = useRef(null);

  const handleReveal = () => {
    const tl = gsap.timeline({
      onComplete: () => setRevealed(true),
    });

    tl.to(transitionRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.inOut',
    });

    tl.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 0.5,
        transformOrigin: 'top center',
        ease: 'power3.out',
      }
    );

    tl.to(lineRef.current, {
      scaleX: 200, // expands horizontally like door
      duration: 0.8,
      ease: 'power4.inOut',
    });

    tl.to(nextSectionRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    });
  };

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {!revealed && (
        <div className="z-10 relative flex flex-col items-center justify-center h-screen text-center px-6">
          <h1 className="text-6xl md:text-8xl font-serif leading-tight">
            HERITAGE IN ART
          </h1>
          <p className="mt-6 text-xl max-w-xl">
            A timeless collection of visual stories.
          </p>
          <button
            onClick={handleReveal}
            className="mt-10 bg-yellow-300 text-black px-6 py-2 rounded-full hover:scale-105 transition-transform"
          >
            View Gallery
          </button>
        </div>
      )}

      {/* Transition Overlay */}
      <div
        ref={transitionRef}
        className="fixed top-0 left-0 w-full h-full bg-black opacity-0 z-50 flex items-center justify-center"
      >
        <div
          ref={lineRef}
          className="bg-white w-[2px] h-full scale-y-0 scale-x-1"
        />
      </div>

      {/* Next Section */}
      {revealed && (
        <div
          ref={nextSectionRef}
          className="absolute top-0 left-0 w-full min-h-screen bg-black text-white flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-20 opacity-0 translate-y-10"
        >
          <img
            src="/images/art1.jpg"
            alt="Art 1"
            className="w-[250px] md:w-[300px] object-cover"
          />
          <div className="max-w-lg text-center md:text-left">
            <h2 className="text-4xl font-serif italic mb-4">A (Journey) Through Time</h2>
            <p className="text-lg text-zinc-300">
              Step into a world where tradition meets artistry. Explore a personal collection of artworks
              revealing layers of history, craftsmanship, and enduring heritage.
            </p>
            <button className="mt-6 flex items-center gap-2 border border-white px-4 py-2 rounded-full">
              <span>About Us</span>
              <span className="text-xl">↗</span>
            </button>
          </div>
          <img
            src="/images/art2.jpg"
            alt="Art 2"
            className="w-[250px] md:w-[300px] object-cover"
          />
        </div>
      )}
    </section>
  );
}
