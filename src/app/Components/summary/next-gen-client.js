'use client';

import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Floating 3D Text Component
const Float3DText = ({ text, delay = 0 }) => {
  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, z: -1000 }}
      animate={{ 
        opacity: 1, 
        z: 0,
        y: [0, -20, 0],
        rotateY: [0, 360]
      }}
      transition={{
        opacity: { duration: 1, delay },
        z: { duration: 1, delay },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
        rotateY: { duration: 20, repeat: Infinity, ease: "linear", delay }
      }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <h3 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-600">
        {text}
      </h3>
    </motion.div>
  );
};

// Matrix rain effect
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 opacity-20" />;
};

// Liquid morph shape
const LiquidShape = ({ color, size, position }) => {
  return (
    <motion.div
      className="absolute rounded-full filter blur-xl"
      style={{
        background: color,
        width: size,
        height: size,
        left: position.x,
        top: position.y,
      }}
      animate={{
        x: [0, 100, -100, 0],
        y: [0, -100, 100, 0],
        scale: [1, 1.5, 0.8, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Interactive galaxy background
const GalaxyBackground = () => {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create spiral galaxy
    const galaxyGeometry = new THREE.BufferGeometry();
    const galaxyMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.005,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: true,
      vertexColors: true
    });

    const particlesCount = 20000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 5;
      const spinAngle = radius * 5;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2;

      const randomX = (Math.random() - 0.5) * 0.3;
      const randomY = (Math.random() - 0.5) * 0.3;
      const randomZ = (Math.random() - 0.5) * 0.3;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Color gradient
      const color = new THREE.Color();
      color.setHSL((radius / 5) * 0.5 + 0.5, 1, 0.5);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxy);

    camera.position.z = 3;

    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      
      galaxy.rotation.y += 0.001;
      
      camera.position.x = mouseRef.current.x * 0.5;
      camera.position.y = mouseRef.current.y * 0.5;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-20" />;
};

// DNA Helix for skills
const DNAHelix = ({ skills }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="relative w-full max-w-4xl h-[600px]">
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * Math.PI * 4;
          const x = Math.sin(angle) * 200;
          const y = (index / skills.length) * 500 - 250;
          const z = Math.cos(angle) * 200;
          const side = Math.cos(angle) > 0 ? 'right' : 'left';

          return (
            <motion.div
              key={skill}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: x,
                y: y,
                z: z,
                rotateY: angle * 180 / Math.PI,
              }}
              whileHover={{ scale: 1.5, z: z + 100 }}
              onHoverStart={() => setHoveredSkill(skill)}
              onHoverEnd={() => setHoveredSkill(null)}
            >
              <div
                className={`
                  px-6 py-3 rounded-full cursor-pointer
                  ${hoveredSkill === skill ? 'bg-yellow-400 text-black' : 'bg-black/50 text-white border border-yellow-400/50'}
                  backdrop-blur-md transform transition-all duration-300
                  ${side === 'right' ? 'translate-x-8' : '-translate-x-8'}
                `}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `translateZ(${z}px)`,
                }}
              >
                <span className="font-bold">{skill}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Time machine for experience
const TimeMachine = ({ experiences }) => {
  const [activeYear, setActiveYear] = useState(0);
  
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Rotating time rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-yellow-400/30"
            style={{
              width: `${ring * 200}px`,
              height: `${ring * 200}px`,
            }}
            animate={{ rotate: 360 * ring }}
            transition={{ duration: 20 / ring, repeat: Infinity, ease: "linear" }}
          />
        ))}
        
        {/* Center display */}
        <motion.div className="text-center z-10">
          <motion.h2 
            key={activeYear}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="text-8xl font-bold text-yellow-400"
          >
            {experiences[activeYear]?.date}
          </motion.h2>
          <motion.h3 
            key={`${activeYear}-role`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl text-white mt-4"
          >
            {experiences[activeYear]?.role}
          </motion.h3>
          <motion.p 
            key={`${activeYear}-company`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400 mt-2"
          >
            {experiences[activeYear]?.company}
          </motion.p>
        </motion.div>
        
        {/* Timeline navigation */}
        <div className="absolute bottom-10 flex gap-4">
          {experiences.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full ${activeYear === index ? 'bg-yellow-400' : 'bg-gray-600'}`}
              whileHover={{ scale: 1.5 }}
              onClick={() => setActiveYear(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Holographic project display
const HologramProject = ({ project, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
    >
      <motion.div
        className="relative w-80 h-80 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
      >
        {/* Hologram effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 to-transparent rounded-lg animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 to-transparent rounded-lg animate-pulse animation-delay-1000" />
        
        {/* Project image */}
        <div className="relative h-full w-full p-4">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={300}
            height={300}
            className="w-full h-full object-cover rounded-lg opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg" />
          
          {/* Floating title */}
          <motion.h3
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-2xl font-bold text-white"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {project.title}
          </motion.h3>
        </div>
        
        {/* Holographic grid lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,255,255,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      {/* Project modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="max-w-4xl w-full bg-black/80 border border-cyan-400/50 rounded-2xl p-8 backdrop-blur-xl"
              initial={{ scale: 0.5, rotateY: -180 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.5, rotateY: 180 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-4xl font-bold text-cyan-400 mb-4">{project.title}</h2>
              <p className="text-xl text-gray-300 mb-6">{project.description}</p>
              <a
                href={project.gitLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-cyan-400 text-black font-bold rounded-full hover:bg-cyan-300 transition-colors"
              >
                View on GitHub
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main component
export default function NextGenPortfolio({ 
  projects = [], 
  education = {}, 
  researchExperience = [], 
  leadershipAndAwards = [], 
  technicalSkills = [], 
  socialLinks = {} 
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [currentSection, setCurrentSection] = useState(0);

  // All skills flattened
  const allSkills = technicalSkills.flatMap(cat => cat.skills);

  // Scroll progress indicator
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setCurrentSection(Math.floor(scrollPercentage * 5));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-purple-600 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Matrix rain background */}
      <MatrixRain />

      {/* Galaxy background */}
      <GalaxyBackground />

      {/* Liquid shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <LiquidShape color="rgba(255, 204, 0, 0.1)" size="800px" position={{ x: '-20%', y: '-20%' }} />
        <LiquidShape color="rgba(147, 51, 234, 0.1)" size="600px" position={{ x: '80%', y: '60%' }} />
        <LiquidShape color="rgba(59, 130, 246, 0.1)" size="700px" position={{ x: '50%', y: '30%' }} />
      </div>

      {/* SECTION 1: Hero with floating 3D text */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="relative">
          {/* Floating name letters */}
          <div className="flex gap-8 justify-center mb-20">
            {['P', 'R', 'A', 'T', 'H', 'A', 'M'].map((letter, i) => (
              <Float3DText key={i} text={letter} delay={i * 0.1} />
            ))}
          </div>
          
          {/* Morphing role text */}
          <motion.div className="text-center mt-32">
            <motion.h2
              className="text-4xl font-light text-gray-300"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {['AI Architect', 'Code Alchemist', 'Digital Pioneer', 'Future Builder'][Math.floor(Date.now() / 3000) % 4]}
            </motion.h2>
          </motion.div>

          {/* Circular menu */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {['Projects', 'Skills', 'Journey', 'Connect'].map((item, i) => {
              const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(angle) * 200;
              const y = Math.sin(angle) * 200;
              
              return (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="absolute px-6 py-3 bg-black/50 backdrop-blur-md border border-yellow-400/50 rounded-full"
                  style={{ x, y }}
                  whileHover={{ scale: 1.2, backgroundColor: 'rgba(250, 204, 21, 0.8)' }}
                >
                  <span className="font-bold">{item}</span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: DNA Helix Skills */}
      <section id="skills" className="relative min-h-screen py-20">
        <h2 className="text-6xl font-bold text-center mb-20">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
            Skills DNA
          </span>
        </h2>
        <DNAHelix skills={allSkills} />
      </section>

      {/* SECTION 3: Time Machine Experience */}
      <section id="journey" className="relative min-h-screen">
        <h2 className="text-6xl font-bold text-center py-20">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
            Time Machine
          </span>
        </h2>
        <TimeMachine experiences={researchExperience} />
      </section>

      {/* SECTION 4: Holographic Projects */}
      <section id="projects" className="relative min-h-screen py-20">
        <h2 className="text-6xl font-bold text-center mb-20">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">
            Project Holograms
          </span>
        </h2>
        <div className="flex flex-wrap justify-center gap-12">
          {projects.map((project, i) => (
            <HologramProject key={project._id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* SECTION 5: Contact Portal */}
      <section id="connect" className="relative min-h-screen flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {/* Portal rings */}
          {[1, 2, 3, 4].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border-2 border-purple-400/50"
              style={{
                width: `${ring * 150}px`,
                height: `${ring * 150}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ rotate: -360 * ring }}
              transition={{ duration: 10 * ring, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </motion.div>

        <div className="relative z-10 text-center">
          <h2 className="text-6xl font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Enter the Portal
            </span>
          </h2>
          
          <div className="flex gap-8 justify-center">
            <motion.a
              href="mailto:prathambiren2618@gmail.com"
              className="px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full font-bold text-black"
              whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(168, 85, 247, 0.8)' }}
            >
              Email
            </motion.a>
            <motion.a
              href={socialLinks.github}
              target="_blank"
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full font-bold text-black"
              whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(34, 211, 238, 0.8)' }}
            >
              GitHub
            </motion.a>
            <motion.a
              href={socialLinks.linkedin}
              target="_blank"
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full font-bold text-black"
              whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(251, 191, 36, 0.8)' }}
            >
              LinkedIn
            </motion.a>
          </div>
        </div>
      </section>

      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40">
        {[0, 1, 2, 3, 4].map((section) => (
          <motion.div
            key={section}
            className={`w-3 h-3 rounded-full mb-4 cursor-pointer ${
              currentSection === section ? 'bg-yellow-400' : 'bg-gray-600'
            }`}
            whileHover={{ scale: 1.5 }}
            onClick={() => {
              const element = document.querySelectorAll('section')[section];
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateY(0deg); }
          50% { transform: translateY(-20px) rotateY(180deg); }
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}