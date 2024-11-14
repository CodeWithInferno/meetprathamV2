import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import {SpeedInsights} from "@vercel/speed-insights/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    absolute: "",
    default: "Pratham",
    template: "%s | Pratham",
  },
  description: "Welcome to Pratham Patel's portfolio! Explore my projects, blog posts, and all the work I've done. Learn more about me, my skills, and the journey that drives my passion for technology and development.",
  icons: {
    icon: ['/favicon.ico'] // Ensure the path is correct
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Default meta tags for the entire site */}
        <title>Meet Pratham - Web Developer Portfolio</title>
        <meta name="description" content="Explore Pratham's portfolio, projects, and blog posts." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Default Open Graph tags */}
        <meta property="og:title" content="Meet Pratham - Web Developer Portfolio" />
        <meta property="og:description" content="Explore Pratham's portfolio, projects, and blog posts." />
        <meta property="og:image" content="/B - Cyan.png" />
        <meta property="og:url" content="https://meetpratham.me" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="/B - Cyan.png" />
        <meta name="twitter:title" content="Meet Pratham - Web Developer Portfolio" />
        <meta name="twitter:description" content="Explore Pratham's portfolio, projects, and blog posts." />
        <meta name="twitter:image" content="/B - Cyan.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Analytics/>
      <SpeedInsights/>

      <body className={`${inter.className} bg-white text-black min-h-screen bg-no-repeat`}>
        {children}
      </body>
    </html>
  );
}