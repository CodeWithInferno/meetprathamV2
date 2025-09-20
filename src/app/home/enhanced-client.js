'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../Components/Landing/Header';
import InteractiveBackground from '../Components/InteractiveBackground';
import Text3D from '../Components/Text3D';
import CustomCursor from '../Components/CustomCursor';
import NowPlaying from '../Components/NowPlaying';
import CommandPalette from '../Components/CommandPalette';

// Terminal component
const Terminal = ({ onCommand }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: '> Welcome to Pratham\'s Portfolio Terminal' },
    { type: 'output', text: '> Type "help" for available commands' }
  ]);
  const terminalRef = useRef(null);

  const commands = {
    help: () => 'Available commands: about, projects, skills, github, contact, clear',
    about: () => 'I\'m Pratham Patel, an AI/ML Engineer at Gannon University specializing in reinforcement learning and full-stack development.',
    projects: () => 'View my projects at /projects - Featured: InboxIQ (AI Email), SignSpeak (Sign Language ML), Malware Detection (97% accuracy)',
    skills: () => 'Languages: Python, JavaScript, TypeScript\nFrameworks: PyTorch, TensorFlow, React, Next.js\nSpecialties: RL, NLP, Computer Vision',
    github: () => 'GitHub: https://github.com/CodeWithInferno - 12 stars, 6 repos',
    contact: () => 'Email: prathambiren2618@gmail.com\nLinkedIn: /in/pratham-patel-6a40b5323',
    clear: () => {
      setHistory([]);
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const command = input.toLowerCase().trim();
    setHistory(prev => [...prev, { type: 'input', text: `> ${input}` }]);
    
    if (commands[command]) {
      const output = commands[command]();
      if (output) {
        setHistory(prev => [...prev, { type: 'output', text: output }]);
      }
    } else {
      setHistory(prev => [...prev, { type: 'error', text: `Command not found: ${command}` }]);
    }
    
    setInput('');
    if (onCommand) onCommand(command);
  };

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [history]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/90 backdrop-blur border border-green-500/30 rounded-lg p-4 font-mono text-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-green-400 ml-2">pratham@portfolio:~$</span>
      </div>
      <div ref={terminalRef} className="h-48 overflow-y-auto mb-2 text-green-400">
        {history.map((line, i) => (
          <div key={i} className={line.type === 'error' ? 'text-red-400' : ''}>
            {line.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="text-green-400 mr-2">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-green-400"
          placeholder="type a command..."
        />
      </form>
    </motion.div>
  );
};

// GitHub Stats Card
const GitHubStats = () => {
  const [stats, setStats] = useState({ repos: 6, stars: 12, followers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">GitHub Activity</h3>
        <a href="https://github.com/CodeWithInferno" target="_blank" rel="noopener noreferrer" 
           className="text-gray-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
      
      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-yellow-400">{stats.repos}</div>
            <div className="text-sm text-gray-400">Repositories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">{stats.stars}</div>
            <div className="text-sm text-gray-400">Stars</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">4</div>
            <div className="text-sm text-gray-400">Achievements</div>
          </div>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <h4 className="text-sm font-semibold text-gray-300 mb-2">Top Languages</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">JavaScript</span>
            <div className="w-32 bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full" style={{width: '50%'}}></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Python</span>
            <div className="w-32 bg-gray-700 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{width: '33%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Typing animation component
const TypeWriter = ({ text, delay = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, delay);
    
    return () => clearInterval(timer);
  }, [text, delay]);
  
  return <span>{displayText}</span>;
};

// Main Enhanced Home Component
export default function EnhancedHome() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Easter egg: Konami code
  const [konamiIndex, setKonamiIndex] = useState(0);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        if (konamiIndex === konamiCode.length - 1) {
          // Easter egg activated!
          document.body.style.transform = 'rotate(360deg)';
          document.body.style.transition = 'transform 1s';
          setTimeout(() => {
            document.body.style.transform = '';
            alert('🎮 Achievement Unlocked: Konami Master!');
          }, 1000);
          setKonamiIndex(0);
        } else {
          setKonamiIndex(konamiIndex + 1);
        }
      } else {
        setKonamiIndex(0);
      }
      
      // Toggle terminal with backtick
      if (e.key === '`') {
        setShowTerminal(!showTerminal);
      }
      
      // Toggle custom cursor with 'c'
      if (e.key === 'c' && e.ctrlKey) {
        setShowCursor(!showCursor);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [konamiIndex, showTerminal, showCursor]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX - innerWidth / 2) / innerWidth,
        y: (clientY - innerHeight / 2) / innerHeight,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-black min-h-screen overflow-hidden" ref={containerRef}>
      <Header />
      
      {/* Interactive particle background */}
      <InteractiveBackground />
      
      {/* Optional custom cursor */}
      {showCursor && <CustomCursor />}
      
      {/* Now Playing Widget */}
      <NowPlaying />
      
      {/* Command Palette */}
      <CommandPalette />

      {/* Main Hero Section */}
      <motion.section 
        style={{ opacity }}
        className="relative min-h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            style={{
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            }}
          >
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Text3D 
                  text="Pratham Patel"
                  className="text-5xl md:text-7xl font-bold text-white mb-4"
                />
                <span className="text-yellow-400 text-5xl md:text-7xl animate-pulse">_</span>
                <p className="text-xl md:text-2xl text-gray-300">
                  AI/ML Engineer • Full-Stack Developer • Creator
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="space-y-4"
              >
                <p className="text-lg text-gray-400">
                  Building intelligent systems at the intersection of AI and web development.
                  Computer Science student at Gannon University with a passion for reinforcement learning and creating impactful solutions.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {['PyTorch', 'React', 'Next.js', 'TensorFlow', 'TypeScript', 'Docker'].map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-4 py-2 bg-gray-800 text-yellow-400 rounded-full text-sm border border-gray-700 hover:border-yellow-400 transition-colors cursor-pointer"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4"
              >
                <motion.a
                  href="/projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  View Projects
                </motion.a>
                <motion.a
                  href="/resume/Resume-17.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-bold rounded-lg hover:bg-yellow-400 hover:text-black transition-all"
                >
                  Download Resume
                </motion.a>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="grid grid-cols-3 gap-4 mt-8"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">97%</div>
                  <div className="text-sm text-gray-400">Malware Detection Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">1st</div>
                  <div className="text-sm text-gray-400">BSidesROC CTF</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">50+</div>
                  <div className="text-sm text-gray-400">Club Members</div>
                </div>
              </motion.div>
            </div>

            {/* Right Content - Interactive Elements */}
            <div className="space-y-6">
              <GitHubStats />
              
              {/* Featured Project Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-yellow-400/10 to-orange-400/10 backdrop-blur border border-yellow-400/30 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-white mb-2">🔥 Featured Project</h3>
                <h4 className="text-lg text-yellow-400 mb-2">InboxIQ - AI Email Assistant</h4>
                <p className="text-gray-300 mb-4">
                  Intelligent email management with NLP-powered categorization and smart responses.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-gray-800 rounded">JavaScript</span>
                    <span className="text-xs px-2 py-1 bg-gray-800 rounded">AI/ML</span>
                  </div>
                  <Link href="/projects" className="text-yellow-400 hover:underline text-sm">
                    View More →
                  </Link>
                </div>
              </motion.div>

              {/* Live Coding Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-900/50 backdrop-blur border border-gray-700 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">💻 Currently Building</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">LLM Reasoning Enhancement</span>
                    <span className="text-xs text-green-400">Active</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-sm text-gray-400">
                    Improving LLM accuracy by 60% through novel reasoning techniques
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Terminal (Hidden by default, toggle with `) */}
        <AnimatePresence>
          {showTerminal && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-8 right-8 w-96 z-50"
            >
              <Terminal />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Press ` to close terminal
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keyboard shortcuts hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="fixed bottom-8 left-8 text-gray-500 text-sm space-y-1"
        >
          <div>Press <kbd className="px-2 py-1 bg-gray-800 rounded">~</kbd> for terminal</div>
          <div>Press <kbd className="px-2 py-1 bg-gray-800 rounded">Ctrl+C</kbd> for custom cursor</div>
          <div>Press <kbd className="px-2 py-1 bg-gray-800 rounded">Ctrl+K</kbd> for command palette</div>
        </motion.div>
      </motion.section>

      {/* Additional sections can be added here */}
    </div>
  );
}