// "use client";
// import sanityClient from "@sanity/client";
// import imageUrlBuilder from "@sanity/image-url";
// import { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { PortableText } from "@portabletext/react";
// import Head from "next/head";
// import { Heart, MessageSquare, ArrowLeft } from 'lucide-react'; // Using a cleaner icon set

// import LoadingAnimation from "../../Components/ui/loader/loader";
// import CodeBlock from './components/CodeBlock';

// // --- SANITY CLIENT SETUP ---
// const client = sanityClient({
//   projectId: "1igdvz19",
//   dataset: "production",
//   useCdn: true,
// });
// const builder = imageUrlBuilder(client);
// function urlFor(source) {
//   return builder.image(source);
// }

// // --- DATA FETCHING (Unchanged logic, slightly cleaner query) ---
// async function getData(slug) {
//   const query = `*[_type == "post" && slug.current == $slug][0] {
//     "currentSlug": slug.current,
//     title,
//     publishedAt,
//     "likesCount": coalesce(likes, 0),
//     comments,
//     body[]{
//       ...,
//       _type == "image" => {
//         "url": asset->url,
//         "alt": asset->altText,
//         "caption": caption
//       },
//       _type == "code" => {
//         code,
//         language
//       }
//     }
//   }`;
//   return client.fetch(query, { slug });
// }

// // ============================================================================
// // --- ARTISTIC & READABLE PORTABLE TEXT COMPONENTS ---
// // This is where we define the new look for our content.
// // ============================================================================
// const ptComponents = {
//   types: {
//     image: ({ value }) => (
//       <figure className="my-8">
//         <Image
//           src={urlFor(value).width(1200).url()}
//           alt={value.alt || 'Blog Post Image'}
//           width={1200}
//           height={700}
//           className="w-full h-auto rounded-md object-cover border-2 border-black"
//         />
//         {value.caption && (
//           <figcaption className="mt-2 text-center text-sm font-sans text-neutral-500">
//             {value.caption}
//           </figcaption>
//         )}
//       </figure>
//     ),
//     // CRITICAL FIX: This correctly passes the code string to your component
//     code: ({ value }) => (
//       <CodeBlock language={value.language}>{value.code}</CodeBlock>
//     ),
//   },
//   marks: {
//     link: ({ children, value }) => (
//       <a
//         href={value.href}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-black bg-yellow-300 px-1 py-0.5 rounded-sm hover:bg-yellow-400 transition-colors"
//       >
//         {children}
//       </a>
//     ),
//     code: ({ children }) => (
//       <code className="bg-neutral-200 text-black px-1.5 py-1 rounded-md font-mono text-sm">
//         {children}
//       </code>
//     ),
//   },
//   list: {
//     bullet: ({ children }) => <ul className="list-disc ml-6 my-4 space-y-2 font-serif text-lg">{children}</ul>,
//   },
//   block: {
//     h2: ({ children }) => <h2 className="text-3xl font-bold font-sans tracking-tight mt-12 mb-4 border-b-2 border-black pb-2">{children}</h2>,
//     h3: ({ children }) => <h3 className="text-2xl font-bold font-sans tracking-tight mt-10 mb-3">{children}</h3>,
//     normal: ({ children }) => <p className="font-serif text-lg leading-relaxed my-4 text-neutral-800">{children}</p>,
//     blockquote: ({ children }) => (
//       <blockquote className="my-6 border-l-4 border-yellow-400 pl-4 italic text-neutral-600 font-serif text-xl">
//         {children}
//       </blockquote>
//     ),
//   },
// };

// // ============================================================================
// // --- MAIN BLOG ARTICLE COMPONENT ---
// // ============================================================================
// export default function BlogArticle({ params }) {
//   const { slug } = params || {};
//   const [data, setData] = useState(null);
//   const [commentList, setCommentList] = useState([]);
//   const [liked, setLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);
  
//   // Comment Form State
//   const [name, setName] = useState('');
//   const [comment, setComment] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);
  
//   const commentsSectionRef = useRef(null);

//   useEffect(() => {
//     if (!slug) return;
//     getData(slug).then((fetchedData) => {
//       if (fetchedData) {
//         setData(fetchedData);
//         setCommentList(fetchedData.comments || []);
//         setLikeCount(fetchedData.likesCount);
//         if (localStorage.getItem(`liked-${slug}`) === 'true') {
//           setLiked(true);
//         }
//       }
//     });
//   }, [slug]);

//   const handleLike = async () => {
//     if (liked) return;
//     setLiked(true);
//     setLikeCount(prev => prev + 1);
//     localStorage.setItem(`liked-${slug}`, 'true');
//     await fetch('/api/like', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug: data.currentSlug }) });
//   };

//   const handleSubmitComment = async (e) => {
//     e.preventDefault();
//     if (!name || !comment) {
//       setError("Name and comment fields are required.");
//       return;
//     }
//     setSubmitting(true);
//     setError(null);
//     const response = await fetch('/api/comment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, comment, slug: data.currentSlug }) });
    
//     if (response.ok) {
//       setCommentList(prev => [...prev, { name, comment, _createdAt: new Date().toISOString() }]);
//       setName('');
//       setComment('');
//     } else {
//       setError("Failed to submit comment. Please try again.");
//     }
//     setSubmitting(false);
//   };

//   const scrollToComments = () => {
//     commentsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   // --- SEO ---
//   const pageTitle = data?.title || "Pratham's Tech Blog";
//   const pageDescription = `Published on: ${data ? new Date(data.publishedAt).toLocaleDateString() : 'Loading...'}`;
//   const pageImage = `https://www.meetpratham.me/api/og?slug=${slug}`;

//   if (!data) return <div className="bg-white min-h-screen flex items-center justify-center"><LoadingAnimation /></div>;

//   return (
//     <>
//       <Head>
//         <title>{pageTitle}</title>
//         <meta name="description" content={pageDescription} />
//         <meta property="og:title" content={pageTitle} />
//         <meta property="og:description" content={pageDescription} />
//         <meta property="og:image" content={pageImage} />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={pageTitle} />
//         <meta name="twitter:description" content={pageDescription} />
//         <meta name="twitter:image" content={pageImage} />
//       </Head>

//       <main className="bg-stone-50 text-black min-h-screen">
//         {/* --- ARTICLE HERO SECTION --- */}
//         <header className="py-20 px-6 bg-white border-b-2 border-black">
//           <div className="max-w-4xl mx-auto">
//              <Link href="/bloglist" className="flex items-center gap-2 font-bold text-neutral-600 hover:text-black transition-colors mb-8">
//               <ArrowLeft size={18} />
//               <span>Back to BlogList</span>
//             </Link>
//             <p className="font-sans text-yellow-500 font-bold uppercase tracking-widest">
//               {new Date(data.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
//             </p>
//             <h1 className="font-sans text-5xl md:text-7xl font-extrabold tracking-tighter mt-2 break-words">
//               {data.title}
//             </h1>
//           </div>
//         </header>

//         {/* --- MAIN CONTENT LAYOUT (2-COLUMN) --- */}
//         <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 px-6 py-12">

//           {/* --- LEFT STICKY SIDEBAR --- */}
//           <aside className="lg:col-span-3">
//             <div className="sticky top-12 space-y-4">
//               <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-neutral-500">Engage</h3>
//               <button onClick={handleLike} disabled={liked} className="w-full flex items-center justify-center gap-3 p-3 border-2 border-black rounded-md font-bold text-lg hover:bg-yellow-300 transition-colors disabled:bg-neutral-200 disabled:cursor-not-allowed">
//                 <Heart size={22} className={liked ? 'text-red-500 fill-current' : ''} />
//                 <span>{likeCount}</span>
//               </button>
//                <button onClick={scrollToComments} className="w-full flex items-center justify-center gap-3 p-3 border-2 border-black rounded-md font-bold text-lg hover:bg-yellow-300 transition-colors">
//                 <MessageSquare size={22} />
//                 <span>{commentList.length}</span>
//               </button>
//             </div>
//           </aside>

//           {/* --- RIGHT CONTENT AREA --- */}
//           <article className="lg:col-span-9 max-w-4xl">
//             <PortableText value={data.body} components={ptComponents} />
//           </article>
//         </div>
        
//         {/* --- COMMENTS SECTION --- */}
//         <section ref={commentsSectionRef} className="bg-white border-t-2 border-black py-16 px-6">
//           <div className="max-w-3xl mx-auto">
//             <h2 className="font-sans text-3xl font-bold tracking-tight mb-8">Join the Conversation</h2>
//             {/* Comment Form */}
//             <form onSubmit={handleSubmitComment} className="space-y-4 border-2 border-black p-6 rounded-lg mb-12">
//               <input type="text" placeholder="Your Name*" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 bg-stone-100 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 font-serif" />
//               <textarea placeholder="Your Comment*" value={comment} onChange={(e) => setComment(e.target.value)} rows={4} className="w-full p-3 bg-stone-100 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 font-serif" />
//               {error && <p className="text-red-600 font-sans text-sm">{error}</p>}
//               <button type="submit" disabled={submitting} className="w-full p-3 bg-black text-white font-bold rounded-md hover:bg-neutral-800 disabled:bg-neutral-400 transition-colors">
//                 {submitting ? 'Posting...' : 'Post Comment'}
//               </button>
//             </form>
            
//             {/* Comment List */}
//             <div className="space-y-6">
//               {commentList.length > 0 ? (
//                 commentList.sort((a, b) => new Date(b._createdAt) - new Date(a._createdAt)).map((c, index) => (
//                   <div key={index} className="border-b-2 border-neutral-200 pb-4">
//                     <p className="font-sans font-bold">{c.name}</p>
//                     <p className="font-serif text-neutral-700 mt-1">{c.comment}</p>
//                     <p className="text-xs text-neutral-400 mt-2 font-sans">{new Date(c._createdAt).toLocaleString()}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="font-serif text-neutral-500">Be the first to leave a comment.</p>
//               )}
//             </div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }





// src/app/blog/[slug]/page.jsx

// CRITICAL: Remove 'use client' and the 'next/head' import. This page will now be a Server Component.
// import Head from "next/head"; // REMOVE THIS
// "use client"; // REMOVE THIS

import { Metadata } from 'next'; // Import for better autocompletion
import sanityClient from "@sanity/client";
import { createClient } from "@sanity/client";

import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Heart, MessageSquare, ArrowLeft } from 'lucide-react';

// Your client-only components that need state and effects
import BlogActions from './components/BlogActions'; // We will create this component
import LoadingAnimation from "../../Components/ui/loader/loader";
import CodeBlock from './components/CodeBlock';

// --- SANITY CLIENT SETUP (Unchanged) ---
const client = sanityClient({
  projectId: "1igdvz19",
  dataset: "production",
  useCdn: true,
  apiVersion: '2024-07-08', // Or the current date

});
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

// --- DATA FETCHING (Now with a short description field) ---
async function getData(slug) {
  // Add `shortDescription` and `banner` to your query
  const query = `*[_type == "post" && slug.current == $slug][0] {
    "currentSlug": slug.current,
    title,
    shortDescription, // Add a "shortDescription" (string) field in your Sanity schema
    publishedAt,
    banner, // The main image for the article
    "likesCount": coalesce(likes, 0),
    comments,
    body[]{
      ...,
      _type == "image" => {
        "url": asset->url,
        "alt": asset->altText,
        "caption": caption
      },
      _type == "code" => {
        code,
        language
      }
    }
  }`;
  return client.fetch(query, { slug });
}

// ============================================================================
// --- DYNAMIC METADATA GENERATION ---
// This function runs on the server to generate SEO tags for each blog post.
// ============================================================================
export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getData(slug);

  if (!data) {
    return {
      title: "Post Not Found",
    };
  }

  const pageTitle = data.title;
  // Use the new short description field, or fallback to a generic one
  const pageDescription = data.shortDescription || `Read the full article titled "${data.title}" on Pratham's Tech Blog.`;
  // Use the banner image for the OG image, with a fallback
  const ogImageUrl = data.banner ? urlFor(data.banner).width(1200).height(630).fit('crop').url() : `https://www.meetpratham.me/api/og?slug=${slug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    // Canonical URL to prevent duplicate content issues
    alternates: {
      canonical: `https://www.meetpratham.me/blog/${slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://www.meetpratham.me/blog/${slug}`,
      type: 'article',
      publishedTime: new Date(data.publishedAt).toISOString(),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [ogImageUrl],
    },
  };
}


// --- PORTABLE TEXT COMPONENTS (Unchanged) ---
const ptComponents = {
  // ... your ptComponents object is perfect, no changes needed here
  types: { image: ({ value }) => ( <figure className="my-8"> <Image src={urlFor(value).width(1200).url()} alt={value.alt || 'Blog Post Image'} width={1200} height={700} className="w-full h-auto rounded-md object-cover border-2 border-black" /> {value.caption && ( <figcaption className="mt-2 text-center text-sm font-sans text-neutral-500"> {value.caption} </figcaption> )} </figure> ), code: ({ value }) => ( <CodeBlock language={value.language}>{value.code}</CodeBlock> ), }, marks: { link: ({ children, value }) => ( <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-black bg-yellow-300 px-1 py-0.5 rounded-sm hover:bg-yellow-400 transition-colors" > {children} </a> ), code: ({ children }) => ( <code className="bg-neutral-200 text-black px-1.5 py-1 rounded-md font-mono text-sm"> {children} </code> ), }, list: { bullet: ({ children }) => <ul className="list-disc ml-6 my-4 space-y-2 font-serif text-lg">{children}</ul>, }, block: { h2: ({ children }) => <h2 className="text-3xl font-bold font-sans tracking-tight mt-12 mb-4 border-b-2 border-black pb-2">{children}</h2>, h3: ({ children }) => <h3 className="text-2xl font-bold font-sans tracking-tight mt-10 mb-3">{children}</h3>, normal: ({ children }) => <p className="font-serif text-lg leading-relaxed my-4 text-neutral-800">{children}</p>, blockquote: ({ children }) => ( <blockquote className="my-6 border-l-4 border-yellow-400 pl-4 italic text-neutral-600 font-serif text-xl"> {children} </blockquote> ), },
};

// ============================================================================
// --- MAIN BLOG ARTICLE COMPONENT ---
// This is now an async Server Component.
// ============================================================================
export default async function BlogArticle({ params }) {
  const { slug } = params;
  const data = await getData(slug);

  if (!data) {
    // You can redirect or show a 404 page here
    return <div className="text-center py-20">Post not found.</div>;
  }

  // The component is now clean. All logic is passed down as props.
  return (
    <main className="bg-stone-50 text-black min-h-screen">
      {/* --- ARTICLE HERO SECTION --- */}
      <header className="py-20 px-6 bg-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto">
           <Link href="/blog" className="flex items-center gap-2 font-bold text-neutral-600 hover:text-black transition-colors mb-8">
            <ArrowLeft size={18} />
            <span>Back to Index</span>
          </Link>
          <p className="font-sans text-yellow-500 font-bold uppercase tracking-widest">
            {new Date(data.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="font-sans text-5xl md:text-7xl font-extrabold tracking-tighter mt-2 break-words">
            {data.title}
          </h1>
        </div>
      </header>

      {/* --- MAIN CONTENT LAYOUT (2-COLUMN) --- */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 px-6 py-12">

        {/* --- LEFT STICKY SIDEBAR (Now a Client Component) --- */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24">
            <BlogActions
              slug={data.currentSlug}
              initialLikes={data.likesCount}
              initialComments={data.comments || []}
            />
          </div>
        </aside>

        {/* --- RIGHT CONTENT AREA --- */}
        <article className="lg:col-span-9 max-w-4xl">
          <PortableText value={data.body} components={ptComponents} />
        </article>
      </div>

      {/* The comments section will be rendered inside BlogActions */}
    </main>
  );
}