



// "use client";
// import sanityClient from "@sanity/client";
// import imageUrlBuilder from "@sanity/image-url";
// import { useEffect, useState } from "react";
// import Header from "../../Components/Header";
// import Footer from "../../Components/Footer";
// import BlockContent from "@sanity/block-content-to-react";
// import LoadingAnimation from "../../Components/ui/loader/loader";
// import Head from "next/head"; // Import the Head component

// const client = sanityClient({
//   projectId: "1igdvz19",
//   dataset: "production",
//   useCdn: true,
// });

// const builder = imageUrlBuilder(client);
// function urlFor(source) {
//   return builder.image(source);
// }

// async function getData(slug) {
//   const query = `
//     *[_type == "post" && slug.current == '${slug}'] {
//       "CurrentSlug": slug.current,
//       title, 
//       publishedAt,
//       body[]{
//         ...,
//         asset->{
//           _id,
//           url
//         }
//       }
//     }[0]
//   `;
//   const data = await client.fetch(query);

//   // Check if data and data.body exist
//   if (data && data.body) {
//     data.body = data.body.map((block) => {
//       if (block.asset) {
//         block.asset.url = urlFor(block.asset).url();
//       }
//       return block;
//     });
//   }

//   return data;
// }

// export default function BlogArticle({ params }) {
//   const { slug } = params || {};
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     getData(slug).then(setData);
//   }, [slug]);

//   if (!data)
//     return (
//       <div className="bg-white text-black min-h-screen flex items-center justify-center">
//         <div>
//           <LoadingAnimation />
//         </div>
//       </div>
//     );

//   const featuredImage = data.body.find((block) => block.asset)?.asset.url || "";

//   return (
//     <>
// <Head>
//   {/* Open Graph Meta Tags for Facebook, LinkedIn */}
//   <meta property="og:title" content={data.title} />
//   <meta property="og:description" content={`Published on: ${new Date(data.publishedAt).toLocaleDateString()}`} />
//   <meta property="og:image" content={featuredImage} />
//   <meta property="og:url" content={`https://meetpratham-v2.vercel.app/blogs/${slug}`} />
//   <meta property="og:type" content="article" />
//   <meta property="og:locale" content="en_US" />

//   {/* Optional Open Graph Tags */}
//   <meta property="og:site_name" content="Your Website Name" />
//   <meta property="article:author" content="Author Name" />
//   <meta property="article:published_time" content={new Date(data.publishedAt).toISOString()} />
//   <meta property="article:modified_time" content={new Date().toISOString()} />
//   <meta property="og:image:width" content="1200" />
//   <meta property="og:image:height" content="630" />
//   <meta property="og:image:alt" content="An image representing the blog post" />

//   {/* Twitter Meta Tags */}
//   <meta name="twitter:card" content="summary_large_image" />
//   <meta name="twitter:title" content={data.title} />
//   <meta name="twitter:description" content={`Published on: ${new Date(data.publishedAt).toLocaleDateString()}`} />
//   <meta name="twitter:image" content={featuredImage} />
//   <meta name="twitter:site" content="@YourTwitterHandle" />
//   <meta name="twitter:creator" content="@AuthorTwitterHandle" />

//   {/* Fallback Image */}
//   <meta name="twitter:image:alt" content="An image representing the blog post" />

//   {/* Canonical URL (SEO) */}
//   <link rel="canonical" href={`https://meetpratham-v2.vercel.app/blogs/${slug}`} />
// </Head>


//       <div className="bg-gray-100 text-black font-serif">
//         <Header />

//         <div className="bg-white text-black min-h-screen flex flex-col items-center px-4">
//           <div className="mt-12 w-full mb-28 max-w-2xl sm:max-w-3xl px-4 sm:px-8 py-8 bg-white shadow-lg rounded-lg mx-auto transition-all duration-300 transform hover:shadow-2xl">
//             <h1 className="font-bold text-4xl sm:text-5xl text-center mb-6 text-gray-800 break-words">
//               {data.title}
//             </h1>
//             <p className="text-gray-500 text-center text-sm sm:text-base mb-8">
//               Published on: {new Date(data.publishedAt).toLocaleDateString()}
//             </p>

//             <div className="space-y-6">
//               {/* Ensure data.body exists before mapping */}
//               {data.body && data.body.map((block, index) => (
//                 <div key={index} className="my-4">
//                   {block._type === "block" && (
//                     <BlockContent
//                       blocks={block}
//                       projectId="1igdvz19"
//                       dataset="production"
//                       className="text-base sm:text-lg leading-relaxed text-gray-700"
//                     />
//                   )}
//                   {block.asset && (
//                     <div className="my-6 flex justify-center">
//                       <img
//                         className="rounded-lg border border-gray-300 shadow-lg transition-transform duration-300 transform hover:scale-105"
//                         src={block.asset.url}
//                         alt="Blog Image"
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// }












// "use client";
// import sanityClient from "@sanity/client";
// import imageUrlBuilder from "@sanity/image-url";
// import { useEffect, useState } from "react";
// import Header from "../../Components/Header";
// import Footer from "../../Components/Footer";
// import BlockContent from "@sanity/block-content-to-react";
// import LoadingAnimation from "../../Components/ui/loader/loader";
// import Head from "next/head"; // Import the Head component
// import Comment from "../../Components/Comment";
// import Like from "../../Components/like";

// const client = sanityClient({
//   projectId: "1igdvz19",
//   dataset: "production",
//   useCdn: true,
// });

// const builder = imageUrlBuilder(client);
// function urlFor(source) {
//   return builder.image(source);
// }

// async function getData(slug) {
//   const query = `
//     *[_type == "post" && slug.current == '${slug}'] {
//       "CurrentSlug": slug.current,
//       title, 
//       publishedAt,
//       body[]{
//         ...,
//         asset->{
//           _id,
//           url
//         }
//       }
//     }[0]
//   `;
//   const data = await client.fetch(query);
//   console.log(slug);

//   // Check if data and data.body exist
//   if (data && data.body) {
//     data.body = data.body.map((block) => {
//       if (block.asset) {
//         block.asset.url = urlFor(block.asset).url();
//       }
//       return block;
//     });
//   }

//   return data;
// }

// export default function BlogArticle({ params }) {
//   const { slug } = params || {};
//   const [data, setData] = useState(null);
//   const [commentList, setCommentList] = useState([]);

//   useEffect(() => {
//     getData(slug).then((fetchedData) => {
//       setData(fetchedData);
//       setCommentList(fetchedData?.comments || []);
//     });
//   }, [slug]);

//   if (!data)
//     return (
//       <div className="bg-white text-black min-h-screen flex items-center justify-center">
//         <div>
//           <LoadingAnimation />
//         </div>
//       </div>
//     );

//   const featuredImage = data.body.find((block) => block.asset)?.asset.url || "";

//   return (
//     <>
// <Head>
//   {/* Open Graph Meta Tags for Facebook, LinkedIn */}
//   <meta property="og:title" content={data.title} />
//   <meta property="og:description" content={`Published on: ${new Date(data.publishedAt).toLocaleDateString()}`} />
//   <meta property="og:image" content={featuredImage} />
//   <meta property="og:url" content={`https://meetpratham-v2.vercel.app/blogs/${slug}`} />
//   <meta property="og:type" content="article" />
//   <meta property="og:locale" content="en_US" />

//   {/* Optional Open Graph Tags */}
//   <meta property="og:site_name" content="Your Website Name" />
//   <meta property="article:author" content="Author Name" />
//   <meta property="article:published_time" content={new Date(data.publishedAt).toISOString()} />
//   <meta property="article:modified_time" content={new Date().toISOString()} />
//   <meta property="og:image:width" content="1200" />
//   <meta property="og:image:height" content="630" />
//   <meta property="og:image:alt" content="An image representing the blog post" />

//   {/* Twitter Meta Tags */}
//   <meta name="twitter:card" content="summary_large_image" />
//   <meta name="twitter:title" content={data.title} />
//   <meta name="twitter:description" content={`Published on: ${new Date(data.publishedAt).toLocaleDateString()}`} />
//   <meta name="twitter:image" content={featuredImage} />
//   <meta name="twitter:site" content="@YourTwitterHandle" />
//   <meta name="twitter:creator" content="@AuthorTwitterHandle" />

//   {/* Fallback Image */}
//   <meta name="twitter:image:alt" content="An image representing the blog post" />

//   {/* Canonical URL (SEO) */}
//   <link rel="canonical" href={`https://meetpratham-v2.vercel.app/blogs/${slug}`} />
// </Head>


//       <div className="bg-gray-100 text-black font-serif">
//         <Header />

//         <div className="bg-white text-black min-h-screen flex flex-col items-center px-4">
//           <div className="mt-12 w-full mb-28 max-w-2xl sm:max-w-3xl px-4 sm:px-8 py-8 bg-white shadow-lg rounded-lg mx-auto transition-all duration-300 transform hover:shadow-2xl">
//             <h1 className="font-bold text-4xl sm:text-5xl text-center mb-6 text-gray-800 break-words">
//               {data.title}
//             </h1>
//             <p className="text-gray-500 text-center text-sm sm:text-base mb-8">
//               Published on: {new Date(data.publishedAt).toLocaleDateString()}
//             </p>

//             <div className="space-y-6">
//               {/* Ensure data.body exists before mapping */}
//               {data.body && data.body.map((block, index) => (
//                 <div key={index} className="my-4">
//                   {block._type === "block" && (
//                     <BlockContent
//                       blocks={block}
//                       projectId="1igdvz19"
//                       dataset="production"
//                       className="text-base sm:text-lg leading-relaxed text-gray-700"
//                     />
//                   )}
//                   {block.asset && (
//                     <div className="my-6 flex justify-center">
//                       <img
//                         className="rounded-lg border border-gray-300 shadow-lg transition-transform duration-300 transform hover:scale-105"
//                         src={block.asset.url}
//                         alt="Blog Image"
//                       />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//             <Like  postId={slug}/>
//             <Comment postId={slug} comments={commentList} />
//           </div>

//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// }










"use client";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import BlockContent from "@sanity/block-content-to-react";
import LoadingAnimation from "../../Components/ui/loader/loader";
import Head from "next/head"; // Import the Head component
import Comment from "../../Components/Comment";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const client = sanityClient({
  projectId: "1igdvz19",
  dataset: "production",
  useCdn: true,
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

async function getData(slug) {
  const query = `
    *[_type == "post" && slug.current == '${slug}'] {
      "CurrentSlug": slug.current,
      title, 
      publishedAt,
      likes,
      body[]{
        ...,
        asset->{
          _id,
          url
        }
      }
    }[0]
  `;
  const data = await client.fetch(query);
  console.log(slug);

  // Check if data and data.body exist
  if (data && data.body) {
    data.body = data.body.map((block) => {
      if (block.asset) {
        block.asset.url = urlFor(block.asset).url();
      }
      return block;
    });
  }

  return data;
}

export default function BlogArticle({ params }) {
  const { slug } = params || {};
  const [data, setData] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');



  const handleSubmitComment = async () => {
    setSubmitting(true);
    setError(null);
    setSuccessMessage('');
  
    if (!name || !email || !comment) {
      setError('All fields are required.');
      setSubmitting(false);
      return;
    }
  
    const commentData = {
      name,
      email,
      comment,
      slug: data.CurrentSlug, // Ensure the slug is passed
    };
  
    console.log('Submitting comment data:', commentData);
  
    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
  
      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        setCommentList([...commentList, commentData]);
        setName('');
        setEmail('');
        setComment('');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError('Failed to submit comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  
  

  useEffect(() => {
    getData(slug).then((fetchedData) => {
      setData(fetchedData);
      setCommentList(fetchedData?.comments || []);
      setLikeCount(fetchedData?.likes || 0);

      const savedLikeStatus = localStorage.getItem(`liked-${slug}`);
      if (savedLikeStatus === 'true') {
        setLiked(true);
      }
    });
  }, [slug]);

  const handleLike = async () => {
    const newLikedStatus = !liked;
    setLiked(newLikedStatus);

    localStorage.setItem(`liked-${slug}`, newLikedStatus.toString());

    try {
      await client.patch(slug)
        .setIfMissing({ likes: 0 })
        .inc({ likes: newLikedStatus ? 1 : -1 })
        .commit();

      // Fetch the updated like count from Sanity
      const updatedData = await getData(slug);
      setLikeCount(updatedData.likes);
    } catch (error) {
      console.error('Error updating like count:', error);
    }
  };

  if (!data)
    return (
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <div>
          <LoadingAnimation />
        </div>
      </div>
    );

  const featuredImage = data.body.find((block) => block.asset)?.asset.url || "";

  return (
    <>
      <Head>
        {/* Open Graph Meta Tags for Facebook, LinkedIn */}
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={`Published on: ${new Date(data.publishedAt).toLocaleDateString()}`} />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:url" content={`https://meetpratham-v2.vercel.app/blogs/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />

        {/* Optional Open Graph Tags */}
        <meta property="og:site_name" content="Your Website Name" />
        <meta property="article:author" content="Author Name" />
        <meta property="article:published_time" content={new Date(data.publishedAt).toISOString()} />
        <meta property="article:modified_time" content={new Date().toISOString()} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="An image representing the blog post" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={`Published on: ${new Date(data.publishedAt).toLocaleDateString()}`} />
        <meta name="twitter:image" content={featuredImage} />
        <meta name="twitter:site" content="@YourTwitterHandle" />
        <meta name="twitter:creator" content="@AuthorTwitterHandle" />

        {/* Fallback Image */}
        <meta name="twitter:image:alt" content="An image representing the blog post" />

        {/* Canonical URL (SEO) */}
        <link rel="canonical" href={`https://meetpratham-v2.vercel.app/blogs/${slug}`} />
      </Head>

      <div className="bg-gray-100 text-black font-serif">
        <Header />

        <div className="bg-white text-black min-h-screen flex flex-col items-center px-4">
          <div className="mt-12 w-full mb-28 max-w-2xl sm:max-w-3xl px-4 sm:px-8 py-8 bg-white shadow-lg rounded-lg mx-auto transition-all duration-300 transform hover:shadow-2xl">
            <h1 className="font-bold text-4xl sm:text-5xl text-center mb-6 text-gray-800 break-words">
              {data.title}
            </h1>
            <p className="text-gray-500 text-center text-sm sm:text-base mb-8">
              Published on: {new Date(data.publishedAt).toLocaleDateString()}
            </p>

            <div className="space-y-6">
              {/* Ensure data.body exists before mapping */}
              {data.body && data.body.map((block, index) => (
                <div key={index} className="my-4">
                  {block._type === "block" && (
                    <BlockContent
                      blocks={block}
                      projectId="1igdvz19"
                      dataset="production"
                      className="text-base sm:text-lg leading-relaxed text-gray-700"
                    />
                  )}
                  {block.asset && (
                    <div className="my-6 flex justify-center">
                      <img
                        className="rounded-lg border border-gray-300 shadow-lg transition-transform duration-300 transform hover:scale-105"
                        src={block.asset.url}
                        alt="Blog Image"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button onClick={handleLike} className="like-button">
              {liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
            </button>



            <div className="mt-12 w-full max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>

              {/* Comment Form */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Your Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  />
                  <button
                    onClick={handleSubmitComment}
                    disabled={submitting}
                    className={`w-full p-3 bg-blue-600 text-white font-semibold rounded-md transition-all duration-200 ${submitting ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'
                      }`}
                  >
                    {submitting ? 'Submitting...' : 'Submit Comment'}
                  </button>
                </div>
              </div>

              {/* Display Comments */}
              <div className="space-y-6">
                {commentList.length > 0 ? (
                  commentList.map((comment, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                      <p className="text-lg font-semibold text-gray-700">{comment.name}</p>
                      <p className="text-gray-600 mt-1">{comment.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                )}
              </div>
            </div>







          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}