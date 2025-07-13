// src/components/Landing/DefaultBanner.jsx (Renamed from Banner.jsx)
'use client';

import { useState } from 'react';
import Image from 'next/image'; // Import next/image for optimized image handling
import Dock from './Dock'; // This Dock is for the internal banner image hover effect

// Define the static image paths for the hover effect within this banner.
// These should correspond to the imagePath values in Dock.jsx
const bannerImagePaths = {
  default: '/landing/Banner.png', // Main default banner image
  whoami: '/landing/whoami_banner.jpg', 
  blog: '/landing/blog_banner.jpg',
  projects: '/landing/projects_banner.jpg',
  More: '/landing/more_banner.jpg',
};

// IMPORTANT: Generate a blurDataURL for your actual /landing/banner.jpg
// You can use a tool like 'plaiceholder' or a simple online blurhash generator
// and encode a tiny blurred version of your default image to Base64.
// For demonstration, a tiny base64 encoded transparent gif:
const defaultBlurDataURL = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

export default function DefaultBanner() {
  const [hoveredImageKey, setHoveredImageKey] = useState(null); // Stores the key of the hovered item

  // Function to get the correct image path based on the hovered key
  const getHoveredImagePath = (key) => {
    return bannerImagePaths[key] || bannerImagePaths.default; // Fallback to default if key not found
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Default background image (always present, fades out on hover) */}
      <Image
        src={bannerImagePaths.default}
        alt="Default banner"
        fill // 'fill' makes the image cover its parent element
        priority // 'priority' tells Next.js to preload this image (for immediate visibility)
        placeholder="blur" // 'blur' will show blurDataURL while the image loads
        blurDataURL={defaultBlurDataURL} // Your generated blur hash or data URL
        sizes="100vw" // Important for responsive images to know their size across viewports
        className={`object-cover transition-opacity duration-700 ${
          hoveredImageKey ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Hovered background image (only present when hovered, fades in) */}
      {hoveredImageKey && (
        <Image
          key={hoveredImageKey} // Key for React to re-render when the hovered image changes
          src={getHoveredImagePath(hoveredImageKey)}
          alt={`Hovered banner for ${hoveredImageKey}`}
          fill
          sizes="100vw"
          className="object-cover transition-opacity duration-700 opacity-100"
        />
      )}

      {/* Overlay to darken background image */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />

      {/* TEXT CONTAINER */}
      <div
        className={`
          absolute bottom-40 sm:bottom-24 inset-x-4 sm:inset-x-8 z-10
          grid grid-cols-1 sm:grid-cols-2 /* Stacks on mobile, side-by-side on sm and up */
          gap-y-8 sm:gap-x-16
          transition-opacity duration-700
          ${hoveredImageKey ? 'opacity-0' : 'opacity-100'}
        `}
      >
        {/* HEADLINE BLOCK */}
        <div className="justify-self-start">
          <p
            className="text-white text-xl sm:text-2xl mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            creative
          </p>

          <h1
            className="
              text-white
              uppercase
              tracking-tight
              text-[clamp(12vw,4rem,8rem)] /* Fluid font size, adapts to viewport */
              leading-[1.05]           /* normal line height on mobile  */
              sm:leading-[1]           /* a bit tighter on desktop */
              break-words               /* Allows long words to break onto next line on small screens */
            "
            style={{ fontFamily: 'var(--font-tusker)' }}
          >
            DESIGNER 
            <span className="inline-block align-middle text-[0.4em]">
              &
            </span>
            <br />
            DEVELOPER
          </h1>
        </div>

        {/* PASSAGE BLOCK */}
        <div
          style={{ fontFamily: 'var(--font-bebas)' }} // As per your original code
          className="
            self-end
            justify-self-end /* Aligns the block to the right within its grid column on larger screens */
            max-w-lg
            w-full
          "
        >
          {/* Adjusted text alignment for better responsiveness:
              - text-left: Default left alignment for paragraphs on all screens
              - sm:text-left: Keeps left alignment on small breakpoints (where cols-2 starts)
              - md:text-right: You can uncomment this if you want the text itself to align right on medium screens and up,
                                to visually match the 'justify-self-end' of its container. Otherwise, it will stay left-aligned within the right-aligned block.
          */}
          <p className="text-white/80 text-lg sm:text-2xl leading-relaxed text-left">
            I am an explorer of code and creativity, seeking beauty in both function and form.
            <br />
            I build not just projects, but thoughtful experiences that inspire and empower.
            <br />
            I believe design should whisper clarity and spark curiosity, never shout.
          </p>
        </div>
      </div>

      {/* DOCK for internal image hover */}
      <Dock
        onHoverItem={(item) => setHoveredImageKey(item.key)} // Now correctly receives item.key
        onLeave={() => setHoveredImageKey(null)}
        activeKey={hoveredImageKey} // Pass its own internal active key for visual highlighting
      />
    </section>
  );
}