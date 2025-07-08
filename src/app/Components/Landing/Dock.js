// src/components/Landing/Dock.jsx
'use client';

import { useRouter } from 'next/navigation';

export default function Dock({ onHoverItem, onLeave }) {
  const router = useRouter();

  // add “Home” as the default banner
  const items = [
    { key: 'default',  label: 'Home',        path: '/'        },
    { key: 'whoami',   label: 'Who Am I?',   path: '/me'      },
    { key: 'blog',     label: 'Blog',        path: '/bloglist'    },
    { key: 'projects', label: 'Projects',    path: '/projects'},
    { key: 'More', label: 'More',    path: '/linktree'},
  ];

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
        {items.map(({ key, label, path }) => (
          <button
            key={key}
            onMouseEnter={() => onHoverItem(key)}    // desktop hover
            onClick={() => router.push(path)}        // mobile tap
            className="
              backdrop-blur-sm bg-white/20 text-white
              px-4 py-2 sm:px-6 sm:py-3 rounded-full
              text-sm sm:text-base transition-transform
              hover:scale-105
            "
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
