'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiDownload, FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { 
  Code, 
  BrainCircuit, 
  Rocket, 
  Award, 
  Sparkles,
  Star,
  Terminal
} from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Three.js Background Component
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    const currentMount = mountRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Simple particle system
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.2 + 0.1, 1, 0.5);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};

// Glitch text effect
const GlitchText = ({ text, className = "" }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative">
        {text}
        <span className="absolute top-0 left-0 -ml-0.5 text-cyan-400 opacity-70 animate-glitch-1">{text}</span>
        <span className="absolute top-0 left-0 ml-0.5 text-red-400 opacity-70 animate-glitch-2">{text}</span>
      </span>
    </div>
  );
};

// Morphing text animation
const MorphingText = ({ words }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <motion.span
      key={currentIndex}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="inline-block"
    >
      {words[currentIndex]}
    </motion.span>
  );
};

// Interactive 3D Card
const Card3D = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateY((x - 0.5) * 20);
    setRotateX((y - 0.5) * -20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

// Main Ultra Enhanced Component
export default function UltraEnhancedSummaryPage({ 
  projects = [], 
  education = {}, 
  researchExperience = [], 
  leadershipAndAwards = [], 
  technicalSkills = [], 
  socialLinks = {} 
}) {
  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [loading, setLoading] = useState(true);

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.timeline({ delay: 0.5 })
        .from('.hero-title', {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out'
        })
        .from('.hero-subtitle', {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-description', {
          y: 30,
          opacity: 0,
          duration: 0.8
        }, '-=0.5')
        .from('.hero-cta', {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.1
        }, '-=0.3');

      // Scroll animations
      gsap.utils.toArray('.scroll-section').forEach((section) => {
        gsap.from(section, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, [loading]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-8">
            <GlitchText text="LOADING" />
          </h1>
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-yellow-400 to-purple-600 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={mainRef} className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Three.js Background */}
      <ThreeBackground />

      {/* Animated particles overlay */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center px-6"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="max-w-6xl mx-auto w-full text-center">
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-black mb-8">
            <span className="inline-block mr-4">
              <GlitchText text="PRATHAM" className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent" />
            </span>
            <span className="inline-block">
              <GlitchText text="PATEL" className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" />
            </span>
          </h1>

          <div className="hero-subtitle text-2xl md:text-4xl mb-8 font-light">
            <span className="text-gray-400">I'm a </span>
            <span className="text-yellow-400 font-bold">
              <MorphingText words={['AI Engineer', 'ML Researcher', 'Full-Stack Dev', 'Problem Solver']} />
            </span>
          </div>

          <p className="hero-description text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Computer Science student at Gannon University pushing the boundaries of
            <span className="inline-block mx-2 font-bold text-yellow-400"> artificial intelligence </span>
            and
            <span className="inline-block mx-2 font-bold text-purple-400"> modern web technologies </span>
            to create impactful solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-6 justify-center">
            <motion.a
              href="/resume/Resume-17.pdf"
              download
              className="hero-cta group relative px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 font-bold text-black"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload className="inline mr-2" />
              Download Resume
            </motion.a>

            <motion.a
              href="/projects"
              className="hero-cta px-8 py-4 rounded-full border-2 border-yellow-400 font-bold text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>

            <motion.a
              href="mailto:prathambiren2618@gmail.com"
              className="hero-cta px-8 py-4 rounded-full border-2 border-gray-600 font-bold text-gray-400 hover:text-white hover:border-white transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail className="inline mr-2" />
              Contact Me
            </motion.a>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full p-1">
              <motion.div
                className="w-1 h-2 bg-yellow-400 rounded-full mx-auto"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <section className="scroll-section py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Technical Arsenal
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {technicalSkills.flatMap(cat => cat.skills).slice(0, 12).map((skill, i) => (
              <Card3D key={i} className="p-6 bg-gray-900/50 backdrop-blur rounded-xl border border-gray-800 hover:border-yellow-400/50 transition-all">
                <div className="text-center">
                  <div className="text-3xl mb-3 text-yellow-400">
                    {i % 4 === 0 ? <BrainCircuit /> : i % 4 === 1 ? <Code /> : i % 4 === 2 ? <Rocket /> : <Terminal />}
                  </div>
                  <h3 className="font-semibold">{skill}</h3>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* Research Experience */}
      <section className="scroll-section py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Research Journey
            </span>
          </h2>

          <div className="space-y-8">
            {researchExperience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <Card3D className="p-8 bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">{exp.role}</h3>
                  <p className="text-gray-400 mb-1">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-4">{exp.date}</p>
                  <ul className="space-y-2">
                    {exp.points?.map((point, j) => (
                      <li key={j} className="flex items-start text-gray-300">
                        <Sparkles className="text-yellow-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="scroll-section py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <Card3D className="h-full bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={600}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <a
                      href={project.gitLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold"
                    >
                      View Project <FiExternalLink />
                    </a>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="scroll-section py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative p-16 rounded-3xl bg-gradient-to-br from-yellow-400/10 to-purple-400/10 backdrop-blur border border-yellow-400/20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <GlitchText text="LET'S CREATE" />
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Ready to build something extraordinary together?
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href="/hire-pratham-patel"
                className="px-10 py-5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 font-bold text-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
              </motion.a>
              
              <motion.a
                href="mailto:prathambiren2618@gmail.com"
                className="px-10 py-5 rounded-full border-2 border-white/50 font-bold hover:bg-white hover:text-black transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Pratham Patel. Built with Three.js & GSAP
          </p>
          <div className="flex gap-6">
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-400">
              <FiGithub size={24} />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-400">
              <FiLinkedin size={24} />
            </a>
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-400">
              <FiTwitter size={24} />
            </a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes glitch-1 {
          0%, 100% {
            clip-path: inset(0 0 0 0);
          }
          20% {
            clip-path: inset(20% 0 60% 0);
          }
        }
        
        @keyframes glitch-2 {
          0%, 100% {
            clip-path: inset(0 0 0 0);
          }
          20% {
            clip-path: inset(60% 0 20% 0);
          }
        }
        
        .animate-glitch-1 {
          animation: glitch-1 0.3s infinite alternate-reverse;
        }
        
        .animate-glitch-2 {
          animation: glitch-2 0.3s infinite alternate;
        }
      `}</style>
    </div>
  );
}