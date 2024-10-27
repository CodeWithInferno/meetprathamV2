// 'use client';
// import { useEffect, useState } from "react";
// import Link from 'next/link';
// import imageUrlBuilder from "@sanity/image-url";
// import sanityClient from "@sanity/client";
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";

// const client = sanityClient({
//   projectId: "1igdvz19",
//   dataset: "production",
//   useCdn: false,
// });

// const builder = imageUrlBuilder(client);
// function urlFor(source) {
//   return builder.image(source);
// }

// export default function BlogList() {
//   const [postData, setPostData] = useState(null);

//   useEffect(() => {
//     client
//       .fetch(
//         `*[_type == "post"]{
//           title,
//           slug,
//           description,
//           banner{
//             asset->{
//               _id
//             }
//           },
//           topics[]->{
//             title,
//             slug,
//             description
//           }
//         }`
//       )
//       .then((data) => {
//         data = data.map((post) => {
//           if (post.banner) {
//             post.banner.url = urlFor(post.banner.asset).url();
//           }
//           return post;
//         });
//         setPostData(data);
//       })
//       .catch(console.error);
//   }, []);
  

//   return (
//     <div className="min-h-screen bg-white bg-no-repeat">
//       <Header />
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
//         {postData &&
//           postData.map((post, index) => (
//             <Link key={index} href={"/blogs/" + post.slug.current}>
//               <div className="card bg-white rounded-xl overflow-hidden shadow-lg h-auto w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto cursor-pointer transform transition-all duration-300 hover:scale-105">
//                 <img
//                   className="h-56 w-full object-cover"
//                   src={post.banner?.url}
//                   alt={post.title}
//                 />
//                 <div className="p-4">
//                   <h2 className="mt-2 font-bold text-lg sm:text-xl">{post.title}</h2>
//                   <p className="mt-2 text-sm text-gray-500">{post.description}</p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//       </div>
//       <Footer />
//     </div>
//   );
// }







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
  const [categories, setCategories] = useState([]);

  // Fetch posts
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
          },
          topics[]->{
            title,
            slug,
            description
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

  // Fetch categories (topics)
  useEffect(() => {
    client
      .fetch(
        `*[_type == "topic"]{
          title,
          slug
        }`
      )
      .then((data) => {
        setCategories(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-white bg-no-repeat">
      <Header />

      {/* Category Buttons */}
      <div className="flex justify-center space-x-4 px-5 mt-4">
        {categories &&
          categories.map((category, index) => (
            <Link key={index} href={`/bloglist/${category.slug.current}`}>
              <button className="bg-transparent  text-black border font-bold py-1 px-4 rounded">
                {category.title}
              </button>
            </Link>
          ))}
      </div>

      {/* Blog Posts Grid */}
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

                  {/* Display Categories as Links */}
                  <div className="flex flex-wrap mt-2">
                    {post.topics &&
                      post.topics.map((topic, i) => (
                        <Link key={i} href={`/bloglist/${topic.slug.current}`}>
                          <span className="text-gray-500 hover:text-blue-700 py-2 m-1 rounded-lg transition duration-300 ease-in-out text-xs">
                            {topic.title}
                          </span>
                        </Link>
                      ))}
                  </div>

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
