'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap'; // --- FIX: Import GSAP to fix the "not defined" error ---

export default function ClientLayout({ children }) {
  const cursorRef = useRef(null);
  
  // State to detect if it's a touch device, so we can disable the custom cursor.
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // This effect runs once to set up device detection and smooth scrolling.
  useEffect(() => {
    // Check if the primary input mechanism is "coarse" (i.e., touch).
    const hasTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(hasTouch);

    // Only initialize Lenis smooth scroll and the cursor if NOT a touch device.
    if (!hasTouch) {
      const lenis = new Lenis({
        // Using your preferred Lenis settings
        duration: 2.5,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -15 * t)),
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // A cleanup function to destroy Lenis when the component unmounts
      return () => lenis.destroy();
    }
  }, []); // Empty dependency array ensures this runs only once on mount.

  // This effect handles all the logic for the custom cursor.
  useEffect(() => {
    // If it's a touch device or the cursor element doesn't exist, do nothing.
    if (isTouchDevice || !cursorRef.current) return;

    const cursor = cursorRef.current;
    
    // Use GSAP's high-performance "quickTo" for smooth cursor following.
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3.out" });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);

      const target = e.target;
      
      // Check if the hovered element or its parent is a link or button.
      const isLink = target.closest('a, button');

      // Add the .link-hover class if it's a link, otherwise remove it.
      cursor.classList.toggle('link-hover', !!isLink);
      // For any other element you want to enlarge the cursor on, add the attribute `data-cursor-enlarge`.
      cursor.classList.toggle('enlarged', !isLink && target.closest('[data-cursor-enlarge]'));
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup: remove the event listener when the component unmounts.
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTouchDevice]); // This effect depends on the device type.

  return (
    <>
      {/* 
        The custom cursor div is now conditionally rendered.
        It will NOT exist in the HTML on a mobile/touch device.
        This completely replaces your old <div id="cursor-circle"> and <CustomCursor />.
      */}
      {!isTouchDevice && (
        <div id="cursor-circle" ref={cursorRef}>
          <span className="cursor-text"></span>
        </div>
      )}
      
      {children}
    </>
  );
}