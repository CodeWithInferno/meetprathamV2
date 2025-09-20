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
import { useRouter } from 'next/navigation';

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
  Download,
  Mail,
  Award,
  Briefcase,
  Star,
  Zap,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

// Import our custom components
import InteractiveBackground from '../../components/InteractiveBackground';
import CommandPalette from '../../components/CommandPalette';
import NowPlaying from '../../components/NowPlaying';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Enhanced Skills with proficiency levels
const skills = [
  { name: 'Python', icon: <Code size={32} />, level: 95, color: '#3776ab' },
  { name: 'PyTorch', icon: <BrainCircuit size={32} />, level: 90, color: '#ee4c2c' },
  { name: 'JavaScript', icon: <FileJson size={32} />, level: 85, color: '#f7df1e' },
  { name: 'React', icon: <Component size={32} />, level: 85, color: '#61dafb' },
  { name: 'TensorFlow', icon: <Bot size={32} />, level: 80, color: '#ff6f00' },
  { name: 'Next.js', icon: <Rocket size={32} />, level: 80, color: '#000000' },
  { name: 'Docker', icon: <Server size={32} />, level: 75, color: '#2496ed' },
  { name: 'AWS', icon: <Cloud size={32} />, level: 70, color: '#ff9900' },
  { name: 'Git', icon: <GitBranch size={32} />, level: 90, color: '#f05032' },
  { name: 'SQL', icon: <Database size={32} />, level: 75, color: '#336791' },
  { name: 'Linux', icon: <Terminal size={32} />, level: 85, color: '#fcc624' },
  { name: 'C++', icon: <Cpu size={32} />, level: 70, color: '#00599c' },
];

// Enhanced Skills Showcase with 3D effect
const SkillsShowcase = () => {
  const [hovered, setHovered] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const gridRef = useRef(null);

  return (
    <div className="relative">
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            className="relative"
            whileHover={{ scale: 1.05, z: 20 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelectedSkill(skill)}
          >
            <div className="relative p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur border border-gray-800 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer group">
              {/* Skill Icon */}
              <div 
                className="text-gray-400 group-hover:text-yellow-400 transition-colors duration-300 mb-3"
                style={{ color: hovered === i ? skill.color : undefined }}
              >
                {skill.icon}
              </div>
              
              {/* Skill Name */}
              <h3 className="text-white font-semibold text-sm mb-2">{skill.name}</h3>
              
              {/* Proficiency Bar */}
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              </div>
              
              {/* Proficiency Percentage */}
              <motion.span 
                className="absolute top-2 right-2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: skill.color }}
              >
                {skill.level}%
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-yellow-400 mb-4" style={{ color: selectedSkill.color }}>
                {selectedSkill.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{selectedSkill.name}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-400">Proficiency:</span>
                <span className="font-mono text-lg" style={{ color: selectedSkill.color }}>
                  {selectedSkill.level}%
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Extensive experience with {selectedSkill.name} in production environments, 
                building scalable solutions and implementing best practices.
              </p>
              <button
                onClick={() => setSelectedSkill(null)}
                className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-white"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Live Stats Counter
const LiveStats = () => {
  const [stats, setStats] = useState({
    projects: 0,
    commits: 0,
    stars: 0,
    coffee: 0
  });

  useEffect(() => {
    const targetStats = {
      projects: 15,
      commits: 500,
      stars: 12,
      coffee: 999
    };

    const interval = setInterval(() => {
      setStats(prev => ({
        projects: prev.projects < targetStats.projects ? prev.projects + 1 : targetStats.projects,
        commits: prev.commits < targetStats.commits ? prev.commits + 25 : targetStats.commits,
        stars: prev.stars < targetStats.stars ? prev.stars + 1 : targetStats.stars,
        coffee: prev.coffee < targetStats.coffee ? prev.coffee + 50 : targetStats.coffee,
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-16">
      {[
        { label: 'Projects Built', value: stats.projects, icon: <Briefcase /> },
        { label: 'Git Commits', value: stats.commits, icon: <GitBranch /> },
        { label: 'GitHub Stars', value: stats.stars, icon: <Star /> },
        { label: 'Coffee Consumed', value: stats.coffee, icon: <Zap /> },
      ].map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="text-center p-6 rounded-lg bg-gray-900/50 backdrop-blur border border-gray-800"
        >
          <div className="text-yellow-400 mb-2 flex justify-center">{stat.icon}</div>
          <div className="text-3xl font-bold text-white font-mono">{stat.value}+</div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

// Interactive Timeline
const InteractiveTimeline = ({ items, title }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div>
      <h2 className="section-title text-4xl md:text-5xl font-bold mb-16">{title}</h2>
      <div className="relative">
        <div className="absolute top-0 left-8 w-0.5 bg-gradient-to-b from-yellow-400 to-transparent h-full"></div>
        <div className="space-y-12">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Node */}
              <motion.div
                className="absolute left-6 top-6 w-4 h-4 bg-yellow-400 rounded-full cursor-pointer"
                whileHover={{ scale: 1.5 }}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
              </motion.div>

              {/* Content Card */}
              <motion.div
                className="ml-16 p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur border border-gray-800 hover:border-yellow-400/50 transition-all cursor-pointer"
                whileHover={{ x: 10 }}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{item.role || item.title}</h3>
                <p className="text-yellow-400 mb-1">{item.company}</p>
                <p className="text-sm text-gray-500 mb-4">{item.date}</p>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.points && (
                        <ul className="space-y-2 text-gray-400">
                          {item.points.map((point, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start"
                            >
                              <CheckCircle size={16} className="text-green-400 mr-2 mt-1 flex-shrink-0" />
                              <span>{point}</span>
                            </motion.li>
                          ))}
                        </ul>
                      )}
                      {item.description && (
                        <p className="text-gray-400">{item.description}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced Project Card
const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur border border-gray-800 hover:border-yellow-400/50 transition-all duration-300">
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden">
          <Image 
            src={project.imageUrl} 
            alt={project.title} 
            width={800} 
            height={400} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
          <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {['React', 'Python', 'ML'].map((tech) => (
              <span key={tech} className="px-3 py-1 bg-gray-800 text-yellow-400 rounded-full text-xs">
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.a
              href={project.gitLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold"
              whileHover={{ x: 5 }}
            >
              View Project <ArrowRight size={16} />
            </motion.a>
          </div>
        </div>

        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="text-center p-6"
              >
                <Github className="text-yellow-400 mx-auto mb-4" size={48} />
                <p className="text-white mb-4">Explore the codebase and see how it works</p>
                <a
                  href={project.gitLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                >
                  <FiGithub /> View on GitHub
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Main Enhanced Summary Component
export default function EnhancedSummaryPage({ projects, education, researchExperience, leadershipAndAwards, technicalSkills, socialLinks }) {
  const main = useRef();
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const router = useRouter();

  // Initialize GSAP animations
  useGSAP(() => {
    // Hero animations
    const heroTl = gsap.timeline({ delay: 0.5 });
    
    heroTl
      .from('.hero-name', { 
        y: 100, 
        opacity: 0, 
        duration: 1.2, 
        ease: 'power4.out',
        stagger: 0.1 
      })
      .from('.hero-title', { 
        y: 50, 
        opacity: 0, 
        duration: 1, 
        ease: 'power3.out' 
      }, '-=0.8')
      .from('.hero-description', { 
        y: 30, 
        opacity: 0, 
        duration: 0.8, 
        ease: 'power3.out' 
      }, '-=0.6')
      .from('.hero-cta', { 
        scale: 0.8, 
        opacity: 0, 
        duration: 0.8, 
        ease: 'back.out(1.7)',
        stagger: 0.1
      }, '-=0.4');

    // Scroll-triggered animations
    gsap.utils.toArray('.fade-in').forEach(elem => {
      gsap.from(elem, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, { scope: main });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Press 'k' to open command palette
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div ref={main} className="bg-black text-white font-sans antialiased overflow-x-hidden">
      {/* Interactive Background */}
      <InteractiveBackground />
      
      {/* Command Palette */}
      <CommandPalette />
      
      {/* Now Playing Widget */}
      <NowPlaying />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Enhanced Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 relative">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Animated Name */}
              <h1 className="hero-name text-6xl md:text-8xl lg:text-9xl font-bold mb-4">
                <span className="inline-block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Pratham
                </span>{' '}
                <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Patel
                </span>
              </h1>

              {/* Animated Title */}
              <motion.div 
                className="hero-title text-2xl md:text-3xl text-gray-300 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="inline-block">AI/ML Engineer</span>
                <span className="inline-block mx-3 text-yellow-400">•</span>
                <span className="inline-block">Full-Stack Developer</span>
                <span className="inline-block mx-3 text-yellow-400">•</span>
                <span className="inline-block">Researcher</span>
              </motion.div>

              {/* Description */}
              <p className="hero-description text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                Computer Science student at Gannon University crafting intelligent systems 
                at the intersection of AI and web development. Specializing in reinforcement 
                learning, NLP, and building production-ready applications.
              </p>

              {/* CTA Buttons */}
              <div className="hero-cta flex flex-wrap gap-4 justify-center">
                <motion.a
                  href="/resume/Resume-17.pdf"
                  download
                  className="group relative inline-flex items-center gap-3 bg-yellow-400 text-black font-bold px-8 py-4 rounded-full overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Download Resume</span>
                  <Download size={20} className="relative z-10" />
                  <div className="absolute inset-0 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </motion.a>

                <motion.button
                  onClick={() => router.push('/projects')}
                  className="group relative inline-flex items-center gap-3 bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold px-8 py-4 rounded-full overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">View Projects</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Projects <ArrowRight size={20} className="ml-2" />
                  </span>
                </motion.button>

                <motion.a
                  href="mailto:prathambiren2618@gmail.com"
                  className="group relative inline-flex items-center gap-3 bg-transparent border-2 border-gray-600 text-gray-400 font-bold px-8 py-4 rounded-full overflow-hidden hover:text-white hover:border-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={20} />
                  <span>Get In Touch</span>
                </motion.a>
              </div>

              {/* Quick Stats */}
              <LiveStats />

              {/* Scroll Indicator */}
              <motion.div 
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
                  <div className="w-1 h-2 bg-gray-600 rounded-full mt-2"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating keyboard shortcuts hint */}
          <div className="fixed bottom-8 right-8 text-gray-500 text-sm space-y-1">
            <div>Press <kbd className="px-2 py-1 bg-gray-800 rounded">Cmd+K</kbd> for command palette</div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="max-w-6xl mx-auto px-6">
          {/* Education */}
          <section className="py-24 fade-in">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur border border-gray-800"
            >
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <Award className="text-yellow-400" />
                Education
              </h2>
              <h3 className="text-2xl font-bold text-yellow-400">{education.degree}</h3>
              <p className="text-xl text-gray-300">{education.university}</p>
              <p className="text-gray-500 mb-6">{education.date}</p>
              <div className="flex flex-wrap gap-2">
                {education.courses.map(course => (
                  <motion.span 
                    key={course} 
                    className="px-4 py-2 bg-gray-800 rounded-full text-sm"
                    whileHover={{ scale: 1.05, backgroundColor: '#374151' }}
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Research Experience - Interactive Timeline */}
          <section className="py-24 fade-in">
            <InteractiveTimeline items={researchExperience} title="Research Experience" />
          </section>

          {/* Projects Grid */}
          <section className="py-24 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-16">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
              ))}
            </div>
            <div className="text-center mt-12">
              <motion.button
                onClick={() => router.push('/projects')}
                className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold text-lg"
                whileHover={{ x: 5 }}
              >
                View All Projects <ArrowRight />
              </motion.button>
            </div>
          </section>

          {/* Skills - Enhanced Interactive Grid */}
          <section className="py-24 fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Technical Arsenal</h2>
            <SkillsShowcase />
          </section>

          {/* Leadership & Awards - Interactive Timeline */}
          <section className="py-24 fade-in">
            <InteractiveTimeline items={leadershipAndAwards} title="Leadership & Awards" />
          </section>

          {/* Enhanced CTA Section */}
          <section className="py-24 text-center fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="p-12 rounded-3xl bg-gradient-to-br from-yellow-400/20 to-orange-400/20 backdrop-blur border border-yellow-400/30"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                I'm always excited to work on challenging projects that push the boundaries 
                of AI and web development. Whether it's research collaboration or building 
                the next big thing, let's connect!
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <motion.a
                  href="/hire-pratham-patel"
                  className="inline-flex items-center gap-3 bg-yellow-400 text-black font-bold text-lg px-8 py-4 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Briefcase />
                  Hire Me
                </motion.a>
                <motion.a
                  href="/resume/Resume-17.pdf"
                  download
                  className="inline-flex items-center gap-3 bg-white text-black font-bold text-lg px-8 py-4 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download />
                  Download Resume
                </motion.a>
                <motion.a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gray-800 text-white font-bold text-lg px-8 py-4 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiGithub />
                  GitHub
                </motion.a>
              </div>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="py-16 border-t border-gray-800 fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-gray-500">
                © {new Date().getFullYear()} Pratham Patel. Crafted with passion and code.
              </p>
              <div className="flex gap-6">
                {[
                  { icon: FiGithub, link: socialLinks.github },
                  { icon: FiLinkedin, link: socialLinks.linkedin },
                  { icon: FiTwitter, link: socialLinks.twitter },
                  { icon: Mail, link: 'mailto:prathambiren2618@gmail.com' }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-yellow-400 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}