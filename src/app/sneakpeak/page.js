'use client';

import { useEffect, useState } from "react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";

// Initialize Sanity client
const client = sanityClient({
  projectId: "1igdvz19",
  dataset: "production",
  useCdn: false, // Enable if you want to use the CDN
});

// Build image URLs from Sanity
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

// Path to your uploaded first image (Golden Gate Bridge)
const firstImage = "/image-5.png"; // Update this to the correct file path

export default function SneakPeak() {
  const [imagePosts, setImagePosts] = useState([]);

  // Fetch image posts from Sanity
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
        setImagePosts(postsWithImages);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-4xl font-bold mb-4">Sneak Peak Images</h1>
        <p className="text-lg">Image Gallery with Sanity and Local Images</p>
      </div>

      {/* VSCO-like Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-8">
        {/* Container for First Image (Golden Gate Bridge) */}
        <div className="relative aspect-w-1 aspect-h-1 p-4 border-4 border-gray-500 rounded-lg shadow-lg">
          <img
            src={firstImage}
            alt="Golden Gate Bridge"
            className="object-cover rounded-lg"
          />
          <div className="text-center text-white pt-10 text-3xl font-extra bold">
            Golden Gate Bridge
          </div>
          <p className="text-balance pt-5 text-center text-xl">
            This is a gallery of pictures which I took or made using AI or any other means. You can zoom and download any if you like.
          </p>
        </div>

        {/* Loop through Sanity Image Posts */}
        {imagePosts.length > 0 ? (
          imagePosts.map((post, index) => (
            <div key={index} className="relative aspect-w-1 aspect-h-1">
              {post.image?.url ? (
                <img
                  src={post.image.url}
                  alt={post.title}
                  className="object-cover rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center bg-gray-800 text-white h-full rounded-lg">
                  <p>{post.title}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">Loading...</p>
        )}
      </div>
    </div>
  );
}
