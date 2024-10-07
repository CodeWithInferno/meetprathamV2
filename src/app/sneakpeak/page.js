// 'use client';

// import { useEffect, useState } from "react";
// import imageUrlBuilder from "@sanity/image-url";
// import sanityClient from "@sanity/client";

// // Initialize Sanity client
// const client = sanityClient({
//   projectId: "1igdvz19",
//   dataset: "production",
//   useCdn: false, // Enable if you want to use the CDN
// });

// // Build image URLs from Sanity
// const builder = imageUrlBuilder(client);
// function urlFor(source) {
//   return builder.image(source);
// }

// // Path to your uploaded first image (Golden Gate Bridge)
// const firstImage = "/image-5.png"; // Update this to the correct file path

// export default function SneakPeak() {
//   const [imagePosts, setImagePosts] = useState([]);

//   // Fetch image posts from Sanity
//   useEffect(() => {
//     client
//       .fetch(
//         `*[_type == "imagePost"]{
//           title,
//           image{
//             asset->{
//               _id,
//               url
//             }
//           }
//         }`
//       )
//       .then((data) => {
//         const postsWithImages = data.map((post) => {
//           if (post.image) {
//             post.image.url = urlFor(post.image.asset).url();
//           }
//           return post;
//         });
//         setImagePosts(postsWithImages);
//       })
//       .catch(console.error);
//   }, []);

//   return (
//     <div className="bg-black text-white min-h-screen">
//       {/* Header Section */}
//       <div className="flex flex-col items-center justify-center py-10">
//         <h1 className="text-4xl font-bold mb-4">Sneak Peak Images</h1>
//         <p className="text-lg">Image Gallery with Sanity and Local Images</p>
//       </div>

//       {/* VSCO-like Grid Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-8">
//         {/* Container for First Image (Golden Gate Bridge) */}
//         <div className="relative aspect-w-1 aspect-h-1 p-4 border-4 border-gray-500 rounded-lg shadow-lg">
//           <img
//             src={firstImage}
//             alt="Golden Gate Bridge"
//             className="object-cover rounded-lg"
//           />
//           <div className="text-center text-white pt-10 text-3xl font-extra bold">
//             Golden Gate Bridge
//           </div>
//           <p className="text-balance pt-5 text-center text-xl">
//             This is a gallery of pictures which I took or made using AI or any other means. You can zoom and download any if you like.
//           </p>
//         </div>

//         {/* Loop through Sanity Image Posts */}
//         {imagePosts.length > 0 ? (
//           imagePosts.map((post, index) => (
//             <div key={index} className="relative aspect-w-1 aspect-h-1">
//               {post.image?.url ? (
//                 <img
//                   src={post.image.url}
//                   alt={post.title}
//                   className="object-cover rounded-lg"
//                 />
//               ) : (
//                 <div className="flex items-center justify-center bg-gray-800 text-white h-full rounded-lg">
//                   <p>{post.title}</p>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-center col-span-full">Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// }








'use client';

import { useState } from "react";
import { FiX, FiShare2, FiDownload, FiArrowLeft, FiArrowRight } from "react-icons/fi"; // Icons
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";

// Initialize Sanity client
const client = sanityClient({
  projectId: "1igdvz19",
  dataset: "production",
  useCdn: false,
});

// Build image URLs from Sanity
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const firstImage = "/image-5.png"; // Path to the local image

export default function SneakPeak() {
  const [imagePosts, setImagePosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null); // Track current image index
  const [isModalOpen, setIsModalOpen] = useState(false); // Toggle modal

  // Fetch image posts from Sanity
  useState(() => {
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
        setImagePosts([firstImage, ...postsWithImages]); // Adding the first image manually to the gallery
      })
      .catch(console.error);
  }, []);

  // Open modal with selected image
  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentIndex(null);
  };

  // Navigate carousel to previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : imagePosts.length - 1));
  };

  // Navigate carousel to next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex < imagePosts.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-4xl font-bold mb-4">Sneak Peak Images</h1>
        <p className="text-lg">Image Gallery with Sanity and Local Images</p>
      </div>

      {/* VSCO-like Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-8">
        {/* Special Section for Golden Gate Bridge */}
        <div className="relative aspect-w-1 aspect-h-1 p-4 border-4 border-gray-500 rounded-lg shadow-lg">
          <img
            src={firstImage}
            alt="Golden Gate Bridge"
            className="object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => openModal(0)} // Open modal for the first image
          />
          <div className="text-center text-white pt-10 text-3xl font-bold">
            Golden Gate Bridge
          </div>
          <p className="pt-5 text-center text-lg">
            This is a gallery of pictures which I took or made using AI or other means. You can zoom and download any if you like.
          </p>
        </div>

        {/* Loop through Sanity Image Posts */}
        {imagePosts.length > 0 ? (
          imagePosts.slice(1).map((post, index) => ( // Slice(1) to skip the manually added first image
            <div key={index + 1} className="relative aspect-w-1 aspect-h-1">
              <img
                src={post.image?.url}
                alt={post.title}
                className="object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => openModal(index + 1)} // Open modal on click
              />

            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No images found.</p>
        )}
      </div>

      {/* Modal for Enlarged Image */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            className="absolute top-4 left-4 text-white text-3xl"
            onClick={closeModal}
          >
            <FiX />
          </button>

          {/* Share and Download Buttons */}
          <div className="absolute top-4 right-4 flex space-x-4">
            <button className="text-white text-2xl">
              <FiShare2 />
            </button>
            <a
              href={typeof imagePosts[currentIndex] === "string"
                ? imagePosts[currentIndex]
                : imagePosts[currentIndex]?.image?.url}
              download
              className="text-white text-2xl"
            >
              <FiDownload />
            </a>
          </div>

          {/* Carousel Arrows */}
          <button
            className="absolute left-4 text-white text-3xl hover:scale-125 transition-transform duration-200"
            onClick={prevImage}
          >
            <FiArrowLeft />
          </button>

          <button
            className="absolute right-4 text-white text-3xl hover:scale-125 transition-transform duration-200"
            onClick={nextImage}
          >
            <FiArrowRight />
          </button>

          {/* Enlarged Image */}
          <img
            src={
              typeof imagePosts[currentIndex] === "string"
                ? imagePosts[currentIndex]
                : imagePosts[currentIndex]?.image?.url
            }
            alt="Enlarged"
            className="object-contain h-4/5 rounded-lg shadow-lg"
          />

          {/* Thumbnails/Carousel at Bottom */}
          <div className="absolute bottom-4 w-full px-10">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {imagePosts.map((post, idx) => (
                <img
                  key={idx}
                  src={typeof post === "string" ? post : post.image?.url}
                  alt="Thumbnail"
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 ${
                    idx === currentIndex ? "opacity-100" : "opacity-70"
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
