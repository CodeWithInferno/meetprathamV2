// src/app/Components/summary/client.js
'use client';

import dynamic from 'next/dynamic';

// Dynamically import SVG story portfolio
const SVGStoryPortfolio = dynamic(() => import('./svg-story-client'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <svg width="100" height="100" className="animate-spin">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="20 10" />
      </svg>
    </div>
  )
});

export default function SummaryClientPage(props) {
  return <SVGStoryPortfolio {...props} />;
}