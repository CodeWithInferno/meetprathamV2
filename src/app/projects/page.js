// app/projects/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';

// Import the NEW themed components
import TerminalHeader from '@/app/Components/projects/TerminalHeader';
import TerminalFooter from '@/app/Components/projects/TerminalFooter';

// Sanity client setup
const client = sanityClient({ projectId: '1igdvz19', dataset: 'production', useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => source ? builder.image(source) : '';

// Typewriter effect hook
const useTypewriter = (text, speed = 20) => {
    const [displayText, setDisplayText] = useState('');
    useEffect(() => {
        setDisplayText('');
        if (text) {
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(prev => prev + text.charAt(i));
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, speed);
            return () => clearInterval(typingInterval);
        }
    }, [text, speed]);
    return displayText;
};


export default function CyberpunkTerminal() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    // Make sure your audio file paths are correct in the /public directory
    const [playGlitch] = useSound('/Audio/', { volume: 0.4 });
    const [playHover] = useSound('/Audio/Hover.mp3', { volume: 0.2 });
    const [playTyping] = useSound('/Audio/Typing.mp3', { volume: 0.3, interrupt: true });

    const typedDescription = useTypewriter(selectedProject?.description);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectData = await client.fetch(`*[_type == "work"]{_id, title, "imageUrl": image.asset, gitLink, description, techStack}`);
                setProjects(projectData);
                if (projectData.length > 0) {
                    setSelectedProject(projectData[0]);
                    playTyping();
                }
            } catch (error) { console.error('Error fetching projects:', error); }
        };
        fetchProjects();
    }, []);

    const handleSelectProject = (project) => {
        if (project._id === selectedProject?._id) return; // Don't re-select the same project
        playGlitch();
        playTyping();
        setSelectedProject(project);
    };

    return (
        <div className="terminal-container">
            <div className="scanline-overlay"></div>
            
            <TerminalHeader />

            <main className="terminal-grid">
                <div className="project-directory">
                    <div className="directory-header">[ /root/work ]</div>
                    <ul>
                        {projects.map(project => (
                            <li 
                                key={project._id} 
                                className={`directory-item ${selectedProject?._id === project._id ? 'selected' : ''}`}
                                onClick={() => handleSelectProject(project)}
                                onMouseEnter={() => playHover()}
                            >
                                <span className="item-prefix">  </span> {project.title}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="display-panel">
                    <AnimatePresence mode="wait">
                        {selectedProject && (
                            <motion.div
                                key={selectedProject._id}
                                className="display-content"
                                initial={{ opacity: 0, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, filter: 'blur(10px)' }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="image-crt-wrapper">
                                    <img src={urlFor(selectedProject.imageUrl).width(1000).url()} alt={selectedProject.title} />
                                </div>
                                <div className="data-stream">
                                    <h3 className="data-title">{selectedProject.title}</h3>
                                    <p className="data-description">{typedDescription}<span className="cursor-blink">|</span></p>
                                    <div className="tech-stack">
                                        {selectedProject.techStack?.map(tech => <span key={tech}>#{tech}</span>)}
                                    </div>
                                    {selectedProject.gitLink && (
                                        <a href={selectedProject.gitLink} target="_blank" rel="noopener noreferrer" className="data-link">[ EXECUTE_LINK ]</a>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <TerminalFooter />
        </div>
    );
}