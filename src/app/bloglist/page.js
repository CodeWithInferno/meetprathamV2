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
  useCdn: false, // Enable if you want to use the CDN
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
        data = data.map(post => {
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 p-8">
        {postData &&
          postData.map((post, index) => (
            <Link key={index} href={"/blogs/" + post.slug.current}>
              <div className="card max-w-md mx-auto bg-white rounded-xl md:max-w-2xl  overflow-hidden shadow-lg h-96 w-60 md:w-80 cursor-pointer m-auto transform transition-all duration-300 hover:scale-105">
                <img className="h-56 w-full object-cover" src={post.banner?.url} alt={post.title} />
                <div className="p-2">
                  <h2 className="mt-4 font-bold text-xl">{post.title}</h2>
                  <p className="mt-2 text-sm text-gray-500">{post.description}</p>
                </div>
                <div className="px-3">
                  
                </div>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </div>
  );
}