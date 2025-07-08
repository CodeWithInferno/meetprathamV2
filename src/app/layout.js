'use client';
import { useEffect } from "react";
import { Bebas_Neue, Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';
import "./globals.css";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import CustomCursor from "./Components/CustomCursor";
import Lenis from '@studio-freight/lenis';

const bebas = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-bebas'
});
const tusker = localFont({
  src: [
    {
      path: '../../public/fonts/tusker-grotesk.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-tusker',
  display: 'swap',
  preload: true,
});
const playfair = Playfair_Display({
  weight: ['400'],
  style: ['italic'],
  subsets: ['latin'],
  variable: '--font-playfair'
});

export default function RootLayout({ children }) {
  useEffect(() => {
const lenis = new Lenis({
  duration: 2.5,
  smooth: true,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -15 * t)), // extra smooth
});


    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <html lang="en">
      <Analytics/>
      <SpeedInsights/>
      <body className={`${bebas.variable} ${playfair.variable} ${tusker.variable} bg-white text-black min-h-screen bg-no-repeat`}>
        <div id="cursor-circle"></div>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
