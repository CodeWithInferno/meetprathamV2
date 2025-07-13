// src/components/Landing/Dock.jsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'; // NEW: Import useEffect and useState for touch detection

// NEW: activeKey prop is now received
export default function Dock({ onHoverItem, onLeave, activeKey }) {
  const router = useRouter();
  const [isTouchDevice, setIsTouchDevice] = useState(false); // NEW: State to detect touch device

  // NEW: Detect if it's a touch device on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
    }
  }, []);

  const items = [
    { key: 'default',  label: 'Home',        path: '/',          imagePath: '/landing/banner.jpg' },
    { key: 'whoami',   label: 'Who Am I?',   path: '/me',        imagePath: '/landing/whoami_banner.jpg' },
    { key: 'blog',     label: 'Blog',        path: '/bloglist',  imagePath: '/landing/blog_banner.jpg' },
    { key: 'projects', label: 'Projects',    path: '/projects',  imagePath: '/landing/projects_banner.jpg' },
    { key: 'More',     label: 'More',        path: '/linktree',  imagePath: '/landing/more_banner.jpg' },
  ];

  // NEW: Function to handle clicks for both desktop and mobile
  const handleClick = (item) => {
    if (isTouchDevice) {
      // Mobile/Touch device logic:
      // If the tapped item is already active, navigate.
      // Otherwise, just preview (set active banner) but don't navigate yet.
      if (item.key === activeKey) {
        router.push(item.path); // Navigate on second tap of the same item
      } else {
        onHoverItem(item); // First tap on a new item previews it
      }
    } else {
      // Desktop logic: Always navigate on click (hover already previews)
      router.push(item.path);
    }
  };

  return (
    <div
      className="absolute bottom-8 inset-x-0 z-20"
      onMouseLeave={onLeave} 
    >
      <div className="
        mx-auto w-full max-w-5xl
        grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5
        gap-4 place-items-center
      ">
        {items.map((item) => (
          <button
            key={item.key}
            onMouseEnter={isTouchDevice ? undefined : () => onHoverItem(item)} // Only enable hover for non-touch devices
            onClick={() => handleClick(item)} // Use the new handleClick function
            className={`
              backdrop-blur-sm bg-white/20 text-white
              px-4 py-2 sm:px-6 sm:py-3 rounded-full
              text-sm sm:text-base transition-transform
              hover:scale-105
              ${item.key === activeKey ? 'ring-2 ring-white scale-105' : ''} /* Optional: Highlight active item */
            `}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}