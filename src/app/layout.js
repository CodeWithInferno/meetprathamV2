
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
// SITE-WIDE METADATA WITH ENHANCED SEO
// =================================================================
export const metadata = {
  metadataBase: new URL('https://www.meetpratham.me'),
  title: {
    template: '%s | Pratham Patel',
    default: 'Pratham Patel | AI/ML Engineer & Full-Stack Developer',
  },
  description: 'AI/ML Engineer and Full-Stack Developer specializing in reinforcement learning, NLP, and modern web development. Building intelligent systems and sharing insights through code.',
  keywords: ['Pratham Patel', 'AI Engineer', 'ML Engineer', 'Machine Learning', 'Full Stack Developer', 'React', 'Next.js', 'Python', 'Portfolio'],
  authors: [{ name: 'Pratham Patel', url: 'https://www.meetpratham.me' }],
  creator: 'Pratham Patel',
  publisher: 'Pratham Patel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.meetpratham.me',
  },
  openGraph: {
    title: 'Pratham Patel | AI/ML Engineer & Full-Stack Developer',
    description: 'AI/ML Engineer and Full-Stack Developer specializing in reinforcement learning, NLP, and modern web development.',
    url: 'https://www.meetpratham.me',
    siteName: 'Pratham Patel Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.meetpratham.me/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Pratham Patel - AI/ML Engineer & Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@prathambiren',
    creator: '@prathambiren',
    title: 'Pratham Patel | AI/ML Engineer & Full-Stack Developer',
    description: 'AI/ML Engineer and Full-Stack Developer specializing in reinforcement learning, NLP, and modern web development.',
    images: ['https://www.meetpratham.me/og-banner.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you have them
    // google: 'your-google-site-verification',
    // yandex: 'your-yandex-verification',
    // bing: 'your-bing-verification',
  },
};



export default function RootLayout({ children }) {
  // NO MORE useEffect here. This is a clean Server Component.
  return (
    <html lang="en-US">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/Logo.svg" />
        <meta name="geo.region" content="US-PA" />
        <meta name="geo.placename" content="Erie" />
        <meta name="geo.position" content="42.1292;-80.0851" />
        <meta name="ICBM" content="42.1292, -80.0851" />
        <link rel="alternate" hreflang="en-US" href="https://www.meetpratham.me" />
        <link rel="alternate" hreflang="x-default" href="https://www.meetpratham.me" />
        <meta name="author" content="Pratham Patel" />
        <meta name="designer" content="Pratham Patel" />
        <meta name="owner" content="Pratham Patel" />
        <meta name="copyright" content="Pratham Patel" />
        <meta name="classification" content="Portfolio, AI/ML Engineer, Software Developer" />
        <meta name="subject" content="AI/ML Engineering Portfolio and Blog" />
        <meta name="url" content="https://www.meetpratham.me" />
        <meta name="identifier-URL" content="https://www.meetpratham.me" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
      </head>
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