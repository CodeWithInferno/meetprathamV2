// src/app/Components/summary/client.js
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { FiGithub, FiLinkedin, FiTwitter, FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import { 
  Cloud,
  Cpu,
  Database,
  GitBranch,
  Github,
  Server,
  Terminal,
  Code,
  FileJson,
  Rocket,
  Bot,
  BrainCircuit,
  Component,
  Download
} from 'lucide-react';


gsap.registerPlugin(ScrollTrigger, TextPlugin);

const skills = [
  { name: 'Python', icon: <Code size={32} /> },
  { name: 'JavaScript', icon: <FileJson size={32} /> },
  { name: 'Git', icon: <GitBranch size={32} /> },
  { name: 'GitHub', icon: <Github size={32} /> },
  { name: 'Docker', icon: <Server size={32} /> },
  { name: 'React', icon: <Component size={32} /> },
  { name: 'Next.js', icon: <Rocket size={32} /> },
  { name: 'PyTorch', icon: <BrainCircuit size={32} /> },
  { name: 'TensorFlow', icon: <Bot size={32} /> },
  { name: 'SQL', icon: <Database size={32} /> },
  { name: 'AWS', icon: <Cloud size={32} /> },
  { name: 'Linux', icon: <Terminal size={32} /> },
];

const SkillsShowcase = () => {
  const [hovered, setHovered] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef(null);

  const handleMouseMove = (e) => {
    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <div
      ref={gridRef}
      className="relative grid grid-cols-4 gap-6 p-6 border border-neutral-800 rounded-lg"
      onMouseMove={handleMouseMove}
    >
      {skills.map((skill, i) => (
        <div
          key={i}
          className="relative flex flex-col items-center justify-center p-4 rounded-md transition-colors duration-300"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="text-neutral-400 group-hover:text-white transition-colors duration-300">
            {skill.icon}
          </div>
          <AnimatePresence>
            {hovered === i && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full mb-2 px-2 py-1 text-xs bg-neutral-800 text-white rounded-md"
              >
                {skill.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1), transparent 30%)`,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
      />
    </div>
  );
};

const artisticImages = [
  '/Warp-1.jpg',
  '/Facets-1.jpg',
  '/Dragon Red.jpg',
  '/Deep Purple.jpg',
  '/River Blue.jpg',
];

const ArtBackground = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % artisticImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={artisticImages[index]}
            alt="Artistic Background"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};


export default function SummaryClientPage({ projects, education, researchExperience, leadershipAndAwards, technicalSkills, socialLinks }) {
  const main = useRef();

  useGSAP(() => {
    const splitText = (selector) => {
      const elem = document.querySelector(selector);
      if (!elem) return;
      const text = elem.innerText;
      elem.innerHTML = '';
      text.split('').forEach(char => {
        const span = document.createElement('span');
        span.className = 'char';
        span.style.display = 'inline-block';
        span.textContent = char === ' ' ? ' ' : char;
        elem.appendChild(span);
      });
      return elem.querySelectorAll('.char');
    };

    const heroTl = gsap.timeline({ delay: 0.2 });
    const heroTitleChars = splitText('.hero-title');
    const heroSubtitleChars = splitText('.hero-subtitle');

    heroTl
      .from(heroTitleChars, { y: 100, opacity: 0, stagger: 0.05, duration: 1, ease: 'power4.out' })
      .from(heroSubtitleChars, { y: 80, opacity: 0, stagger: 0.03, duration: 0.8, ease: 'power4.out' }, "-=0.8")
      .from('.hero-p', { opacity: 0, y: 40, duration: 1, ease: 'power3.out' }, "-=0.6")
      .from('.hero-buttons', { opacity: 0, y: 40, duration: 1, ease: 'power3.out' }, "-=0.5")
      .from('.scroll-indicator', { opacity: 0, y: 20, duration: 1 }, "-=0.5");

    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.from(title, {
        opacity: 0, y: 60, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: title, start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    });

    gsap.utils.toArray('.timeline-line').forEach(line => {
        gsap.to(line, {
            scaleY: 1, ease: 'none',
            scrollTrigger: {
                trigger: line.parentElement,
                start: 'top top+=100',
                end: 'bottom bottom',
                scrub: true,
            }
        });
    });

    gsap.utils.toArray('.timeline-item').forEach(item => {
      gsap.from(item, {
        opacity: 0, x: -100, duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    });

    gsap.utils.toArray('.project-item').forEach(item => {
      const image = item.querySelector('.project-image');
      const content = item.querySelector('.project-content');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: item, start: 'top 75%', toggleActions: 'play none none reverse' }
      });
      tl.from(item, { opacity: 0, y: 100, duration: 1, ease: 'power3.out' })
        .from(image, { scale: 1.1, duration: 1.5, ease: 'power3.out' }, 0)
        .from(content.children, { opacity: 0, y: 30, stagger: 0.1, duration: 0.8, ease: 'power2.out' }, '-=1');
    });

    gsap.utils.toArray('.skill-item').forEach((item, i) => {
      gsap.from(item, {
        opacity: 0, scale: 0.8, y: 50, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: item, start: 'top 95%', toggleActions: 'play none none reverse' },
        delay: (i % 5) * 0.05,
      });
    });

    gsap.from('.footer-content > *', {
      opacity: 0, y: 50, stagger: 0.2, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.footer-content', start: 'top 85%' }
    });

  }, { scope: main });

  return (
    <div ref={main} className="bg-black text-white font-sans antialiased">
      <ArtBackground />
      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* --- HERO --- */}
        <section className="h-screen w-full flex flex-col justify-center items-start relative text-left">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
            <span className="hero-title block pb-2">Pratham Patel</span>
            <span className="hero-subtitle block text-neutral-500">Digital Curriculum Vitae</span>
          </h1>
          <p className="hero-p text-lg md:text-xl text-neutral-400 mt-8 max-w-2xl">
            A comprehensive overview of my technical skills, professional experience, and key projects in the fields of AI and Machine Learning.
          </p>
          <div className="hero-buttons mt-8 flex gap-4">
            <Link href="/home" className="inline-block bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-transform hover:scale-105 duration-300 ease-in-out">
              Explore Full Site
            </Link>
            <button 
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="inline-block bg-neutral-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-neutral-700 transition-colors duration-300 ease-in-out"
            >
              Or Just Scroll
            </button>
          </div>
          <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500">
            <span className="font-mono text-xs">SCROLL</span>
            <motion.svg
              className="w-6 h-6 text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </div>
        </section>

        {/* --- EDUCATION --- */}
        <section className="py-24 md:py-32 glass-section">
            <h2 className="section-title text-4xl md:text-5xl font-bold mb-12">Education</h2>
            <div className="timeline-item">
                <h3 className="text-2xl md:text-3xl font-bold">{education.degree}</h3>
                <p className="text-lg text-yellow-400 mb-2">{education.university}</p>
                <p className="text-sm text-neutral-500 mb-4">{education.date}</p>
                <div className="flex flex-wrap gap-2">
                    {education.courses.map(course => <span key={course} className="bg-neutral-800 border border-neutral-700 text-sm py-1 px-3 rounded">{course}</span>)}
                </div>
            </div>
        </section>

        {/* --- RESEARCH EXPERIENCE --- */}
        <section className="py-24 md:py-32 glass-section">
            <h2 className="section-title text-4xl md:text-5xl font-bold mb-16">Research Experience</h2>
            <div className="relative">
                <div className="timeline-line absolute top-0 left-0 w-0.5 bg-neutral-800 h-full origin-top transform-none"></div>
                <div className="space-y-16">
                    {researchExperience.map(exp => (
                        <div key={exp.role} className="timeline-item relative pl-10">
                            <div className="absolute -left-1.5 top-1 w-4 h-4 bg-yellow-400 rounded-full border-4 border-black"></div>
                            <h3 className="text-2xl md:text-3xl font-bold">{exp.role}</h3>
                            <p className="text-lg text-neutral-400 mb-2">{exp.company}</p>
                            <p className="text-sm text-neutral-500 mb-4">{exp.date}</p>
                            <ul className="list-disc pl-5 space-y-2 text-neutral-400">
                                {exp.points.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* --- LEADERSHIP & AWARDS --- */}
        <section className="py-24 md:py-32 glass-section">
            <h2 className="section-title text-4xl md:text-5xl font-bold mb-16">Leadership & Awards</h2>
            <div className="relative">
                <div className="timeline-line absolute top-0 left-0 w-0.5 bg-neutral-800 h-full origin-top transform-none"></div>
                <div className="space-y-16">
                    {leadershipAndAwards.map(award => (
                        <div key={award.title} className="timeline-item relative pl-10">
                            <div className="absolute -left-1.5 top-1 w-4 h-4 bg-yellow-400 rounded-full border-4 border-black"></div>
                            <h3 className="text-2xl md:text-3xl font-bold">{award.title}</h3>
                            <p className="text-sm text-neutral-500 mb-2">{award.date}</p>
                            <p className="text-neutral-400">{award.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- PROJECTS --- */}
        <section className="py-24 md:py-32 glass-section">
            <h2 className="section-title text-4xl md:text-5xl font-bold mb-16">Featured Projects</h2>
            <div className="space-y-24">
                {projects.map((project) => (
                  <div key={project._id} className="project-item grid md:grid-cols-5 gap-8 md:gap-12 items-center">
                    <div className="md:col-span-3 project-image rounded-lg overflow-hidden aspect-video">
                      <Image src={project.imageUrl} alt={project.title} width={1600} height={900} className="w-full h-full object-cover" />
                    </div>
                    <div className="md:col-span-2 project-content">
                      <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                      <p className="text-neutral-400 mb-6">{project.description}</p>
                      <a href={project.gitLink} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 font-bold inline-flex items-center group">
                        Explore Project <FiExternalLink className="ml-2 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                ))}
            </div>
        </section>

        {/* --- SKILLS --- */}
        <section className="py-24 md:py-32 glass-section">
            <h2 className="section-title text-4xl md:text-5xl font-bold mb-16 text-center">Technical Toolkit</h2>
            <SkillsShowcase />
        </section>

        {/* --- RESUME --- */}
        <section className="py-24 md:py-32 text-center">
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-6">Interested? Let&apos;s Connect.</h2>
          <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
            I&apos;m always open to discussing new research, projects, or opportunities. Download my full resume to see more.
          </p>
          <a
            href="/resume/Resume-12.pdf"
            download
            className="inline-flex items-center gap-3 bg-yellow-400 text-black font-bold text-xl py-4 px-8 rounded-lg hover:bg-yellow-300 transition-transform hover:scale-105 duration-300 ease-in-out"
          >
            <Download size={24} />
            Download My Resume
          </a>
        </section>

        {/* --- FOOTER --- */}
        <footer className="text-center py-24">
          <div className="footer-content">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready for the Full Experience?</h2>
            <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
                This was a snapshot. The main site is a living playground of projects, articles, and wild experiments.
            </p>
            <Link href="/home" className="inline-block bg-yellow-400 text-black font-bold text-xl py-4 px-8 rounded-lg hover:bg-yellow-300 transition-transform hover:scale-105 duration-300 ease-in-out">
                Explore Full Website
            </Link>
            <div className="flex justify-center gap-8 text-neutral-500 mt-16">
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><FiGithub size={24} /></a>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><FiLinkedin size={24} /></a>
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><FiTwitter size={24} /></a>
            </div>
            <p className="text-neutral-600 mt-8 text-sm">&copy; {new Date().getFullYear()} Pratham Patel. Crafted with GSAP.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}