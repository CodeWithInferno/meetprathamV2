import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import {SpeedInsights} from "@vercel/speed-insights/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <Analytics/>
      <SpeedInsights/>

      <body className={`${inter.className} bg-white text-black min-h-screen bg-no-repeat`}>
        {children}
      </body>
    </html>
  );
}