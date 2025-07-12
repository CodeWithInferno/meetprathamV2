'use client';

import { useState, useEffect } from "react"; // CORRECT: Use useEffect for data fetching
import { FiX, FiShare2, FiDownload, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Image from 'next/image';
import { createClient } from "@sanity/client"; // CORRECT: Use createClient
import imageUrlBuilder from "@sanity/image-url";

// CORRECT: Initialize Sanity client properly
const client = createClient({
  projectId: "1igdvz19",
  dataset: "production",
  useCdn: true,
  apiVersion: '2024-07-08',
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const firstImage = "/image-5.png";

export default function SneakPeak() {
  const [imagePosts, setImagePosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // CORRECT: Use useEffect for data fetching
  useEffect(() => {
    client
      .fetch(
        `*[_type == "imagePost"]{
          title,
          image{
            asset->{
              _id,
              url
            }
          }
        }`
      )
      .then((data) => {
        const postsWithImages = data.map((post) => {
          if (post.image) {
            post.image.url = urlFor(post.image.asset).url();
          }
          return post;
        });
        setImagePosts([firstImage, ...postsWithImages]);
      })
      .catch(console.error);
  }, []); // Empty dependency array runs this once on component mount

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentIndex(null);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : imagePosts.length - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex < imagePosts.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-4xl font-bold mb-4">Sneak Peak Images</h1>
        <p className="text-lg">Image Gallery with Sanity and Local Images</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-8">
        <div className="relative aspect-w-1 aspect-h-1 p-4 border-4 border-gray-500 rounded-lg shadow-lg">
          {/* CORRECTED: Using `fill` requires the parent to be relative, which it is. */}
          <Image
            src={firstImage}
            alt="Golden Gate Bridge"
            fill
            className="object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => openModal(0)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="relative z-10 text-center text-white pt-10 text-3xl font-bold">
            Golden Gate Bridge
          </div>
          <p className="relative z-10 pt-5 text-center text-lg">
            This is a gallery of pictures which I took or made using AI or other means. You can zoom and download any if you like.
          </p>
        </div>

        {imagePosts.length > 0 && imagePosts.slice(1).map((post, index) => (
            <div key={index + 1} className="relative aspect-w-1 aspect-h-1">
              {/* CORRECTED: Using `fill` for responsive grid items */}
              <Image
                src={post.image?.url}
                alt={post.title || 'Sneak peek image'}
                fill
                className="object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => openModal(index + 1)}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button className="absolute top-4 left-4 text-white text-3xl z-20" onClick={closeModal}>
            <FiX />
          </button>
          
          <div className="absolute top-4 right-4 flex space-x-4 z-20">
            {/* ... share and download buttons ... */}
          </div>

          <button className="absolute left-4 text-white text-3xl z-20" onClick={prevImage}>
            <FiArrowLeft />
          </button>

          <button className="absolute right-4 text-white text-3xl z-20" onClick={nextImage}>
            <FiArrowRight />
          </button>

          <div className="relative w-full h-4/5">
              {/* CORRECTED: Using `fill` for the large modal image */}
              <Image
                  src={ typeof imagePosts[currentIndex] === "string" ? imagePosts[currentIndex] : imagePosts[currentIndex]?.image?.url }
                  alt="Enlarged"
                  fill
                  className="object-contain rounded-lg shadow-lg"
                  sizes="100vw"
              />
          </div>

          <div className="absolute bottom-4 w-full px-10">
            <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
              {imagePosts.map((post, idx) => (
                // CORRECTED: Using fixed width and height for thumbnails
                <Image
                  key={idx}
                  src={typeof post === "string" ? post : post.image?.url}
                  alt="Thumbnail"
                  width={64} // Provide a fixed width
                  height={64} // Provide a fixed height
                  className={`object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 ${
                    idx === currentIndex ? "opacity-100 border-2 border-white" : "opacity-70"
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}