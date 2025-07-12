'use client'; // This component MUST be a client component

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import CustomCursor from './CustomCursor';

export default function ClientLayout({ children }) {
  // The Lenis smooth scroll effect
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.5,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -15 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <div id="cursor-circle"></div>
      <CustomCursor />
      {children}
    </>
  );
}