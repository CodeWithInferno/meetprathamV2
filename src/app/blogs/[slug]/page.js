// "use client";
// import sanityClient from "@sanity/client";
// import imageUrlBuilder from "@sanity/image-url";
// import { useEffect, useState } from "react";
// import Header from "../../Components/Header";
// import Footer from "../../Components/Footer";
// import BlockContent from "@sanity/block-content-to-react";
// import LoadingAnimation from "../../Components/ui/loader/loader";
// import Head from "next/head"; 
// import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';

// const client = sanityClient({
//   projectId: "1igdvz19",
//   dataset: "production",
//   useCdn: true,
// });

// const builder = imageUrlBuilder(client);
// function urlFor(source) {
//   return builder.image(source);
// }

// // Fetch post data including comments and likes
// async function getData(slug) {
//   const query = `
//     *[_type == "post" && slug.current == '${slug}'] {
//       "CurrentSlug": slug.current,
//       title, 
//       publishedAt,
//       likes,
//       comments,  
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

//   // Ensure comments and likes are fetched properly
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
//   const [liked, setLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [comment, setComment] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [showComments, setShowComments] = useState(false); // State to toggle comments

//   // Fetch post data on mount
//   useEffect(() => {
//     getData(slug).then((fetchedData) => {
//       setData(fetchedData);
//       setCommentList(fetchedData?.comments || []); 
//       setLikeCount(fetchedData?.likes || 0);

//       const savedLikeStatus = localStorage.getItem(`liked-${slug}`);
//       if (savedLikeStatus === 'true') {
//         setLiked(true);
//       }
//     });
//   }, [slug]);

//   // Handle like functionality
//   const handleLike = async () => {
//     if (liked) return; // User can't like again

//     const newLikedStatus = !liked;
//     setLiked(newLikedStatus);
//     localStorage.setItem(`liked-${slug}`, newLikedStatus.toString());

//     try {
//       const response = await fetch('/api/like', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ slug: data.CurrentSlug }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setLikeCount(data.likes);  // Update the like count from API response
//       }
//     } catch (error) {
//       console.error('Error updating like count:', error);
//     }
//   };

//   // Handle comment submission (existing functionality)
//   const handleSubmitComment = async () => {
//     setSubmitting(true);
//     setError(null);
//     setSuccessMessage('');

//     if (!name || !email || !comment) {
//       setError('All fields are required.');
//       setSubmitting(false);
//       return;
//     }

//     const commentData = {
//       name,
//       email,
//       comment,
//       slug: data.CurrentSlug, // Ensure the slug is passed
//     };

//     try {
//       const response = await fetch('/api/comment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(commentData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setSuccessMessage(data.message);
//         setCommentList([...commentList, { name, comment }]);
//         setName('');
//         setEmail('');
//         setComment('');
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message);
//       }
//     } catch (error) {
//       console.error('Error submitting comment:', error);
//       setError('Failed to submit comment. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Toggle comment section visibility
//   const toggleCommentSection = () => {
//     setShowComments(!showComments);
//   };

//   if (!data)
//     return (
//       <div className="bg-white text-black min-h-screen flex items-center justify-center">
//         <LoadingAnimation />
//       </div>
//     );

//   const featuredImage = data.body.find((block) => block.asset)?.asset.url || "";

//   return (
//     <>
//       <Head>
//         <meta property="og:title" content={data.title} />
//         <meta property="og:description" content={`Published on: ${new Date(data.publishedAt).toLocaleDateString()}`} />
//         <meta property="og:image" content={featuredImage} />
//         <meta property="og:url" content={`https://meetpratham-v2.vercel.app/blogs/${slug}`} />
//         <meta property="og:type" content="article" />
//         <meta property="og:locale" content="en_US" />
//         <link rel="canonical" href={`https://meetpratham-v2.vercel.app/blogs/${slug}`} />
//       </Head>

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

//             {/* Render post body */}
//             <div className="space-y-6">
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

//             {/* Like and Comment Buttons */}
//             <div className="flex items-center space-x-4 mt-8">
//               <button onClick={handleLike} className="flex items-center space-x-2 p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition duration-300 ease-in-out shadow-md">
//                 {liked ? <AiFillHeart size={28} /> : <AiOutlineHeart size={28} />}
//                 <span className="text-lg">{likeCount} Likes</span>
//               </button>

//               <button onClick={toggleCommentSection} className="flex items-center space-x-2 p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition duration-300 ease-in-out shadow-md">
//                 <AiOutlineComment size={28} />
//                 <span className="text-lg">Comment</span>
//               </button>
//             </div>

//             {/* Conditionally render comment section */}
//             {showComments && (
//               <div id="comment-section" className="mt-12 w-full max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Leave a Comment</h2>
//                 <div className="mb-8">
//                   {error && <p className="text-red-500 mb-4">{error}</p>}
//                   {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
//                   <div className="space-y-4">
//                     <input
//                       type="text"
//                       placeholder="Your Name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <input
//                       type="email"
//                       placeholder="Your Email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <textarea
//                       placeholder="Your Comment"
//                       value={comment}
//                       onChange={(e) => setComment(e.target.value)}
//                       className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
//                     />
//                     <button
//                       onClick={handleSubmitComment}
//                       disabled={submitting}
//                       className={`w-full p-3 bg-blue-600 text-white font-semibold rounded-md transition-all duration-200 ${submitting ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'
//                         }`}
//                     >
//                       {submitting ? 'Submitting...' : 'Submit Comment'}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Display Comments */}
//                 <div className="space-y-6">
//                   {commentList.length > 0 ? (
//                     commentList.map((comment, index) => (
//                       <div key={index} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
//                         <p className="text-lg font-semibold text-gray-700">{comment.name}</p>
//                         <p className="text-gray-600 mt-1">{comment.comment}</p>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-gray-500">No comments yet. Be the first to comment!</p>
//                   )}
//                 </div>
//               </div>
//             )}
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
import Image from "next/image";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import CodeBlock from './components/CodeBlock';  // Create this file with the code from step 1
import { PortableText } from "@portabletext/react";
import LoadingAnimation from "../../Components/ui/loader/loader";
import Head from "next/head";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';

const client = sanityClient({
  projectId: "1igdvz19",
  dataset: "production",
  useCdn: true,
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

// Fetch post data including comments and likes
async function getData(slug) {
  const query = `
    *[_type == "post" && slug.current == '${slug}'] {
      "CurrentSlug": slug.current,
      title, 
      publishedAt,
      likes,
      comments,  
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

// Custom components for handling rich text elements
const components = {
  types: {
    image: ({ value }) => (
      <Image
        src={urlFor(value.asset).url()}
        alt={value.alt || 'Blog Image'}
        className="rounded-lg border border-gray-300 shadow-lg transition-transform duration-300 transform hover:scale-105"
        width={800}
        height={450}
      />
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 text-pink-500 px-1 py-0.5 rounded font-mono text-sm">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li className="my-1">{children}</li>,
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-5 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>,
    normal: ({ children }) => <p className="text-base sm:text-lg leading-relaxed text-gray-700">{children}</p>,
    code: ({ children }) => {
      return <CodeBlock language="javascript">{children}</CodeBlock>;
    },
  },
};

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
  const [showComments, setShowComments] = useState(false);

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
    if (liked) return;

    const newLikedStatus = !liked;
    setLiked(newLikedStatus);
    localStorage.setItem(`liked-${slug}`, newLikedStatus.toString());

    try {
      const response = await fetch('/api/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug: data.CurrentSlug }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikeCount(data.likes);
      }
    } catch (error) {
      console.error('Error updating like count:', error);
    }
  };

  const handleSubmitComment = async () => {
    setSubmitting(true);
    setError(null);
    setSuccessMessage('');

    if (!name || !email || !comment) {
      setError('All fields are required.');
      setSubmitting(false);
      return;
    }

    const commentData = { name, email, comment, slug: data.CurrentSlug };

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
        setCommentList([...commentList, { name, comment }]);
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

  const toggleCommentSection = () => setShowComments(!showComments);

  const pageUrl = `https://www.meetpratham.me/blogs/${slug}`;
  const pageTitle = data?.title || "Pratham's Tech Blog";
  const pageDescription = `Published on: ${new Date(data?.publishedAt).toLocaleDateString()}`;
  const pageImage = `https://www.meetpratham.me/api/og?slug=${slug}`; // Point to your dynamic OG image API


  if (!data)
    return (
      <div className="bg-white text-black min-h-screen flex items-center justify-center">
        <LoadingAnimation />
      </div>
    );

  const featuredImage = data.body.find((block) => block.asset)?.asset.url || "";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        {/* Open Graph Meta Tags */}
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
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

            <PortableText
              value={data.body}
              components={components}
              className="text-base sm:text-lg leading-relaxed text-gray-700"
            />

            <div className="flex items-center space-x-4 mt-8">
              <button onClick={handleLike} className="flex items-center space-x-2 p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition duration-300 ease-in-out shadow-md">
                {liked ? <AiFillHeart size={28} /> : <AiOutlineHeart size={28} />}
                <span className="text-lg">{likeCount} Likes</span>
              </button>
              <button onClick={toggleCommentSection} className="flex items-center space-x-2 p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition duration-300 ease-in-out shadow-md">
                <AiOutlineComment size={28} />
                <span className="text-lg">Comment</span>
              </button>
            </div>

            {showComments && (
              <div id="comment-section" className="mt-12 w-full max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Leave a Comment</h2>
                <div className="mb-8">
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
                      className={`w-full p-3 bg-blue-600 text-white font-semibold rounded-md transition-all duration-200 ${submitting ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    >
                      {submitting ? 'Submitting...' : 'Submit Comment'}
                    </button>
                  </div>
                </div>

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
            )}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
