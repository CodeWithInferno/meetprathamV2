// app/me/ResearchSection.jsx
'use client';

import React, { useRef } from 'react';
// We can comment these out for now since we're not using them
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

const researchData = [
  { title: "Decentralized Identity Models", abstract: "A study on self-sovereign identity using blockchain to enhance user privacy and control.", concepts: ["Zero-Knowledge Proofs", "DID Schemas"] },
  { title: "Generative Adversarial Networks for Art", abstract: "Exploring the use of GANs to create novel artistic styles by training on diverse historical datasets.", concepts: ["StyleGAN2", "Latent Space Exploration"] },
  { title: "AI-Assisted Code Refactoring", abstract: "Applying Large Language Models to analyze and suggest improvements for legacy codebases, improving maintainability.", concepts: ["AST Analysis", "Fine-Tuning"] },
];

export default function ResearchSection() {
    const sectionRef = useRef(null);

    // ==========================================================
    // <<< THE FIX: THE ENTIRE ANIMATION LOGIC IS COMMENTED OUT >>>
    // ==========================================================
    /*
    useEffect(() => {
        const ctx = gsap.context(() => {
            const blueprints = gsap.utils.toArray('.blueprint-card');
            gsap.from(blueprints, {
                autoAlpha: 0,
                y: 100,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);
    */
    // ==========================================================

  return (
    <section ref={sectionRef} className="relative bg-[#f0f0f0] py-24 px-8 workbench-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-mono uppercase text-center mb-16 text-black">[ RESEARCH_LOGS ]</h2>
        <div className="space-y-16">
          {researchData.map((item, i) => (
            <div key={i} className="blueprint-card vertical-layout"> 
              <h3 className='blueprint-title'>{item.title}</h3>
              <p className='blueprint-abstract'>{item.abstract}</p>
              <div className="blueprint-annotations">
                <div className="annotation-line" style={{width: '20%', top: '60%', left: '-15%'}} />
                <span className="annotation-text" style={{top: '56%', left: '-40%'}}>{item.concepts[0]}</span>
                <div className="annotation-line" style={{width: '30%', top: '80%', left: '85%'}}/>
                <span className="annotation-text" style={{top: '76%', left: '118%'}}>{item.concepts[1]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}