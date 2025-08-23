// app/projects/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import Image from 'next/image';
import Link from 'next/link';

// Sanity client setup
const client = sanityClient({ projectId: '1igdvz19', dataset: 'production', useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => source ? builder.image(source).url() : '';

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [hoveredProject, setHoveredProject] = useState(null);

    const [playClick] = useSound('/Audio/Click.mp3', { volume: 0.3 });

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectData = await client.fetch(`
                    *[_type == "work"] | order(_createdAt asc) {
                        _id, title, "imageUrl": image.asset, gitLink, description, techStack
                    }`);
                setProjects(projectData);
                if (projectData.length > 0) {
                    setSelectedProject(projectData[0]);
                }
            } catch (error) { console.error('Error fetching projects:', error); }
        };
        fetchProjects();
    }, []);

    const handleSelectProject = (project) => {
        playClick();
        setSelectedProject(project);
    };

    const displayProject = hoveredProject || selectedProject;

    return (
        <div className="min-h-screen w-full bg-neutral-100 text-black font-sans">
            <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
                
                {/* --- THE INDEX (LEFT SIDE) - UNCHANGED --- */}
                <div className="flex flex-col justify-between p-8 md:p-12 border-r border-neutral-300">
                    <div>
                        <h1 className="text-xl font-bold">[ INDEX ]</h1>
                        <ul className="mt-16">
                            {projects.map((project, index) => (
                                <li key={project._id}>
                                    <button
                                        className={`project-list-item w-full text-left text-4xl lg:text-6xl font-bold py-4 transition-colors ${selectedProject?._id === project._id ? 'selected text-black' : 'text-neutral-400 hover:text-black'}`}
                                        onClick={() => handleSelectProject(project)}
                                        onMouseEnter={() => setHoveredProject(project)}
                                        onMouseLeave={() => setHoveredProject(null)}
                                    >
                                        <span className="text-neutral-300 mr-4">{String(index + 1).padStart(2, '0')}</span>
                                        {project.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link href="/home" className="font-bold text-lg hover:underline">[ Home ]</Link>
                </div>

                {/* --- THE CANVAS (RIGHT SIDE) - REBUILT FOR READABILITY --- */}
                <div className="relative h-screen md:sticky top-0 overflow-hidden">
                    <AnimatePresence>
                        {displayProject?.imageUrl && (
                            <motion.div
                                key={displayProject._id + "-image"}
                                className="absolute inset-0 z-0"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Image
                                    src={urlFor(displayProject.imageUrl)}
                                    alt={displayProject.title}
                                    fill
                                    sizes="50vw"
                                    className="object-cover"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* --- THE FIX: Frosted Glass Content Overlay --- */}
                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-12">
                        <AnimatePresence mode="wait">
                            {selectedProject && (
                                <motion.div
                                    key={selectedProject._id + "-content"}
                                    // This container now has the blurred background
                                    className="relative bg-black/40 text-white p-6 md:p-8 rounded-lg backdrop-blur-lg border border-white/10 shadow-2xl"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{selectedProject.title}</h2>
                                    <p className="text-base md:text-lg leading-relaxed max-w-xl text-neutral-200">
                                        {selectedProject.description}
                                    </p>
                                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6 text-sm text-neutral-300">
                                        {selectedProject.techStack?.map(tech => <span key={tech}>#{tech}</span>)}
                                    </div>
                                    {selectedProject.gitLink && (
                                        <a href={selectedProject.gitLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-8 text-lg font-bold group text-yellow-300 hover:text-yellow-200">
                                            View Project
                                            <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 ml-2">→</span>
                                        </a>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
}