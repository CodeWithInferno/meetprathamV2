// app/Components/projects/ProjectCard.jsx
'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // <-- IMPORT NEXT/IMAGE


// Helper for the text scramble effect
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

export default function ProjectCard({ project }) {
  const titleRef = useRef(null);
  let interval = null;

  const handleMouseOver = () => {
    let iteration = 0;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
      titleRef.current.innerText = titleRef.current.innerText
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return titleRef.current.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * letters.length)]
        })
        .join("");
      
      if(iteration >= titleRef.current.dataset.value.length){ 
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
  }

  return (
    <motion.section 
      className="project-card-container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="text-content">
        <motion.h3 
          ref={titleRef}
          data-value={project.title}
          className="glitch-text text-5xl sm:text-7xl font-extrabold uppercase mb-4"
          onMouseOver={handleMouseOver}
        >
          {project.title}
        </motion.h3>
        <p className="text-lg uppercase max-w-2xl mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack?.map(tech => (
                <span key={tech} className="tech-tag">{tech}</span>
            ))}
        </div>
        {project.gitLink && (
          <motion.a
            href={project.gitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="view-project-button"
            whileHover={{ scale: 1.05, rotate: -1 }}
          >
            View Project →
          </motion.a>
        )}
      </div>

      <motion.div 
        className="image-container"
        whileHover="hover"
      >
        <motion.div 
          className="image-glitch-effect"
          variants={{
            hover: {
              clipPath: "inset(0% 0% 0% 0%)",
              transition: { duration: 0.4, ease: "circIn" }
            }
          }}
          initial={{
            clipPath: "inset(50% 50% 50% 50%)",
          }}
        />
        <Image
          src={project.imageUrl}
          alt={project.title}
          className="project-image"
        />
      </motion.div>
    </motion.section>
  );
}