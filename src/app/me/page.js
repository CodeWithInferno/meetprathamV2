// // app/me/page.jsx
// 'use client';

// import React, { useRef, useEffect } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Link from 'next/link';

// gsap.registerPlugin(ScrollTrigger);

// // EXPANDED DATA STRUCTURE for the new sections
// const workbenchData = {
//   timeline: [
//     { year: '2019', event: 'Began my odyssey into the world of code, starting with Python.' },
//     { year: '2021', event: 'Architected my first major AI-driven data analysis platform.' },
//     { year: '2023', event: 'Ventured into the frontiers of Web3 and Generative AI.' },
//   ],
//   skills: ['React', 'Next.js', 'Python', 'TensorFlow', 'GSAP', 'Solidity', 'Figma', 'PostgreSQL'],
//   research: [
//     { title: "Decentralized Identity Models", abstract: "A study on self-sovereign identity using blockchain to enhance user privacy and control.", concepts: ["Zero-Knowledge Proofs", "DID Schemas"] },
//     { title: "Generative Adversarial Networks for Art", abstract: "Exploring the use of GANs to create novel artistic styles by training on diverse historical datasets.", concepts: ["StyleGAN2", "Latent Space Exploration"] },
//   ],
//   personal: {
//     thought: "I believe technology should be a canvas for creativity and a tool for empowerment. This space is a reflection of that journey.",
//   }
// };

// export default function MePage() {
//   const mainRef = useRef(null);
//   const transformRef = useRef(null);
//   const heroRef = useRef(null);
//   const workbenchRef = useRef(null);

//   useEffect(() => {
//     // Parallax effect for the background SVG on mouse move
//     const handleMouseMove = (e) => {
//         if (window.innerWidth < 1024) return;
//         const { clientX, clientY } = e;
//         const x = (clientX / window.innerWidth - 0.5) * 40;
//         const y = (clientY / window.innerHeight - 0.5) * 40;
//         gsap.to('.hero-bg-svg', { x, y, duration: 1, ease: 'power2.out' });
//     };
//     window.addEventListener('mousemove', handleMouseMove);

//     const timeline = gsap.timeline({
//       scrollTrigger: {
//         trigger: mainRef.current,
//         start: 'top top',
//         end: '+=600%', // Increased for more content
//         pin: true,
//         scrub: 1.5,
//         // markers: true,
//       },
//     });

//     timeline.to(heroRef.current, { autoAlpha: 0, duration: 1, ease: 'power2.in' })
//       .to(transformRef.current, {
//         duration: 4,
//         rotationX: -90,
//         z: '-10vh',
//         ease: 'expo.inOut',
//       }, 0.5)
//       .to(workbenchRef.current, {
//         x: () => -(workbenchRef.current.scrollWidth - document.documentElement.clientWidth),
//         ease: 'none',
//         duration: 10,
//       }, "<1.5");

//     return () => {
//       timeline.kill();
//       ScrollTrigger.getAll().forEach(st => st.kill());
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   return (
//     <main className='bg-black'>
//       <div ref={mainRef} className="main-container h-screen overflow-hidden">
//         <div ref={transformRef} className="transform-container w-full h-full">

//           <div ref={heroRef} className="hero-layer">
//             <div className="absolute inset-0 opacity-10 hero-bg-svg">
//               <img src="/images/make-a-sag-of-white-colored-waves-with-transparent-bg-make-it-ja.svg" alt="background wave" className="w-full h-full object-cover" />
//             </div>
//             <div className="relative text-center">
//               <h1 className="text-6xl md:text-8xl font-mono uppercase">Pratham Patel</h1>
//               <p className="blinking-text text-xl md:text-2xl font-mono mt-8">[ EXPLORE_THE_WORKBENCH ]</p>
//             </div>
//           </div>

//           <div className="workbench-layer">
//             <div ref={workbenchRef} className="workbench-track">
              
//               {/* Zone 1: Centered Timeline & Integrated Toolkit */}
//               <div className="workbench-zone combined-zone">
//                 {/* The Timeline "Spine" */}
//                 <div className="timeline-spine">
//                   <div className="timeline-line-center" />
//                   {workbenchData.timeline.map((item, i) => (
//                     <div key={i} className="timeline-item-center" style={{ left: `${15 + i * 25}%` }}>
//                       <div className={`timeline-connector ${i % 2 === 0 ? 'top' : 'bottom'}`} />
//                       <div className={`timeline-content-center ${i % 2 === 0 ? 'top' : 'bottom'}`}>
//                         <span className="font-bold">{item.year}</span>: {item.event}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 {/* The Integrated Toolkit "Foundation" */}
//                 <div className="toolkit-foundation">
//                   <h2 className='toolkit-title'>[ TOOLKIT ]</h2>
//                   <div className="toolkit-grid">
//                      {workbenchData.skills.map((skill, i) => <div key={i} className="skill-item" style={{'--delay': `${i * 0.05}s`}}>{skill}</div>)}
//                   </div>
//                 </div>
//               </div>

//               {/* Zone 2: Research Showcase */}
//               <div className="workbench-zone research-zone">
//                 {workbenchData.research.map((item, i) => (
//                     <div key={i} className="blueprint-card" style={{top: i === 0 ? '15%' : '55%', left: `${10 + i * 15}%`, transform: `rotate(${i === 0 ? -2 : 3}deg)`}}>
//                         <h3 className='blueprint-title'>{item.title}</h3>
//                         <p className='blueprint-abstract'>{item.abstract}</p>
//                         <div className="blueprint-annotations">
//                             <div className="annotation-line" style={{width: '20%', top: '60%', left: '-15%'}} />
//                             <span className="annotation-text" style={{top: '56%', left: '-35%'}}>{item.concepts[0]}</span>
//                             <div className="annotation-line" style={{width: '30%', top: '80%', left: '85%'}}/>
//                             <span className="annotation-text" style={{top: '76%', left: '118%'}}>{item.concepts[1]}</span>
//                         </div>
//                     </div>
//                 ))}
//               </div>

//               {/* Zone 3: Personal Desk */}
//               <div className="workbench-zone personal-zone">
//                 <div className="personal-note">
//                     <p>"{workbenchData.personal.thought}"</p>
//                 </div>
//                 <Link href="/aboutme" legacyBehavior>
//                     <a className="portal-button">[ PEEK_INTO_MY_LIFE ]</a>
//                 </Link>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//       <div style={{ height: '600vh' }} /> {/* Spacer for pinning */}
//     </main>
//   );
// }

'use client';

// app/me/page.jsx
import HeroSection from '@/app/Components/me/HeroSection';
import PeekSection from '@/app/Components/me/PeekSection';
import WorkbenchSection from '@/app/Components/me/WorkbenchSection';
import ResearchSection from '@/app/Components/me/ResearchSection';
import Footer from '@/app/Components/Reusable/Footer'; // Assuming this path
import Header from "@/app/Components/Reusable/Header"
import MusicChoiceSection from '@/app/Components/me/MusicChoiceSection'; // <-- Import it




export default function MePage() {
  return (
    <main className="bg-black">
      <Header />
      <HeroSection />
      <PeekSection />
      <div className="workbench-container">
        <WorkbenchSection />
      </div>
      <ResearchSection />
      <div className="music-container">
        <MusicChoiceSection />
      </div>
      <Footer />
    </main>
  );
}