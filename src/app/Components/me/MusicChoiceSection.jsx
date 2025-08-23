// app/me/MusicChoiceSection.jsx
'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

// IMPORTANT: Register the GSAP plugins
gsap.registerPlugin(ScrollTrigger, Draggable);

// The list of album covers
const COVERS = [
  "https://i.scdn.co/image/ab67616d00001e020ecc8c4fd215d9eb83cbfdb3",
  "https://i.scdn.co/image/ab67616d00001e02d9194aa18fa4c9362b47464f",
  "https://i.scdn.co/image/ab67616d00001e02a7ea08ab3914c5fb2084a8ac",
  "https://i.scdn.co/image/ab67616d00001e0213ca80c3035333e5a6fcea59",
  "https://i.scdn.co/image/ab67616d00001e02df04e6071763615d44643725",
  "https://i.scdn.co/image/ab67616d00001e0239c7302c04f8d06f60e14403",
  "https://i.scdn.co/image/ab67616d00001e021c0bcf8b536295438d26c70d",
  "https://i.scdn.co/image/ab67616d00001e029bbd79106e510d13a9a5ec33",
  "https://i.scdn.co/image/ab67616d00001e021d97ca7376f835055f828139",
  "https://www.udiscovermusic.com/wp-content/uploads/2015/10/Kanye-West-Yeezus.jpg",
];

export default function MusicChoiceSection() {
    const mainRef = useRef(null);

    useEffect(() => {
        // Scope all GSAP selectors to the component's main ref for safety
        const ctx = gsap.context(() => {

            // Initial setup for the elements
            gsap.set('.box', { yPercent: -50, display: 'block' });
            gsap.set('button', { z: 200 });

            const STAGGER = 0.1;
            const DURATION = 1;
            const BOXES = gsap.utils.toArray('.box');

            // The main animation loop for the carousel
            const LOOP = gsap.timeline({
                paused: true,
                repeat: -1,
                ease: 'none',
            });
            
            // This creates the continuous stream of boxes for the loop
            const SHIFTS = [...BOXES, ...BOXES, ...BOXES];

            // Define the animation for a single box
            SHIFTS.forEach((BOX, index) => {
                const BOX_TL = gsap.timeline()
                    .set(BOX, { xPercent: 250, rotateY: -50, opacity: 0, scale: 0.5 })
                    .to(BOX, { opacity: 1, scale: 1, duration: 0.1 }, 0)
                    .to(BOX, { opacity: 0, scale: 0.5, duration: 0.1 }, 0.9)
                    .fromTo(BOX, { xPercent: 250 }, { xPercent: -350, duration: 1, immediateRender: false, ease: 'power1.inOut' }, 0)
                    .fromTo(BOX, { rotateY: -50 }, { rotateY: 50, immediateRender: false, duration: 1, ease: 'power4.inOut' }, 0)
                    .to(BOX, { z: 100, scale: 1.25, duration: 0.1, repeat: 1, yoyo: true }, 0.4)
                    .fromTo(BOX, { zIndex: 1 }, { zIndex: BOXES.length, repeat: 1, yoyo: true, ease: 'none', duration: 0.5, immediateRender: false }, 0);
                LOOP.add(BOX_TL, index * STAGGER);
            });

            const CYCLE_DURATION = STAGGER * BOXES.length;
            
            // Set a default start time for the animation so it's not empty
            LOOP.totalTime(CYCLE_DURATION + DURATION * 0.5);

            // --- Simplified Control Logic (No Page Scroll) ---
            
            const PLAYHEAD = { position: LOOP.totalTime() }; // Start at the current time
            const POSITION_WRAP = gsap.utils.wrap(0, LOOP.duration());

            // A tween to smoothly scrub the animation
            const SCRUB = gsap.to(PLAYHEAD, {
                position: 0,
                onUpdate: () => { LOOP.totalTime(POSITION_WRAP(PLAYHEAD.position)); },
                paused: true,
                duration: 0.5,
                ease: 'power2.out',
            });

            const SNAP = gsap.utils.snap(1 / BOXES.length);

            // Function to move the timeline to a new snapped position
            const goToPosition = (position) => {
                // We calculate the target time based on the cycle duration
                const NEW_POS = SNAP(position) * CYCLE_DURATION;
                SCRUB.vars.position = NEW_POS;
                SCRUB.invalidate().restart();
            };

            // Functions for button and key controls
            const NEXT = () => goToPosition(Math.round(LOOP.totalTime() / CYCLE_DURATION) - 1);
            const PREV = () => goToPosition(Math.round(LOOP.totalTime() / CYCLE_DURATION) + 1);
            
            const handleKeyDown = (event) => {
                if (event.code === 'ArrowLeft' || event.code === 'KeyA') NEXT();
                if (event.code === 'ArrowRight' || event.code === 'KeyD') PREV();
            };
            document.addEventListener('keydown', handleKeyDown);

            // Function for clicking on a specific box
            const handleBoxClick = (e) => {
                const BOX = e.target.closest('.box');
                if (BOX) {
                    const i = BOXES.indexOf(BOX);
                    // This finds the correct progress value to snap to the clicked box
                    const newPos = (i / BOXES.length) * LOOP.duration();
                    SCRUB.vars.position = newPos;
                    SCRUB.invalidate().restart();
                }
            };
            
            const boxesContainer = mainRef.current.querySelector('.boxes');
            boxesContainer.addEventListener('click', handleBoxClick);
            
            mainRef.current.querySelector('.next').addEventListener('click', NEXT);
            mainRef.current.querySelector('.prev').addEventListener('click', PREV);
            
            // Drag functionality
            Draggable.create('.drag-proxy', {
                type: 'x',
                trigger: '.box',
                onPress() { this.startOffset = LOOP.totalTime(); },
                onDrag() {
                    const newTime = this.startOffset + (this.startX - this.x) * 0.002;
                    LOOP.totalTime(POSITION_WRAP(newTime));
                },
                onDragEnd() {
                    goToPosition(LOOP.totalTime() / CYCLE_DURATION);
                },
            });

            // Return a cleanup function to remove all event listeners
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                boxesContainer?.removeEventListener('click', handleBoxClick);
            }
            
        }, mainRef);

        // This is the main cleanup from GSAP's context
        return () => ctx.revert();
    }, []);

    return (
        <section ref={mainRef} className="music-choice-container">
            <h2 className="music-section-title">[ A_PEEK_INTO_MY_PLAYLIST ]</h2>
            <div className="boxes">
                import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

// IMPORTANT: Register the GSAP plugins
gsap.registerPlugin(ScrollTrigger, Draggable);

// The list of album covers
const COVERS = [
  "https://i.scdn.co/image/ab67616d00001e020ecc8c4fd215d9eb83cbfdb3",
  "https://i.scdn.co/image/ab67616d00001e02d9194aa18fa4c9362b47464f",
  "https://i.scdn.co/image/ab67616d00001e02a7ea08ab3914c5fb2084a8ac",
  "https://i.scdn.co/image/ab67616d00001e0213ca80c3035333e5a6fcea59",
  "https://i.scdn.co/image/ab67616d00001e02df04e6071763615d44643725",
  "https://i.scdn.co/image/ab67616d00001e0239c7302c04f8d06f60e14403",
  "https://i.scdn.co/image/ab67616d00001e021c0bcf8b536295438d26c70d",
  "https://i.scdn.co/image/ab67616d00001e029bbd79106e510d13a9a5ec33",
  "https://i.scdn.co/image/ab67616d00001e021d97ca7376f835055f828139",
  "https://www.udiscovermusic.com/wp-content/uploads/2015/10/Kanye-West-Yeezus.jpg",
];

export default function MusicChoiceSection() {
    const mainRef = useRef(null);

    useEffect(() => {
        // Scope all GSAP selectors to the component's main ref for safety
        const ctx = gsap.context(() => {

            // Initial setup for the elements
            gsap.set('.box', { yPercent: -50, display: 'block' });
            gsap.set('button', { z: 200 });

            const STAGGER = 0.1;
            const DURATION = 1;
            const BOXES = gsap.utils.toArray('.box');

            // The main animation loop for the carousel
            const LOOP = gsap.timeline({
                paused: true,
                repeat: -1,
                ease: 'none',
            });
            
            // This creates the continuous stream of boxes for the loop
            const SHIFTS = [...BOXES, ...BOXES, ...BOXES];

            // Define the animation for a single box
            SHIFTS.forEach((BOX, index) => {
                const BOX_TL = gsap.timeline()
                    .set(BOX, { xPercent: 250, rotateY: -50, opacity: 0, scale: 0.5 })
                    .to(BOX, { opacity: 1, scale: 1, duration: 0.1 }, 0)
                    .to(BOX, { opacity: 0, scale: 0.5, duration: 0.1 }, 0.9)
                    .fromTo(BOX, { xPercent: 250 }, { xPercent: -350, duration: 1, immediateRender: false, ease: 'power1.inOut' }, 0)
                    .fromTo(BOX, { rotateY: -50 }, { rotateY: 50, immediateRender: false, duration: 1, ease: 'power4.inOut' }, 0)
                    .to(BOX, { z: 100, scale: 1.25, duration: 0.1, repeat: 1, yoyo: true }, 0.4)
                    .fromTo(BOX, { zIndex: 1 }, { zIndex: BOXES.length, repeat: 1, yoyo: true, ease: 'none', duration: 0.5, immediateRender: false }, 0);
                LOOP.add(BOX_TL, index * STAGGER);
            });

            const CYCLE_DURATION = STAGGER * BOXES.length;
            
            // Set a default start time for the animation so it's not empty
            LOOP.totalTime(CYCLE_DURATION + DURATION * 0.5);

            // --- Simplified Control Logic (No Page Scroll) ---
            
            const PLAYHEAD = { position: LOOP.totalTime() }; // Start at the current time
            const POSITION_WRAP = gsap.utils.wrap(0, LOOP.duration());

            // A tween to smoothly scrub the animation
            const SCRUB = gsap.to(PLAYHEAD, {
                position: 0,
                onUpdate: () => { LOOP.totalTime(POSITION_WRAP(PLAYHEAD.position)); },
                paused: true,
                duration: 0.5,
                ease: 'power2.out',
            });

            const SNAP = gsap.utils.snap(1 / BOXES.length);

            // Function to move the timeline to a new snapped position
            const goToPosition = (position) => {
                // We calculate the target time based on the cycle duration
                const NEW_POS = SNAP(position) * CYCLE_DURATION;
                SCRUB.vars.position = NEW_POS;
                SCRUB.invalidate().restart();
            };

            // Functions for button and key controls
            const NEXT = () => goToPosition(Math.round(LOOP.totalTime() / CYCLE_DURATION) - 1);
            const PREV = () => goToPosition(Math.round(LOOP.totalTime() / CYCLE_DURATION) + 1);
            
            const handleKeyDown = (event) => {
                if (event.code === 'ArrowLeft' || event.code === 'KeyA') NEXT();
                if (event.code === 'ArrowRight' || event.code === 'KeyD') PREV();
            };
            document.addEventListener('keydown', handleKeyDown);

            // Function for clicking on a specific box
            const handleBoxClick = (e) => {
                const BOX = e.target.closest('.box');
                if (BOX) {
                    const i = BOXES.indexOf(BOX);
                    // This finds the correct progress value to snap to the clicked box
                    const newPos = (i / BOXES.length) * LOOP.duration();
                    SCRUB.vars.position = newPos;
                    SCRUB.invalidate().restart();
                }
            };
            
            const boxesContainer = mainRef.current.querySelector('.boxes');
            boxesContainer.addEventListener('click', handleBoxClick);
            
            mainRef.current.querySelector('.next').addEventListener('click', NEXT);
            mainRef.current.querySelector('.prev').addEventListener('click', PREV);
            
            // Drag functionality
            Draggable.create('.drag-proxy', {
                type: 'x',
                trigger: '.box',
                onPress() { this.startOffset = LOOP.totalTime(); },
                onDrag() {
                    const newTime = this.startOffset + (this.startX - this.x) * 0.002;
                    LOOP.totalTime(POSITION_WRAP(newTime));
                },
                onDragEnd() {
                    goToPosition(LOOP.totalTime() / CYCLE_DURATION);
                },
            });

            // Return a cleanup function to remove all event listeners
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                boxesContainer?.removeEventListener('click', handleBoxClick);
            }
            
        }, mainRef);

        // This is the main cleanup from GSAP's context
        return () => ctx.revert();
    }, []);

    return (
        <section ref={mainRef} className="music-choice-container">
            <h2 className="music-section-title">[ A_PEEK_INTO_MY_PLAYLIST ]</h2>
            <div className="boxes">
                {COVERS.map((cover, index) => (
                    <div key={index} className="box" style={{ '--src': `url(${cover})` }}>
                        <Image src={cover} alt={`Album cover ${index + 1}`} width={200} height={200} />
                    </div>
                ))}
                <div className="controls">
                    <button className="next">
                        <span>Previous album</span>
                        <svg viewBox="0 0 448 512" width="100" title="Previous Album">
                            <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                        </svg>
                    </button>
                    <button className="prev">
                        <span>Next album</span>
                        <svg viewBox="0 0 448 512" width="100" title="Next Album">
                            <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="drag-proxy"></div>
        </section>
    );
}

// ...

                {COVERS.map((cover, index) => (
                    <div key={index} className="box" style={{ '--src': `url(${cover})` }}>
                        <Image src={cover} alt={`Album cover ${index + 1}`} width={200} height={200} />
                    </div>
                ))}
                <div className="controls">
                    <button className="next">
                        <span>Previous album</span>
                        <svg viewBox="0 0 448 512" width="100" title="Previous Album">
                            <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                        </svg>
                    </button>
                    <button className="prev">
                        <span>Next album</span>
                        <svg viewBox="0 0 448 512" width="100" title="Next Album">
                            <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="drag-proxy"></div>
        </section>
    );
}