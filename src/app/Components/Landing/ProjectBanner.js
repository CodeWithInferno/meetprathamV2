// src/components/ProjectShowcaseBanner.jsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const PROJECTS = [
  { title: 'InboxIQ',     image: '/A.png',              href: '/projects/' },
  { title: 'LetsConnect', image: '/B - Purple.png',      href: '/projects/' },
  { title: 'MeetPratham', image: '/Dragon Red.jpg',      href: '/projects/' },
  { title: 'Tess AI',     image: '/Facets-1.jpg',        href: '/projects/' },
  { title: 'SignSpeak',   image: '/Facets-2.jpg',        href: '/projects/' },
  { title: 'Deliciae',    image: '/Facets-3.jpg',        href: '/projects/' },
];

// duplicate so marquee scrolls seamlessly
const LOOPED = [...PROJECTS, ...PROJECTS];

export default function ProjectShowcaseBanner() {
  return (
    <section
      className="
        relative w-full h-screen overflow-hidden
        bg-[linear-gradient(180deg,#FDFD96_0%,#FDFD96_50%,#FFA07A_50%,#FFA07A_100%)]
      "
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      <div className="relative z-10 h-full grid md:grid-cols-2">
        {/* LEFT: animated headline + copy */}
        <div className="flex flex-col justify-center px-6 md:px-16">
          <motion.h1
            className="text-[clamp(3rem,8vw,5rem)] font-extrabold uppercase
                       tracking-wide border-b-4 border-black pb-4 mb-6"
            style={{
              fontFamily: 'var(--font-tusker)',
              letterSpacing: '0.05em',
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            PROJECTS
          </motion.h1>
          <motion.p
  className="text-lg text-black/80 max-w-md"
  style={{ fontFamily: 'var(--font-playfair)' }}
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
>
  Dive into a playground of ideas where algorithms meet artistry and
  experiments spark innovation.

  This space is my living canvas — projects shaped by curiosity, crafted
  to challenge convention, and designed to delight.
</motion.p>

        </div>

        {/* RIGHT: two vertical marquees with fade-in */}
        <div className="flex items-center justify-center space-x-8 overflow-hidden h-full px-6 md:px-16">
          {[0, 1].map((col) => (
            <motion.div
              key={col}
              className="relative w-64 h-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + col * 0.2, duration: 1, ease: 'linear' }}
            >
              <div className="marquee-col relative flex flex-col space-y-8">
                {LOOPED.map((p, i) => (
                  <Link key={i} href={p.href} className="group block">
                    <div
                      className="
                        relative w-full aspect-square
                        bg-[#87CEEB] border-4 border-black
                        rounded-lg overflow-hidden
                        shadow-[8px_8px_0px_#000]
                        transition-transform transition-shadow
                        duration-300 ease-out
                        group-hover:-translate-y-2
                        group-hover:scale-105
                        group-hover:shadow-[16px_16px_0px_#000]
                      "
                    >
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover brightness-110"
                      />
                    </div>
                    <div
                      className="
                        mt-3 text-base uppercase text-black
                        bg-white/80 px-2 py-1 inline-block
                        font-bold tracking-wide
                      "
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      {p.title}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* bottom stripe */}
      <div className="absolute bottom-0 left-0 w-full h-4 bg-[#FFA07A]" />
    </section>
  );
}
