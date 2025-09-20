'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Main neural network that spans the entire page
const ContinuousNeuralNetwork = () => {
  const svgRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Create main neural pathways
    const mainPaths = svg.querySelectorAll('.main-neural-path');
    mainPaths.forEach((path, i) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 3,
        ease: "none",
        scrollTrigger: {
          trigger: svg,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(path, {
              strokeDashoffset: length * (1 - progress),
              opacity: 0.3 + progress * 0.4
            });
          }
        }
      });
    });

    // Animate nodes
    const nodes = svg.querySelectorAll('.neural-node');
    nodes.forEach((node, i) => {
      gsap.fromTo(node, 
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.8,
          duration: 0.5,
          ease: "back.out",
          scrollTrigger: {
            trigger: node,
            start: "top 95%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-[400%] -z-10 opacity-30"
      viewBox="0 0 1920 4320"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#facc15" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
        </linearGradient>
        
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <radialGradient id="nodeGradient">
          <stop offset="0%" stopColor="#facc15" stopOpacity="1" />
          <stop offset="50%" stopColor="#facc15" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#facc15" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      
      {/* Main neural pathways */}
      {[...Array(15)].map((_, i) => {
        const startY = i * 300;
        const amplitude = 150 + Math.random() * 100;
        const frequency = 0.002 + Math.random() * 0.002;
        
        let path = `M ${100 + i * 50} ${startY}`;
        for (let x = 100 + i * 50; x < 1820; x += 50) {
          const y = startY + Math.sin(x * frequency) * amplitude + (x / 1920) * 1000;
          path += ` L ${x} ${y}`;
        }
        
        return (
          <g key={`pathway-${i}`}>
            <path
              className="main-neural-path"
              d={path}
              stroke="url(#neuralGradient)"
              strokeWidth="1.5"
              fill="none"
              filter="url(#glow)"
            />
            
            {/* Nodes along the path */}
            {[...Array(8)].map((_, j) => {
              const x = 200 + j * 200 + (i % 2) * 100;
              const y = startY + Math.sin(x * frequency) * amplitude + (x / 1920) * 1000;
              return (
                <g key={`node-${i}-${j}`}>
                  <circle
                    className="neural-node"
                    cx={x}
                    cy={y}
                    r="12"
                    fill="url(#nodeGradient)"
                    filter="url(#glow)"
                  />
                  {/* Pulse animation */}
                  <circle
                    cx={x}
                    cy={y}
                    r="12"
                    fill="none"
                    stroke="#facc15"
                    strokeWidth="2"
                    opacity="0"
                  >
                    <animate
                      attributeName="r"
                      values="12;25;12"
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${j * 0.5}s`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.5;0"
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${j * 0.5}s`}
                    />
                  </circle>
                </g>
              );
            })}
          </g>
        );
      })}
      
      {/* Data flow particles */}
      {[...Array(50)].map((_, i) => {
        const pathIndex = Math.floor(Math.random() * 15);
        return (
          <circle
            key={`particle-${i}`}
            r="3"
            fill="#facc15"
            filter="url(#glow)"
          >
            <animateMotion
              dur={`${10 + Math.random() * 10}s`}
              repeatCount="indefinite"
              begin={`${Math.random() * 10}s`}
            >
              <mpath href={`#neural-path-${pathIndex}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur={`${10 + Math.random() * 10}s`}
              repeatCount="indefinite"
              begin={`${Math.random() * 10}s`}
            />
          </circle>
        );
      })}

      {/* Connection lines between nodes */}
      {[...Array(30)].map((_, i) => {
        const x1 = Math.random() * 1920;
        const y1 = Math.random() * 4320;
        const x2 = x1 + (Math.random() - 0.5) * 400;
        const y2 = y1 + (Math.random() - 0.5) * 400;
        
        return (
          <line
            key={`connection-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#a855f7"
            strokeWidth="0.5"
            opacity="0.3"
          >
            <animate
              attributeName="opacity"
              values="0.1;0.3;0.1"
              dur={`${3 + Math.random() * 3}s`}
              repeatCount="indefinite"
              begin={`${Math.random() * 3}s`}
            />
          </line>
        );
      })}
    </svg>
  );
};

// Enhanced code visualization with neural connections
const CodeNeuralVisualization = ({ code, progress }) => {
  const lines = code.split('\n');
  const [activeConnections, setActiveConnections] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newConnections = [...Array(3)].map(() => ({
        from: Math.floor(Math.random() * lines.length),
        to: Math.floor(Math.random() * lines.length),
        id: Math.random()
      }));
      setActiveConnections(newConnections);
    }, 2000);
    
    return () => clearInterval(timer);
  }, [lines.length]);

  return (
    <div className="relative">
      <svg className="absolute left-0 top-0 w-32 h-full pointer-events-none">
        {activeConnections.map(conn => {
          const y1 = conn.from * 24 + 12;
          const y2 = conn.to * 24 + 12;
          const midX = 60;
          
          return (
            <motion.path
              key={conn.id}
              d={`M 10 ${y1} Q ${midX} ${(y1 + y2) / 2} 10 ${y2}`}
              stroke="#facc15"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            />
          );
        })}
      </svg>
      
      <div className="font-mono text-sm relative z-10 pl-16">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="flex items-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: progress > i / lines.length ? 0.9 : 0.3,
              x: 0
            }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <span className="text-gray-500 mr-4 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
            <span className={`${progress > i / lines.length ? 'text-green-400' : 'text-gray-600'} whitespace-pre`}>
              {line}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Project cards with neural network integration
const NeuralProjectCard = ({ project, index, progress }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.8 }}
    >
      <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)]">
        <rect
          x="2"
          y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          fill="none"
          stroke="#facc15"
          strokeWidth="1"
          strokeDasharray="5 5"
          rx="8"
          className="opacity-0 group-hover:opacity-50 transition-opacity"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;10"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>

      <div className="relative bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden bg-gray-900">
          {project.imageUrl && (
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={600}
              height={300}
              className="object-cover w-full h-full opacity-70 group-hover:opacity-90 transition-opacity"
            />
          )}
          
          {/* Neural overlay on hover */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            {[...Array(5)].map((_, i) => (
              <motion.circle
                key={i}
                cx={Math.random() * 100 + '%'}
                cy={Math.random() * 100 + '%'}
                r="2"
                fill="#facc15"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            ))}
          </svg>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-yellow-400 mb-2">{project.title}</h3>
          <p className="text-gray-400 mb-4">{project.description}</p>
          
          <motion.a
            href={project.gitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
            whileHover={{ x: 5 }}
          >
            <span>Explore Neural Code</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

// Main SVG Story Portfolio
export default function SVGStoryPortfolio({ 
  projects = [], 
  blogPosts = [],
  sneakPeekImages = [],
  education = {}, 
  researchExperience = [], 
  leadershipAndAwards = [], 
  technicalSkills = [], 
  socialLinks = {},
  researchPapers = [] 
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Adjusted transform ranges for much earlier triggers
  const heroProgress = useTransform(smoothProgress, [0, 0.05], [0, 1]);
  const skillsProgress = useTransform(smoothProgress, [0.05, 0.15], [0, 1]);
  const projectsProgress = useTransform(smoothProgress, [0.15, 0.25], [0, 1]);
  const experienceProgress = useTransform(smoothProgress, [0.25, 0.4], [0, 1]);
  const researchProgress = useTransform(smoothProgress, [0.35, 0.5], [0, 1]);
  const blogProgress = useTransform(smoothProgress, [0.45, 0.6], [0, 1]);
  const galleryProgress = useTransform(smoothProgress, [0.55, 0.7], [0, 1]);
  const contactProgress = useTransform(smoothProgress, [0.65, 0.8], [0, 1]);

  // Sample code for animation
  const sampleCode = `class NeuralNetwork:
    def __init__(self, layers):
        self.layers = layers
        self.weights = self._init_weights()
        self.biases = self._init_biases()
        
    def forward(self, x):
        for w, b in zip(self.weights, self.biases):
            x = self.activation(np.dot(x, w) + b)
        return x
        
    def train(self, data, epochs=1000):
        optimizer = Adam(lr=0.001)
        for epoch in range(epochs):
            loss = self.compute_loss(data)
            gradients = self.backpropagate(loss)
            optimizer.step(gradients)
            
    def activation(self, x):
        return np.maximum(0, x)  # ReLU`;

  return (
    <div ref={containerRef} className="bg-black text-white relative">
      {/* Continuous Neural Network Background */}
      <ContinuousNeuralNetwork />
      
      {/* Progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-purple-600 to-blue-600 z-50"
        style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
      />


      {/* Floating Action Buttons */}
      <motion.div 
        className="fixed bottom-8 right-8 z-50 flex flex-col gap-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <motion.a
          href="mailto:prathambiren2618@gmail.com"
          className="group relative w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-yellow-400/50 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <span className="absolute right-full mr-3 px-2 py-1 bg-black/90 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Contact Me
          </span>
        </motion.a>

        <motion.a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-14 h-14 bg-black border-2 border-gray-800 rounded-full flex items-center justify-center hover:border-purple-400 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-purple-400">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span className="absolute right-full mr-3 px-2 py-1 bg-black/90 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            GitHub
          </span>
        </motion.a>
      </motion.div>

      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 space-y-4">
        {['Hero', 'Skills', 'Projects', 'Experience', 'Awards', 'Research', 'Blog', 'Gallery', 'Contact'].map((section, i) => (
          <motion.div
            key={section}
            className="relative group"
            whileHover={{ scale: 1.2 }}
          >
            <div
              className={`w-3 h-3 rounded-full bg-yellow-400 cursor-pointer transition-all ${
                smoothProgress.get() > i * 0.2 ? 'opacity-100' : 'opacity-30'
              }`}
              onClick={() => {
                window.scrollTo({
                  top: (document.documentElement.scrollHeight / 9) * i,
                  behavior: 'smooth'
                });
              }}
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {section}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Section 1: Hero */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <motion.div className="text-center relative z-10">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Pratham Patel
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            Neural Architect • AI Engineer • Code Synthesizer
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <a 
              href="/home" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors group"
            >
              <span className="text-sm">Explore Full Website</span>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="transform group-hover:translate-x-1 transition-transform">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>

          {/* Neural visualization around name */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {[...Array(10)].map((_, i) => {
              const angle = (i / 10) * Math.PI * 2;
              const radius = 300;
              return (
                <motion.circle
                  key={i}
                  cx="50%"
                  cy="50%"
                  r="4"
                  fill="#facc15"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: 1 + i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              );
            })}
          </svg>
        </motion.div>
      </section>

      {/* Section 2: Skills Neural Grid */}
      <section className="min-h-screen relative py-32">
        <div className="max-w-6xl mx-auto px-8">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-center mb-16"
            style={{ opacity: skillsProgress }}
          >
            Neural Capabilities
          </motion.h2>
          
          <div className="relative">
            <svg className="absolute inset-0 w-full h-full">
              {/* Create neural grid connections */}
              {technicalSkills.map((category, catIndex) => 
                category.skills.map((skill, skillIndex) => {
                  const totalIndex = catIndex * 5 + skillIndex;
                  const x = (totalIndex % 4) * 25 + 12.5;
                  const y = Math.floor(totalIndex / 4) * 20 + 10;
                  
                  return (
                    <g key={`${catIndex}-${skillIndex}`}>
                      {/* Connect to adjacent nodes */}
                      {totalIndex % 4 < 3 && (
                        <motion.line
                          x1={`${x}%`}
                          y1={`${y}%`}
                          x2={`${x + 25}%`}
                          y2={`${y}%`}
                          stroke="#a855f7"
                          strokeWidth="1"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ 
                            pathLength: skillsProgress.get(),
                            opacity: skillsProgress.get() * 0.3
                          }}
                        />
                      )}
                      {Math.floor(totalIndex / 4) < 4 && (
                        <motion.line
                          x1={`${x}%`}
                          y1={`${y}%`}
                          x2={`${x}%`}
                          y2={`${y + 20}%`}
                          stroke="#a855f7"
                          strokeWidth="1"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ 
                            pathLength: skillsProgress.get(),
                            opacity: skillsProgress.get() * 0.3
                          }}
                        />
                      )}
                    </g>
                  );
                })
              )}
            </svg>

            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10"
              style={{ opacity: skillsProgress }}
            >
              {technicalSkills.map((category, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="relative"
                >
                  <div className="bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                    <h3 className="text-yellow-400 font-semibold mb-4">{category.category}</h3>
                    <div className="space-y-2">
                      {category.skills.map((skill, j) => (
                        <motion.div
                          key={j}
                          className="text-sm text-gray-300 flex items-center gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 + j * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Neural node indicator */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Projects with Neural Code */}
      <section className="min-h-screen relative py-32">
        <div className="max-w-6xl mx-auto px-8">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-16"
            style={{ opacity: projectsProgress }}
          >
            Neural Constructs
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-blue-600/20 blur-2xl" />
              <div className="relative bg-black/80 backdrop-blur-sm p-6 rounded-lg border border-green-400/30 max-h-[600px] overflow-y-auto">
                <h3 className="text-xl font-semibold text-green-400 mb-4">Neural Code Architecture</h3>
                <CodeNeuralVisualization code={sampleCode} progress={projectsProgress} />
              </div>
            </div>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gray-400"
              >
                <p className="mb-4">
                  Each project is a node in my neural network of knowledge, 
                  interconnected and constantly evolving through continuous learning.
                </p>
                <p>
                  The synapses between projects represent shared technologies, 
                  patterns, and insights that strengthen with each iteration.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <NeuralProjectCard
                key={project._id}
                project={project}
                index={i}
                progress={projectsProgress}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Experience Neural Timeline */}
      <section className="min-h-screen relative py-32">
        <div className="max-w-6xl mx-auto px-8">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-16 text-center"
            style={{ opacity: experienceProgress }}
          >
            Evolution Timeline
          </motion.h2>
          
          <div className="relative">
            {/* Central neural spine */}
            <svg className="absolute left-1/2 top-0 w-2 h-full -translate-x-1/2">
              <motion.line
                x1="4"
                y1="0"
                x2="4"
                y2="100%"
                stroke="url(#timelineGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: experienceProgress }}
              />
              <defs>
                <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#facc15" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            
            {researchExperience.map((exp, i) => (
              <motion.div
                key={i}
                className={`relative mb-20 ${i % 2 === 0 ? 'pr-[55%] text-right' : 'pl-[55%] text-left'}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Neural node */}
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
                  viewport={{ once: true }}
                >
                  <div className="w-full h-full bg-yellow-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-2 border-yellow-400 animate-ping" />
                </motion.div>

                {/* Connection line */}
                <svg
                  className={`absolute top-3 ${i % 2 === 0 ? 'right-[45%]' : 'left-[45%]'} w-[10%] h-0.5`}
                >
                  <motion.line
                    x1={i % 2 === 0 ? "100%" : "0%"}
                    y1="50%"
                    x2={i % 2 === 0 ? "0%" : "100%"}
                    y2="50%"
                    stroke="#facc15"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                  />
                </svg>
                
                <div className="bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                  <h3 className="text-2xl font-semibold text-yellow-400">{exp.role}</h3>
                  <p className="text-purple-400">{exp.company}</p>
                  <p className="text-sm text-gray-500 mt-1">{exp.date}</p>
                  <ul className="mt-3 space-y-1">
                    {exp.points?.map((point, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 + j * 0.05 + 0.4 }}
                        viewport={{ once: true }}
                        className="text-sm text-gray-400"
                      >
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Leadership & Awards Neural Constellation */}
      <section className="min-h-screen relative py-32">
        <div className="max-w-6xl mx-auto px-8">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-center mb-16"
            style={{ opacity: experienceProgress }}
          >
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Achievement Constellation
            </span>
          </motion.h2>
          
          <div className="relative">
            {/* Central neural hub */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <circle 
                cx="50%" 
                cy="50%" 
                r="200" 
                fill="none" 
                stroke="url(#achievementGradient)" 
                strokeWidth="1" 
                opacity="0.3"
                strokeDasharray="5 5"
              >
                <animate 
                  attributeName="stroke-dashoffset" 
                  values="0;10" 
                  dur="2s" 
                  repeatCount="indefinite" 
                />
              </circle>
              <defs>
                <radialGradient id="achievementGradient">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#ef4444" />
                </radialGradient>
              </defs>
            </svg>
            
            <div className="grid gap-8">
              {leadershipAndAwards.map((award, i) => {
                const angle = (i / leadershipAndAwards.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 250;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: i * 0.2, 
                      type: "spring",
                      stiffness: 100 
                    }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-orange-400/50 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-orange-400">{award.title}</h3>
                        <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{award.date}</span>
                      </div>
                      <p className="text-gray-400">{award.description}</p>
                      
                      {/* Achievement star */}
                      <motion.div
                        className="absolute -top-3 -right-3 w-8 h-8"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="text-orange-400">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Research Papers Neural Grid */}
      <section className="min-h-screen relative py-32">
        <div className="max-w-6xl mx-auto px-8">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-center mb-16"
            style={{ opacity: researchProgress }}
          >
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Research Neural Network
            </span>
          </motion.h2>
          
          <div className="space-y-8">
            {researchPapers.map((paper, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Neural connection lines */}
                <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] pointer-events-none">
                  <motion.path
                    d={`M 0 50% Q 25% ${i % 2 === 0 ? '20%' : '80%'} 50% 50% T 100% 50%`}
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    viewport={{ once: true }}
                  />
                </svg>

                <div className="relative bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg p-8 hover:border-green-400/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-green-400 flex-1">{paper.title}</h3>
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      paper.status === 'Accepted' ? 'bg-green-900 text-green-300' : 
                      paper.status === 'In Progress' ? 'bg-yellow-900 text-yellow-300' : 
                      'bg-blue-900 text-blue-300'
                    }`}>
                      {paper.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{paper.abstract}</p>
                  
                  <div className="flex justify-between items-end">
                    <div className="flex gap-2">
                      {paper.concepts.map((concept, j) => (
                        <span key={j} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                          {concept}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">{paper.conference}</p>
                  </div>
                  
                  {/* Neural nodes */}
                  {[...Array(3)].map((_, j) => (
                    <motion.div
                      key={j}
                      className="absolute w-3 h-3 bg-green-400 rounded-full"
                      style={{
                        top: `${30 + j * 25}%`,
                        right: i % 2 === 0 ? '-1rem' : 'auto',
                        left: i % 2 === 1 ? '-1rem' : 'auto',
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        delay: j * 0.5,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Blog Neural Stream */}
      <section className="min-h-screen relative py-32">
        <div className="max-w-6xl mx-auto px-8">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-center mb-16"
            style={{ opacity: blogProgress }}
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Knowledge Transmission
            </span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 6).map((post, i) => (
              <motion.a
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group relative block"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden hover:border-purple-400/50 transition-all">
                  {/* Neural pulse effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {post.bannerUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={post.bannerUrl} 
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-purple-400 mb-2 group-hover:text-pink-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {post.shortDescription}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {post.topics?.slice(0, 2).map((topic, j) => (
                          <span key={j} className="text-xs px-2 py-1 bg-purple-900/50 text-purple-300 rounded-full">
                            {topic}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Neural activity indicator */}
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                </div>
              </motion.a>
            ))}
          </div>
          
          {blogPosts.length > 6 && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <a 
                href="/bloglist" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-black font-bold rounded-full hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all"
              >
                Explore All Articles
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* Section 7: Visual Memory Bank */}
      <section className="min-h-screen relative py-32">
        <div className="max-w-6xl mx-auto px-8">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-center mb-16"
            style={{ opacity: galleryProgress }}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Memory Fragments
            </span>
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sneakPeekImages.map((image, i) => (
              <motion.div
                key={image._id}
                className="relative group aspect-square overflow-hidden rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
                
                {/* Neural overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm text-cyan-400 font-semibold">{image.title}</p>
                  </div>
                </div>
                
                {/* Neural connections on hover */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  {[...Array(3)].map((_, j) => (
                    <motion.line
                      key={j}
                      x1={`${Math.random() * 100}%`}
                      y1={`${Math.random() * 100}%`}
                      x2={`${Math.random() * 100}%`}
                      y2={`${Math.random() * 100}%`}
                      stroke="#06b6d4"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: j * 0.2 }}
                    />
                  ))}
                </svg>
              </motion.div>
            ))}
          </div>
          
          {sneakPeekImages.length > 8 && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <a 
                href="/sneakpeak" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-black font-bold rounded-full hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all"
              >
                View Full Gallery
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                </svg>
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* Section 9: Contact Neural Portal */}
      <section className="min-h-screen relative flex items-center justify-center">
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: contactProgress }}
        >
          <svg className="w-full h-full" viewBox="0 0 1920 1080">
            {/* Neural portal */}
            <g transform="translate(960, 540)">
              {[...Array(5)].map((_, ring) => (
                <motion.circle
                  key={ring}
                  cx="0"
                  cy="0"
                  r={100 + ring * 60}
                  fill="none"
                  stroke={`rgba(168, 85, 247, ${0.5 - ring * 0.1})`}
                  strokeWidth="2"
                  strokeDasharray="10 5"
                  animate={{ rotate: 360 * (ring % 2 === 0 ? 1 : -1) }}
                  transition={{ duration: 20 + ring * 5, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: 'center' }}
                />
              ))}
              
              {/* Neural connections radiating out */}
              {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const x = Math.cos(angle) * 400;
                const y = Math.sin(angle) * 400;
                
                return (
                  <g key={i}>
                    <motion.line
                      x1="0"
                      y1="0"
                      x2={x}
                      y2={y}
                      stroke="#facc15"
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: [0, 1, 0],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    />
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="5"
                      fill="#facc15"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1, 0] }}
                      transition={{
                        duration: 3,
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    />
                  </g>
                );
              })}
            </g>
          </svg>
        </motion.div>
        
        <div className="relative z-10 text-center">
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-8"
            style={{ 
              opacity: contactProgress,
              scale: useTransform(contactProgress, [0, 1], [0.8, 1])
            }}
          >
            Connect to the Network
          </motion.h2>
          
          <motion.div 
            className="flex gap-6 justify-center"
            style={{ opacity: contactProgress }}
          >
            {[
              { label: 'Email', href: 'mailto:prathambiren2618@gmail.com', color: '#facc15' },
              { label: 'GitHub', href: socialLinks.github, color: '#a855f7' },
              { label: 'LinkedIn', href: socialLinks.linkedin, color: '#3b82f6' }
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <svg width="120" height="50" className="relative z-10">
                  <rect
                    x="2"
                    y="2"
                    width="116"
                    height="46"
                    fill="none"
                    stroke={link.color}
                    strokeWidth="2"
                    rx="25"
                    className="group-hover:fill-current group-hover:fill-opacity-10 transition-all"
                  />
                  <text
                    x="60"
                    y="30"
                    textAnchor="middle"
                    fill={link.color}
                    className="text-sm font-semibold"
                  >
                    {link.label}
                  </text>
                </svg>
                
                {/* Neural glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity"
                  style={{ backgroundColor: link.color }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}