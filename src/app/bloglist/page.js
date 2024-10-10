'use client';
import { useEffect, useState } from "react";
import Link from 'next/link';
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const client = sanityClient({
  projectId: "1igdvz19",
  dataset: "production",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function BlogList() {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"]{
          title,
          slug,
          description,
          banner{
            asset->{
              _id
            }
          }
        }`
      )
      .then((data) => {
        data = data.map((post) => {
          if (post.banner) {
            post.banner.url = urlFor(post.banner.asset).url();
          }
          return post;
        });
        setPostData(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-white bg-no-repeat">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {postData &&
          postData.map((post, index) => (
            <Link key={index} href={"/blogs/" + post.slug.current}>
              <div className="card bg-white rounded-xl overflow-hidden shadow-lg h-auto w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto cursor-pointer transform transition-all duration-300 hover:scale-105">
                <img
                  className="h-56 w-full object-cover"
                  src={post.banner?.url}
                  alt={post.title}
                />
                <div className="p-4">
                  <h2 className="mt-2 font-bold text-lg sm:text-xl">{post.title}</h2>
                  <p className="mt-2 text-sm text-gray-500">{post.description}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </div>
  );
}