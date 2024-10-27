"use client";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import LoadingAnimation from "../../Components/ui/loader/loader";
import Head from "next/head";
import Link from "next/link"; // For linking to individual posts

// Sanity client initialization
const client = sanityClient({
  projectId: "1igdvz19",
  dataset: "production",
  useCdn: true,
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

// Fetch posts by category
async function getPostsByCategory(category) {
  const query = `
    *[_type == "post" && "${category}" in topics[]->slug.current] {
      title,
      slug,
      publishedAt,
      banner {
        asset -> {
          _id,
          url
        }
      },
      topics[]->{
        title,
        slug
      },
      description
    }
  `;

  const data = await client.fetch(query);

  // Ensure the banner URL is set correctly
  return data.map(post => {
    if (post.banner) {
      post.banner.url = urlFor(post.banner.asset).url();
    }
    return post;
  });
}

export default function CategoryBlogList({ params }) {
  const { category } = params || {};
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the posts by category
  useEffect(() => {
    if (category) {
      getPostsByCategory(category).then(fetchedPosts => {
        setPosts(fetchedPosts);
        setLoading(false);
      });
    }
  }, [category]);

  if (loading) {
    return (
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Category: {category}</title>
        <meta property="og:title" content={`Category: ${category}`} />
      </Head>

      <div className="bg-gray-100 text-black font-serif">
        <Header />

        <div className="text-center py-4">
          <h1 className="text-2xl font-bold">Category: {category}</h1>
        </div>

        <div className="bg-white text-black min-h-screen flex flex-col items-center px-4">
          {/* Grid to display posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            {posts.map((post, index) => (
              <Link key={index} href={`/blogs/${post.slug.current}`}>
                <div className="card bg-white rounded-xl overflow-hidden shadow-lg h-auto w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto cursor-pointer transform transition-all duration-300 hover:scale-105">
                  {post.banner && (
                    <img
                      className="h-56 w-full object-cover"
                      src={post.banner.url}
                      alt={post.title}
                    />
                  )}
                  <div className="p-4">
                    <h2 className="mt-2 font-bold text-lg sm:text-xl">{post.title}</h2>
                    <p className="mt-2 text-sm text-gray-500">{post.description}</p>

                    {/* Display topics */}
                    <div className="flex flex-wrap mt-2">
                      {post.topics &&
                        post.topics.map((topic, i) => (
                          <span key={i} className="text-xs text-gray-600 mr-2">
                            {topic.title}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
