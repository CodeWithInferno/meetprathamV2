'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Subtle noise texture overlay
const NoiseTexture = () => (
  <svg className="fixed inset-0 w-full h-full opacity-[0.015] pointer-events-none z-10">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

// Smooth cursor follower
const CursorGradient = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div 
      className="fixed w-[800px] h-[800px] rounded-full pointer-events-none opacity-10 blur-3xl z-0"
      style={{
        background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 50%)',
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
    />
  );
};

// Animated text reveal
const AnimatedText = ({ text, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.span
        className="block"
        variants={{
          hidden: { y: "100%" },
          visible: { y: 0 }
        }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

// Parallax image wrapper
const ParallaxImage = ({ src, alt, className = "", offset = 50 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y }}
        className="relative h-full w-full scale-110"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </motion.div>
    </div>
  );
};

export default function MinimalModernPortfolio({ 
  projects = [], 
  education = {}, 
  researchExperience = [], 
  leadershipAndAwards = [], 
  technicalSkills = [], 
  socialLinks = {} 
}) {
  const containerRef = useRef(null);
  const projectsRef = useRef(null);
  const { scrollY, scrollYProgress } = useScroll();
  const [activeProject, setActiveProject] = useState(0);
  const [time, setTime] = useState(new Date());

  // Parallax effects with different speeds
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.3]);

  // Smooth horizontal scroll for projects
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const xSpring = useSpring(x, { damping: 50, stiffness: 400 });

  // Update time
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Progress bar
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] text-[#fafafa] min-h-screen relative">
      <NoiseTexture />
      <CursorGradient />

      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[1px] bg-white/20 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Ultra minimal nav with scroll opacity */}
      <motion.nav 
        className="fixed top-0 w-full z-40 mix-blend-difference"
        style={{ opacity }}
      >
        <div className="flex justify-between items-center p-8">
          <motion.div 
            className="text-xs font-light tracking-[0.3em] uppercase"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Pratham Patel
          </motion.div>
          <motion.div 
            className="text-xs font-light tabular-nums"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            {time.toLocaleTimeString('en-US', { hour12: false })}
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero with layered parallax text */}
      <section className="h-screen flex items-center px-8 md:px-16 lg:px-32 relative overflow-hidden">
        <motion.div className="absolute inset-0 opacity-5" style={{ y: y3 }}>
          <div className="text-[20vw] font-extralight leading-none text-center mt-32">
            CREATE
          </div>
        </motion.div>

        <div className="max-w-7xl w-full relative z-10">
          <motion.div style={{ y: y1 }}>
            <h1 className="text-[clamp(3rem,8vw,8rem)] leading-[0.85] font-extralight">
              <AnimatedText text="I craft" delay={0} />
              <AnimatedText text="intelligence" className="font-normal ml-[10vw]" delay={0.1} />
              <AnimatedText text="into experiences" className="italic ml-[5vw]" delay={0.2} />
            </h1>
          </motion.div>
          
          <motion.div 
            className="mt-16 flex gap-8 text-sm font-light"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              { label: 'Currently', value: 'CS @ Gannon University' },
              { label: 'Focus', value: 'AI/ML Engineering' },
              { label: 'Location', value: 'Erie, PA' }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <div className="text-[#666]">{item.label}</div>
                <div>{item.value}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs text-[#666]"
            >
              Scroll to explore
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Work - Draggable carousel */}
      <section className="py-32 overflow-hidden">
        <motion.div 
          className="px-8 md:px-16 lg:px-32 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <AnimatedText 
            text="Selected Work" 
            className="text-xs font-light tracking-[0.3em] uppercase text-[#666]" 
          />
        </motion.div>
        
        <motion.div
          ref={projectsRef}
          className="relative cursor-grab active:cursor-grabbing"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            className="flex gap-8 px-8 md:px-16 lg:px-32"
            style={{ x: xSpring }}
            drag="x"
            dragConstraints={{
              left: -(projects.length - 1) * 600,
              right: 0
            }}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          >
            {projects.map((project, i) => (
              <motion.div
                key={project._id}
                className="min-w-[80vw] md:min-w-[600px] select-none"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: i * 0.1,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
                viewport={{ once: true, amount: 0.5 }}
                onHoverStart={() => !isDragging && setActiveProject(i)}
              >
                <motion.div 
                  className="relative aspect-[16/10] overflow-hidden bg-[#111] rounded-sm"
                  whileHover={{ scale: isDragging ? 1 : 1.02 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover opacity-60"
                    draggable={false}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: isDragging ? 0.8 : 0.6 }}
                  />
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <AnimatedText 
                      text={project.title} 
                      className="text-4xl font-light mb-3"
                      delay={0.2}
                    />
                    <motion.p 
                      className="text-sm text-[#999] max-w-md"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {project.description}
                    </motion.p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex justify-between items-center mt-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <span className="text-xs text-[#666]">{String(i + 1).padStart(2, '0')}</span>
                  <motion.a 
                    href={project.gitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs hover:text-white transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    View Source →
                  </motion.a>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Carousel indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {projects.map((_, i) => (
              <motion.div
                key={i}
                className={`h-[1px] bg-white/20 transition-all duration-500 ${
                  activeProject === i ? 'w-12' : 'w-6'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Experience - Timeline with staggered animations */}
      <section className="py-32 px-8 md:px-16 lg:px-32">
        <AnimatedText 
          text="Experience" 
          className="text-xs font-light tracking-[0.3em] uppercase text-[#666] mb-16" 
        />
        
        <motion.div className="max-w-4xl" style={{ y: y2 }}>
          {researchExperience.map((exp, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#222]"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{ originY: 0 }}
              />
              
              <div className="pl-8 pb-20 last:pb-0">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: i * 0.2,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="absolute -left-[0.2rem] w-2 h-2 bg-[#fafafa] rounded-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                  />
                  
                  <AnimatedText 
                    text={exp.date} 
                    className="text-xs text-[#666] mb-3"
                    delay={0.1}
                  />
                  <AnimatedText 
                    text={exp.role} 
                    className="text-3xl font-light mb-2"
                    delay={0.2}
                  />
                  <AnimatedText 
                    text={exp.company} 
                    className="text-sm text-[#999] mb-6"
                    delay={0.3}
                  />
                  
                  <motion.ul className="space-y-3">
                    {exp.points?.map((point, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: i * 0.2 + j * 0.1 + 0.4,
                          duration: 0.6
                        }}
                        viewport={{ once: true }}
                        className="text-sm text-[#ccc] leading-relaxed pl-4 border-l border-[#333]"
                      >
                        {point}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Skills - Grid with hover effects */}
      <section className="py-32 px-8 md:px-16 lg:px-32 bg-[#050505]">
        <AnimatedText 
          text="Capabilities" 
          className="text-xs font-light tracking-[0.3em] uppercase text-[#666] mb-16" 
        />
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 max-w-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {technicalSkills.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs text-[#666] mb-6 tracking-wider">{category.category}</h3>
              <ul className="space-y-3">
                {category.skills.map((skill, j) => (
                  <motion.li 
                    key={j}
                    className="text-sm relative overflow-hidden group cursor-default"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + j * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="relative z-10">{skill}</span>
                    <motion.div
                      className="absolute inset-0 bg-white/5"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Recognition with reveal animations */}
      <section className="py-32 px-8 md:px-16 lg:px-32">
        <AnimatedText 
          text="Recognition" 
          className="text-xs font-light tracking-[0.3em] uppercase text-[#666] mb-16" 
        />
        
        <div className="space-y-12 max-w-4xl">
          {leadershipAndAwards.map((award, i) => (
            <motion.div
              key={i}
              className="group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="flex justify-between items-start border-b border-[#222] pb-6 group-hover:border-[#444] transition-colors duration-500"
              >
                <div className="flex-1">
                  <AnimatedText 
                    text={award.title} 
                    className="text-2xl font-light mb-2"
                    delay={0.1}
                  />
                  <motion.p 
                    className="text-sm text-[#999]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.15 + 0.2 }}
                    viewport={{ once: true }}
                  >
                    {award.description}
                  </motion.p>
                </div>
                <motion.span 
                  className="text-xs text-[#666] tabular-nums ml-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {award.date}
                </motion.span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact - Full screen with parallax */}
      <section className="h-screen flex items-center justify-center px-8 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-5"
          style={{ y: y3 }}
        >
          <div className="text-[30vw] font-extralight leading-none text-center">
            HELLO
          </div>
        </motion.div>

        <div className="text-center relative z-10">
          <motion.h2 
            className="text-[clamp(2rem,6vw,6rem)] font-extralight mb-12 leading-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <AnimatedText text="Let's create" />
            <AnimatedText text="something" className="font-normal" delay={0.1} />
          </motion.h2>
          
          <motion.div 
            className="flex gap-8 justify-center text-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { label: 'Email', href: 'mailto:prathambiren2618@gmail.com' },
              { label: 'GitHub', href: socialLinks.github },
              { label: 'LinkedIn', href: socialLinks.linkedin }
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="relative overflow-hidden group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <span className="relative z-10">{link.label}</span>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer with fade in */}
      <motion.footer 
        className="px-8 py-8 text-xs text-[#666] flex justify-between"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div>© {new Date().getFullYear()}</div>
        <div>Built with intention</div>
      </motion.footer>

      <style jsx global>{`
        ::selection {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        ::-webkit-scrollbar {
          width: 0;
          height: 0;
        }

        * {
          cursor: none;
        }

        a, button {
          cursor: none;
        }
      `}</style>
    </div>
  );
}