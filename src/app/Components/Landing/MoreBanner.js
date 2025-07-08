// src/components/ConnectBanner.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

const INTERESTS = [
  "Artifical Intelligence",
  "Frontend Development",
  "Research In AI/ML",
  "Hackathons",
  "Croissant",
  "New Businesses",
  "Startups",
  "Chess",
  "Digital Art",
];

export default function ConnectBanner() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* 1) full-bleed painting */}
      <Image
        src="/images/Chaotic Historical Painting Remix.png"
        alt="Classical painting background"
        fill
        className="object-cover"
        priority
      />

      {/* 2) dark overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* 3) marquee up near the top */}
      <div className="absolute inset-x-8 top-28 z-10 flex flex-col items-center space-y-2 border-b-2 border-white/70 pb-2">
        <p
          className="uppercase text-6xl text-white/80 tracking-wide"
          style={{ fontFamily: "var(--font-tusker)" }}
        >
          I’m also interested in
        </p>
        <marquee
          className="text-4xl font-bold uppercase text-white/70 tracking-wider whitespace-nowrap"
          behavior="scroll"
          direction="left"
          scrollamount="8"
        >
          {INTERESTS.join(" • ")}
        </marquee>
      </div>

      {/* 4) bottom-left LET'S CONNECT headline */}
      <div className="absolute bottom-24 left-8 z-10">
        <h1
          className="uppercase text-white text-[clamp(4rem,12vw,12rem)] leading-[1.2]"
          style={{ fontFamily: "var(--font-tusker)", letterSpacing: "0.5px" }}
        >
          LET&apos;S
          <br />
          CONNECT
        </h1>
      </div>

      {/* 5) CTA + socials */}
      <div className="absolute bottom-20 sm:bottom-28 md:bottom-36 left-1/2 md:left-1/3 right-0 z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full mx-auto flex flex-col gap-6 sm:gap-5">
          {/* ───── Row 1 ───── */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <span className="text-white uppercase tracking-wide text-sm sm:text-base md:text-lg">
              Are you minding a project?
            </span>

            <Link
              href="mailto:prathambiren2618@gmail.com"
              className="bg-white text-black uppercase font-medium px-5 py-2 rounded-full tracking-wide
                   hover:bg-white/90 transition text-xs sm:text-sm"
            >
              Contact Me
            </Link>
          </div>

          {/* ───── Row 2 : rule ───── */}
          <hr className="w-full border-t border-white/25" />

          {/* ───── Row 3 ───── */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            {/* socials */}
            <div className="flex flex-wrap gap-4 sm:gap-6 text-white text-sm">
              <Link
                href="https://github.com/CodeWithInferno"
                target="_blank"
                rel="noopener"
              >
                Github
              </Link>
              <Link
                href="www.linkedin.com/in/pratham-patel-6a40b5323"
                target="_blank"
                rel="noopener"
              >
                LinkedIn
              </Link>
              <Link
                href="https://www.instagram.com/pratham_disc/"
                target="_blank"
                rel="noopener"
              >
                Instagram
              </Link>
            </div>

            {/* footer links */}
            <div className="flex gap-4 sm:gap-6 text-xs text-white/60 pt-2 md:pt-0">
              <Link href="https://meetpratham-v2-git-main-codewithinfernos-projects.vercel.app" target="_blank" rel="noopener">v1</Link>
              <Link href="/credits">credits</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
