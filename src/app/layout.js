
// import { useEffect } from "react";
// import { Bebas_Neue, Playfair_Display, IBM_Plex_Mono } from 'next/font/google';
// import localFont from 'next/font/local';
// import "./globals.css";
// import Head from "next/head";
// import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/react";
// import CustomCursor from "./Components/CustomCursor";
// import Lenis from '@studio-freight/lenis';


// const bebas = Bebas_Neue({
//   weight: ['400'],
//   subsets: ['latin'],
//   variable: '--font-bebas'
// });
// const tusker = localFont({
//   src: [
//     {
//       path: '../../public/fonts/tusker-grotesk.woff2',
//       weight: '400',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-tusker',
//   display: 'swap',
//   preload: true,
// });
// const playfair = Playfair_Display({
//   weight: ['400'],
//   style: ['italic'],
//   subsets: ['latin'],
//   variable: '--font-playfair'
// });
// const ibmPlexMono = IBM_Plex_Mono({
//   subsets: ['latin'],
//   weight: ['400', '700'],
// })


// export default function RootLayout({ children }) {
//   useEffect(() => {
// const lenis = new Lenis({
//   duration: 2.5,
//   smooth: true,
//   easing: t => Math.min(1, 1.001 - Math.pow(2, -15 * t)), // extra smooth
// });


//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);
//     return () => lenis.destroy();
//   }, []);

//   return (
//     <html lang="en">
//       <Analytics/>
//       <SpeedInsights/>
//       <body className={`${bebas.variable} ${ibmPlexMono.className} ${playfair.variable} ${tusker.variable} bg-white text-black min-h-screen bg-no-repeat`}>
//         <div id="cursor-circle"></div>
//         <CustomCursor />
//         {children}
//       </body>
//     </html>
//   );
// }



// NO MORE 'use client'; THIS IS NOW A SERVER COMPONENT!

import { Bebas_Neue, Playfair_Display, IBM_Plex_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Import the client-side wrapper we just made
import ClientLayout from './Components/ClientLayout';

// Font definitions (your code, unchanged)
const bebas = Bebas_Neue({ weight: ['400'], subsets: ['latin'], variable: '--font-bebas' });
const tusker = localFont({ src: [{ path: '../../public/fonts/tusker-grotesk.woff2', weight: '400', style: 'normal', }], variable: '--font-tusker', display: 'swap', preload: true });
const playfair = Playfair_Display({ weight: ['400'], style: ['italic'], subsets: ['latin'], variable: '--font-playfair' });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '700'] });


// =================================================================
// STEP 2.1: ADD SITE-WIDE METADATA
// This is the default SEO for your entire site.
// =================================================================
export const metadata = {
  // Use a template to automatically add your site name to page titles
  title: {
    template: '%s | Pratham\'s Tech Blog',
    default: 'Pratham\'s Tech Blog - Explorations in Code & Design', // Default title for homepage
  },
  description: 'A collection of thoughts, tutorials, and explorations in web development, design, and technology from Pratham.',
  // Add other important metadata
  openGraph: {
    title: 'Pratham\'s Tech Blog',
    description: 'A collection of thoughts, tutorials, and explorations in web development, design, and technology from Pratham.',
    url: 'https://www.meetpratham.me',
    siteName: 'Pratham\'s Tech Blog',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratham\'s Tech Blog',
    description: 'A collection of thoughts, tutorials, and explorations in web development, design, and technology from Pratham.',
  },
  // Tells Google the main version of your URL to prevent duplicate content issues
  alternates: {
    canonical: 'https://www.meetpratham.me',
  },
};


export default function RootLayout({ children }) {
  // NO MORE useEffect here. This is a clean Server Component.
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${ibmPlexMono.className} ${playfair.variable} ${tusker.variable} bg-white text-black min-h-screen bg-no-repeat`}>
        {/*
          STEP 2.2: WRAP CHILDREN WITH THE CLIENT COMPONENT
          This keeps your layout as a Server Component for SEO,
          while allowing smooth scroll and cursor to work on the client.
        */}
        <ClientLayout>
          {children}
        </ClientLayout>
        
        {/* Vercel analytics can stay here */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}