'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from '@studio-freight/lenis';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  
  // Check if we're on the admin page
  const isAdminPage = pathname.startsWith('/admin');

  // This effect runs once to set up smooth scrolling.
  useEffect(() => {
    // Don't initialize Lenis on admin pages
    if (isAdminPage) return;
    
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
  }, [isAdminPage]); // Re-run when admin page status changes


  return (
    <>
      {children}
    </>
  );
}