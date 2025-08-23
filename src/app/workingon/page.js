'use client';

import React, { useState, useEffect } from 'react';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { motion } from 'framer-motion';
import ArtisticHeader from "../Components/Reusable/Header";
import ArtisticFooter from "../Components/Reusable/Footer";
import Image from 'next/image';

const client = sanityClient({
  projectId: '1igdvz19',
  dataset: 'production',
  useCdn: false,
});
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function CreativeBrutalistPortfolio() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageData = await client.fetch('*[_type == "work"]{title, "imageUrl": image.asset->url, gitLink, description}');
        setImages(imageData);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  return (

    <div className="relative min-h-screen bg-black text-white font-mono overflow-hidden">

      {/* Animated drifting shapes */}
      <motion.div
        className="absolute top-0 left-0 w-40 h-40 bg-pink-500 opacity-30 mix-blend-difference z-10"
        animate={{ y: [0, 100, 0], x: [0, -100, 0], rotate: [0, 15, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-400 opacity-20 mix-blend-difference z-10"
        animate={{ y: [0, -80, 0], x: [0, 120, 0], rotate: [0, -10, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <ArtisticHeader />

      <main className="relative z-20 space-y-40">
        {images.map((image, index) => (
          <section
            key={index}
            className={`min-h-screen flex flex-col justify-center px-6 sm:px-20 py-24 relative overflow-hidden ${
              index % 2 === 0 ? 'bg-yellow-300 text-black' : 'bg-pink-500 text-black'
            }`}
          >
            {/* Parallax layered giant text */}
            <motion.h2
              className="absolute text-[20vw] font-extrabold uppercase opacity-10 pointer-events-none select-none whitespace-nowrap"
              initial={{ x: -500 }}
              animate={{ x: 0 }}
              transition={{ duration: 1.5, delay: index * 0.5 }}
            >
              {image.title}
            </motion.h2>

            <div className="relative flex flex-col gap-10 z-10 max-w-5xl">
              {/* Project image with interactive motion */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? -2 : 2 }}
                className="w-full border-[12px] border-black shadow-[20px_20px_0_#000]"
              >
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-[60vh] object-cover grayscale hover:grayscale-0 transition duration-700"
                  width={800}
                  height={600}
                />
              </motion.div>

              {/* Animated project title & description */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <h3 className="text-5xl sm:text-7xl font-extrabold uppercase tracking-tight leading-none mb-6">
                  {image.title}
                </h3>
                <p className="text-xl uppercase font-bold leading-tight mb-8 max-w-3xl">
                  {image.description}
                </p>
              </motion.div>

              {image.gitLink && (
                <motion.a
                  href={image.gitLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  className="inline-block uppercase font-extrabold py-4 px-8 text-2xl bg-black text-yellow-300 border-8 border-black shadow-[8px_8px_0_#ff00ff] transition-all duration-500"
                >
                  View Project →
                </motion.a>
              )}
            </div>
          </section>
        ))}
        <ArtisticFooter />
      </main>
    </div>

  );
}