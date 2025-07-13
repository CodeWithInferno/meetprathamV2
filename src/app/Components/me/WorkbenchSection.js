// app/me/WorkbenchSection.jsx
'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const data = {
  timeline: [
    { year: '2019', event: 'Began my odyssey into the world of code.' },
    { year: '2021', event: 'Architected my first major AI platform.' },
    { year: '2023', event: 'Ventured into the frontiers of Web3 & Generative AI.' },
  ],
  skills: ['React', 'Next.js', 'Python', 'TensorFlow', 'GSAP', 'Solidity', 'Figma', 'PostgreSQL'],
  languages: [
    { lang: 'JavaScript', level: 'Expert', icon: '</>', rotation: -3, top: '20%', left: '10%' },
    { lang: 'Python', level: 'Expert', icon: '{py}', rotation: 4, top: '55%', left: '30%' },
    { lang: 'Solidity', level: 'Intermediate', icon: '💎', rotation: -6, top: '15%', left: '55%' },
    { lang: 'SQL', level: 'Advanced', icon: '🛢️', rotation: 2, top: '60%', left: '70%' },
  ],
};

export default function WorkbenchSection() {
  const mainRef = useRef(null);
  const workbenchRef = useRef(null);
  const contentWrapperRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    // Setup for desktop (min-width: 769px)
    mm.add("(min-width: 769px)", () => {
      // Ensure content is hidden initially for desktop animation
      gsap.set(contentWrapperRef.current, { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1.5,
        },
      });

      tl.to(contentWrapperRef.current, { autoAlpha: 1, duration: 1, ease: 'power2.inOut' })
        .to(workbenchRef.current, {
          x: () => -(workbenchRef.current.scrollWidth - document.documentElement.clientWidth),
          ease: 'none',
          duration: 8,
        }, "<"); // Use "<" to start horizontal scroll at the same time as fade-in completes.

      return () => { // Cleanup for this matchMedia instance
        tl.kill();
      };
    });

    // Setup for mobile (max-width: 768px)
    mm.add("(max-width: 768px)", () => {
      // CRUCIAL: Ensure elements are visible and not transformed on mobile
      gsap.set(contentWrapperRef.current, { autoAlpha: 1, clearProps: "all" });
      gsap.set(workbenchRef.current, { x: 0, clearProps: "all" });

      // Kill any ScrollTriggers that might have been created
      // and are now irrelevant on mobile.
      ScrollTrigger.getAll().forEach(st => st.kill());
    });

    // General cleanup for all matchMedia instances when component unmounts
    return () => {
      mm.revert(); // Reverts all animations and matchMedia contexts created by this instance
    };
  }, []);

  return (
    // This section pins itself over the previous content.
    // The background color provides the canvas for the workbench.
    <section ref={mainRef} className="relative h-screen bg-[#f0f0f0] overflow-hidden">
      
      {/* 
        This wrapper holds all the content. We will fade this in as a whole.
        It's centered perfectly using flexbox.
      */}
      <div ref={contentWrapperRef} className="w-full h-full flex items-center workbench-bg invisible">
          
        {/* The workbench-track now sits inside the centered wrapper */}
        <div ref={workbenchRef} className="workbench-track">
            
          <div className="workbench-zone combined-zone">
            <div className="timeline-spine" />
            {data.timeline.map((item, i) => (
              <div key={i} className="timeline-item-center" style={{ left: `${15 + i * 25}%` }}>
                <div className={`timeline-connector ${i % 2 === 0 ? 'top' : 'bottom'}`} />
                <div className={`timeline-content-center ${i % 2 === 0 ? 'top' : 'bottom'}`}>
                  <span className="font-bold">{item.year}</span>: {item.event}
                </div>
              </div>
            ))}
            <div className="toolkit-foundation">
              <h2 className='toolkit-title'>[ TOOLKIT ]</h2>
              <div className="toolkit-grid">
                {data.skills.map((skill, i) => <div key={i} className="skill-item" style={{'--delay': `${i * 0.05}s`}}>{skill}</div>)}
              </div>
            </div>
          </div>

          <div className="workbench-zone languages-zone-redesigned">
              <h2 className="languages-title-absolute">[ LANGUAGE_PROFICIENCY ]</h2>
              {data.languages.map((item, i) => (
                  <div key={i} className="language-card-scattered" style={{ top: item.top, left: item.left, transform: `rotate(${item.rotation}deg)`}}>
                      <div className="language-icon">{item.icon}</div>
                      <div className="language-details">
                          <span className="language-name">{item.lang}</span>
                          <span className="language-level">{item.level}</span>
                      </div>
                  </div>
              ))}
          </div>

        </div>
      </div>
    </section>
  );
}