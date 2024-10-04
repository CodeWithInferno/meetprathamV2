import { Inter } from "next/font/google";
import "./globals.css";
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
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <Analytics/>
      <SpeedInsights/>

      <body className={`${inter.className} bg-white text-black min-h-screen bg-no-repeat`}>
        {children}
      </body>
    </html>
  );
}