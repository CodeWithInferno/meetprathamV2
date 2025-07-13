// app/projects/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import Image from 'next/image'; // Import next/image

// Import the NEW themed components
import TerminalHeader from '@/app/Components/projects/TerminalHeader';
import TerminalFooter from '@/app/Components/projects/TerminalFooter';

// Sanity client setup
const client = sanityClient({ projectId: '1igdvz19', dataset: 'production', useCdn: false });
const builder = imageUrlBuilder(client);

// Helper function to get optimized image URLs from Sanity
// Use a placeholder blurDataURL. For production, generate actual blur hashes for each image.
const urlFor = (source, width = 1000) => {
    if (!source) return '';
    return builder.image(source).width(width).url();
};

const defaultBlurDataURL = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

// Typewriter effect hook
const useTypewriter = (text, speed = 20) => {
    const [displayText, setDisplayText] = useState('');
    const [playTyping] = useSound('/Audio/Typing.mp3', { volume: 0.3, interrupt: true }); // Move playTyping inside useTypewriter

    useEffect(() => {
        setDisplayText('');
        if (text) {
            let i = 0;
            playTyping(); // Play sound when typing starts
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
    }, [text, speed, playTyping]); // Include playTyping in dependencies
    return displayText;
};


export default function CyberpunkTerminal() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    // Make sure your audio file paths are correct in the /public directory
    // Corrected path for glitch sound (assuming you have a Glitch.mp3)
    const [playGlitch] = useSound('/Audio/Glitch.mp3', { volume: 0.4 });
    const [playHover] = useSound('/Audio/Hover.mp3', { volume: 0.2 });
    // playTyping is now handled within the useTypewriter hook

    const typedDescription = useTypewriter(selectedProject?.description || ''); // Ensure default value to prevent undefined

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectData = await client.fetch(`*[_type == "work"]{_id, title, "imageUrl": image.asset, gitLink, description, techStack}`);
                setProjects(projectData);
                if (projectData.length > 0) {
                    setSelectedProject(projectData[0]);
                    // playTyping() is now triggered by useTypewriter
                }
            } catch (error) { console.error('Error fetching projects:', error); }
        };
        fetchProjects();
    }, []);

    const handleSelectProject = (project) => {
        if (project._id === selectedProject?._id) return; // Don't re-select the same project
        playGlitch();
        // playTyping() is now triggered by useTypewriter via typedDescription update
        setSelectedProject(project);
    };

    return (
        <div className="terminal-container">
            <div className="scanline-overlay"></div>
            
            <TerminalHeader />

            <main className="terminal-grid">
                <div className="project-directory">
                    <div className="directory-header">[ /root/work ]</div>
                    <ul className="directory-list"> {/* Added class for potential styling */}
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
                                    {selectedProject.imageUrl && (
                                        <Image
                                            src={urlFor(selectedProject.imageUrl)}
                                            alt={selectedProject.title}
                                            fill // Image will fill its parent
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
                                            className="object-cover"
                                            priority={selectedProject._id === projects[0]?._id} // Prioritize first image for faster loading
                                            placeholder="blur" // Optional: blur-up placeholder
                                            blurDataURL={defaultBlurDataURL} // Use generated blurDataURL
                                        />
                                    )}
                                </div>
                                <div className="data-stream">
                                    <h3 className="data-title">{selectedProject.title}</h3>
                                    <p className="data-description">{typedDescription}<span className="cursor-blink">|</span></p>
                                    <div className="tech-stack">
                                        {selectedProject.techStack?.map(tech => <span key={tech} className="tech-tag">#{tech}</span>)}
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