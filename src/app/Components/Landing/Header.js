'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-20">
      <div
        className="
          flex items-center justify-between
          w-full
          px-4 py-3
          md:px-8 md:py-4
          bg-white/10 
          border-b border-white/20
        "
      >
        {/* Left nav */}
        <Link href="/me" legacyBehavior>
          <a className="
            text-white 
            text-sm md:text-base 
            uppercase tracking-wider 
            hover:text-white/80 
            transition-colors
          ">
            About
          </a>
        </Link>

        {/* Center title */}
        <Link href="/home" legacyBehavior>
          <a className="
            text-white 
            text-base md:text-lg 
            lowercase tracking-wide 
            hover:text-white/80 
            transition-colors
          ">
            PRATHAM PATEL
          </a>
        </Link>

        {/* Right nav */}
        <Link href="/linktree" legacyBehavior>
          <a className="
            text-white 
            text-sm md:text-base 
            uppercase tracking-wider 
            hover:text-white/80 
            transition-colors
          ">
            Contact
          </a>
        </Link>
      </div>
    </header>
  );
}
