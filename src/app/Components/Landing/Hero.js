"use client";

import { useState } from "react";
import Dock from "./Dock";

export default function Banner() {
  const [hoveredBanner, setHoveredBanner] = useState(null);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Default bg */}
      <img
        src="/landing/banner.jpg"
        alt="Default banner"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          hoveredBanner ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Hovered bg */}
      {hoveredBanner && (
        <img
          key={hoveredBanner}
          src={hoveredBanner}
          alt="Hovered banner"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-100"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />

      {/* TEXT CONTAINER */}
      <div
        className={`
          absolute bottom-40 sm:bottom-24 inset-x-4 sm:inset-x-8 z-10
          grid grid-cols-1 sm:grid-cols-2
          gap-y-8 sm:gap-x-16
          transition-opacity duration-700
          ${hoveredBanner ? "opacity-0" : "opacity-100"}
        `}
      >
        {/* HEADLINE BLOCK */}
        <div className="justify-self-start">
          <p
            className="text-white text-xl sm:text-2xl mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            creative
          </p>

          <h1
            className="
      text-white
      uppercase
      tracking-tight
      text-[clamp(12vw,4rem,8rem)]
      leading-[1.05]           /* normal spacing on mobile  */
      sm:leading-[1]        /* a bit tighter on desktop */
    "
            style={{ fontFamily: "var(--font-tusker)" }}
          >
            DESIGNER&nbsp;
            <span className="inline-block align-middle text-[0.4em]">
              &amp;
            </span>
            <br />
            DEVELOPER
          </h1>
        </div>

        {/* PASSAGE BLOCK */}
        <div
  style={{ fontFamily: 'var(--font-bebas)' }} // swap to your elegant serif for better legibility
  className="
    self-end
    justify-self-end
    max-w-lg
    w-full
  "
>
  <p className="text-white/80 text-lg sm:text-2xl leading-relaxed">
    I am an explorer of code and creativity, seeking beauty in both function and form.
    <br />
    I build not just projects, but thoughtful experiences that inspire and empower.
    <br />
    I believe design should whisper clarity and spark curiosity, never shout.
  </p>
</div>

      </div>

      {/* DOCK */}
      <Dock
        onHoverItem={(banner) => setHoveredBanner(banner)}
        onLeave={() => setHoveredBanner(null)}
      />
    </section>
  );
}
