// app/Components/projects/TerminalHeader.jsx
'use client';

import React from 'react';
import useSound from 'use-sound';
import Link from 'next/link';

export default function TerminalHeader() {
  const [playHover] = useSound('/Audio/Hover.mp3', { volume: 0.2 });

  return (
    <header className="terminal-header">
      <div className="header-left">
        <span className="text-red-500">●</span> root@pratham-os: ~/
      </div>
      <nav className="header-right">
        <Link href="/projects" className="header-link" onMouseEnter={playHover}>[ projects ]</Link>
        <Link href="/bloglist" className="header-link" onMouseEnter={playHover}>[ blog ]</Link>
        <Link href="/me" className="header-link" onMouseEnter={playHover}>[ me ]</Link>
        <Link href="/contact" className="header-link" onMouseEnter={playHover}>[ contact ]</Link>
      </nav>
    </header>
  );
}