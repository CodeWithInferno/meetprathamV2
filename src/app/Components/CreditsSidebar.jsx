'use client';

import React from 'react';

export default function CreditsSidebar({ onClose }) {
  return (
    <>
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-50" // <-- updated z-50
        onClick={onClose}
      />

      {/* fully opaque sidebar panel */}
      <div className="
        fixed top-0 right-0 h-full w-80 bg-black text-white z-60 p-6 overflow-y-auto
        shadow-2xl flex flex-col space-y-6
      ">  {/* <-- updated z-60 */}
        {/* Header with close button */}
        <div className="flex justify-between items-center border-b border-white/20 pb-4 mb-4 bg-black">
          <h2 className="text-xl sm:text-2xl font-bold">CREDITS</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-400 text-2xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* credits sections */}
        <div className="space-y-6 bg-black">
          <div>
            <p className="text-sm uppercase tracking-wider mb-2 text-white/70">Fonts:</p>
            <p className="text-base font-medium">Neue Montreal</p>
            <p className="text-base font-medium">Migra</p>
            <p className="text-base font-medium">Maelstrom</p>
            <p className="text-base font-medium">Tusker Grotesk</p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-wider mb-2 text-white/70">WebGL model:</p>
            <p className="text-base font-medium">Head of David but with Hay</p>
          </div>

          <p className="text-sm text-white/60">Personal use only. Not commercial use.</p>
        </div>
      </div>
    </>
  );
}
