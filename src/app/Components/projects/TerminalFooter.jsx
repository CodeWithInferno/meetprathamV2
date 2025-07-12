// app/Components/projects/TerminalFooter.jsx
'use client';

import React from 'react';

export default function TerminalFooter() {
  return (
    <footer className="terminal-footer">
      <div className="footer-left">
        <span className="text-green-400">STATUS:</span> ONLINE | <span className="text-yellow-400">CONN:</span> SECURE
      </div>
      <div className="footer-right">
        (c) 2024 PRATHAM PATEL // SYS_V1.0
      </div>
    </footer>
  );
}