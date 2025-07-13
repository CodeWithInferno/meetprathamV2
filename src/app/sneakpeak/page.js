'use client';

import { useState, useEffect } from "react";
import Image from 'next/image';
import { createClient } from "@sanity/client";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { FiArrowLeft, FiArrowRight, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

// --- Sanity Client ---
const client = createClient({
  projectId: "1igdvz19",
  dataset: "production",
  useCdn: true,
  apiVersion: '2024-07-08',
});

// --- Main Component ---
export default function SneakPeak() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(-1);
  const [loading, setLoading] = useState(true);

  const layouts = ['square', 'portrait', 'square', 'landscape', 'square', 'portrait'];

  useEffect(() => {
    client
      .fetch(`*[_type == "imagePost"]{ title, "imageUrl": image.asset->url, "altText": title }`)
      .then((data) => {
        const processedImages = data.map((post, i) => ({
          src: post.imageUrl,
          alt: post.altText || 'Image',
          title: post.title,
          layout: layouts[i % layouts.length], 
        }));
        setImages(processedImages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const slides = images.map(({ src, title }) => ({ src, title }));
  
  const getGridItemClasses = (layout) => {
    switch (layout) {
      case 'portrait':
        return 'md:col-span-1 md:row-span-2 aspect-[2/3]'; // On mobile, portrait images are square to prevent awkward gaps
      case 'landscape':
        return 'col-span-2 md:row-span-1 aspect-[4/3]';
      case 'square':
      default:
        return 'col-span-1 row-span-1 aspect-square';
    }
  };

  return (
    <div className="bg-[#111] text-neutral-300 min-h-screen font-sans">
      
      {/* Header remains centered and focused */}
      <header className="max-w-5xl mx-auto px-6 md:px-8 pt-24 pb-16">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-medium text-neutral-200 tracking-wide"
        >
          Sneak Peek
        </motion.h1>
      </header>
      
      {/* THE FIX: Main content area is now fluid with padding, not max-width */}
      <main className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pb-24">
        {loading ? (
          <div className="text-center text-neutral-500">Loading...</div>
        ) : (
          <motion.div
            // THE FIX: Added more column breakpoints for large screens
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } },
            }}
          >
            {images.map((image, idx) => (
              <motion.div
                key={image.src + idx} // More robust key
                className={`relative cursor-pointer group overflow-hidden rounded-[4px] ${getGridItemClasses(image.layout)}`}
                onClick={() => setIndex(idx)}
                variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                layout
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:brightness-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Lightbox remains unchanged */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.9)" } }}
        animation={{ fade: 300, swipe: 250 }}
        controller={{ closeOnBackdropClick: true }}
        render={{
          buttonPrev: () => (
            <button className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-4xl z-20 transition-colors">
              <FiArrowLeft />
            </button>
          ),
          buttonNext: () => (
            <button className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-4xl z-20 transition-colors">
              <FiArrowRight />
            </button>
          ),
          buttonClose: () => (
            <button onClick={() => setIndex(-1)} className="absolute top-4 right-4 md:top-6 md:right-6 text-neutral-400 hover:text-white text-3xl z-20 transition-colors">
              <FiX />
            </button>
          ),
        }}
      />
    </div>
  );
}