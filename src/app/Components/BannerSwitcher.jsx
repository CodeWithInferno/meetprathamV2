// src/components/BannerSwitcher.jsx
'use client';

import React, { useState, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import DefaultBanner  from './Landing/Hero';
import WhoAmIBanner   from './Landing/WhoAmIBanner';
import BlogBanner     from './Landing/BlogBanner';
import ProjectBanner  from './Landing/ProjectBanner';
import Dock           from './Landing/Dock';
import MoreBanner     from './Landing/MoreBanner';

const bannerMap = {
  default:  DefaultBanner,
  whoami:   WhoAmIBanner,
  blog:     BlogBanner,
  projects: ProjectBanner,
  More: MoreBanner,
};

export default function BannerSwitcher() {
  // start on default
  const [activeKey, setActiveKey] = useState('default');
  const Active = bannerMap[activeKey] || DefaultBanner;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit   ={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Suspense fallback={null}>
            <Active />
          </Suspense>
        </motion.div>
      </AnimatePresence>

      <Dock
        onHoverItem={(key) => setActiveKey(key)} // desktop: preview on hover
        onLeave={() => { /* do nothing — stay on last preview */ }}
      />
    </section>
  );
}
