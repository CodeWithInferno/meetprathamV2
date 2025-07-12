// src/app/blog/page.jsx
'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import sanityClient from '@sanity/client';

// IMPORT YOUR HEADER COMPONENT
import ArtisticHeader from '@/app/Components/Reusable/Header'; // Adjust the path to your header file

const client = sanityClient({
  projectId: '1igdvz19',
  dataset: 'production',
  useCdn: true,
});

// Main Page Component
export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [activeTopic, setActiveTopic] = useState('All');
  const [hoveredTopic, setHoveredTopic] = useState(null);
  const mainFeedRef = useRef(null);

  useEffect(() => {
    (async () => {
      const query = `
        *[_type=="post"]|order(_createdAt desc){
          title, slug, "bannerUrl": banner.asset->url, topics[]->{title}
        }`;
      const raw = await client.fetch(query);
      const cookedPosts = raw.map(p => ({
        title: p.title,
        slug: p.slug.current,
        banner: p.bannerUrl,
        topic: p.topics?.[0]?.title || 'Misc',
      }));
      setPosts(cookedPosts);
      const uniqueTopics = ['All', ...new Set(cookedPosts.map(p => p.topic))];
      setTopics(uniqueTopics);
    })();
  }, []);

  // useMemo is still good practice for performance, so we keep it.
  const visiblePosts = useMemo(() => {
    if (activeTopic === 'All') {
      return posts;
    }
    return posts.filter(p => p.topic === activeTopic);
  }, [posts, activeTopic]);


  // =================================================================
  // THE REAL FIX: Reimagined Logic
  // The animation now depends on `activeTopic` and `posts`.
  // It will ONLY re-run when you click a new category or when the posts
  // initially load. It will NOT re-run on a simple hover state change.
  // =================================================================
  useGSAP(() => {
    if (!mainFeedRef.current?.children.length) return;
    
    gsap.from(mainFeedRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power3.out',
    });
    // The dependency array is the key. We are no longer depending on `visiblePosts`.
  }, { dependencies: [activeTopic, posts], scope: mainFeedRef });

  return (
    <div className="bg-white text-black">
      <FloatingTag topic={hoveredTopic} />
      
      <ArtisticHeader />

      <div className="grid lg:grid-cols-3 xl:grid-cols-4">
        
        <aside className="hidden lg:block lg:col-span-1 xl:col-span-1 p-8 border-r-2 border-black">
          <div className="sticky top-8">
            <h1 className="text-7xl font-bold uppercase tracking-tighter">Index</h1>
            <p className="mt-8 text-lg text-neutral-600">
              A collection of thoughts, explorations, and processes. Raw, unfiltered, and direct.
            </p>
            <FilterList 
              topics={topics}
              activeTopic={activeTopic}
              setActiveTopic={setActiveTopic}
            />
             <div className="mt-24">
              <Link href="/" className="font-bold text-lg hover:text-yellow-400">[ Home ]</Link>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-2 xl:col-span-3">
          <div ref={mainFeedRef}>
            {visiblePosts.map((post) => (
              <PostItem 
                key={post.slug}
                post={post}
                setHoveredTopic={setHoveredTopic}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

// ---- ALL CHILD COMPONENTS BELOW ARE UNCHANGED AND CORRECT ----

function FilterList({ topics, activeTopic, setActiveTopic }) {
  return (
    <nav className="mt-16">
        <h2 className="text-lg font-bold uppercase text-neutral-800">[ Categories ]</h2>
        <ul className="mt-4 flex flex-col items-start gap-2">
            {topics.map(topic => (
                <li key={topic}>
                    <button
                        onClick={() => setActiveTopic(topic)}
                        className={`px-3 py-1 text-xl font-bold uppercase transition-colors duration-200
                        ${ activeTopic === topic 
                            ? 'bg-yellow-300 text-black' 
                            : 'text-neutral-500 hover:text-black'
                        }`}
                    >
                        {topic}
                    </button>
                </li>
            ))}
        </ul>
    </nav>
  )
}

function FloatingTag({ topic }) {
   const tagRef = useRef(null);
    const isVisible = !!topic;
    useGSAP(() => {
        const xTo = gsap.quickTo(tagRef.current, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(tagRef.current, "y", { duration: 0.4, ease: "power3" });
        const handleMouseMove = (e) => {
            xTo(e.clientX + 15);
            yTo(e.clientY + 15);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useGSAP(() => {
      gsap.to(tagRef.current, {
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0,
          duration: 0.2,
          ease: 'power2.out'
      });
  }, {dependencies: [isVisible]});

    return (
        <div ref={tagRef} className="fixed top-0 left-0 z-50 pointer-events-none">
            <div className="bg-yellow-300 text-black px-3 py-1 font-bold uppercase text-sm">
                {topic}
            </div>
        </div>
    )
}

const PostItem = React.memo(function PostItem({ post, setHoveredTopic }) {
  return (
    <div 
      onMouseEnter={() => setHoveredTopic(post.topic)}
      onMouseLeave={() => setHoveredTopic(null)}
      className="border-b-2 border-black group transition-colors duration-200 hover:border-yellow-300"
    >
      <Link href={`/blog/${post.slug}`} className="block p-8">
        <div className="flex justify-between items-start gap-8">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight w-3/4">
                {post.title}
            </h2>
            <span className="arrow text-5xl transition-transform duration-300 group-hover:translate-x-2">→</span>
        </div>
        {post.banner && (
            <div className="mt-8 overflow-hidden">
                <Image
                    src={post.banner}
                    alt=""
                    width={1000}
                    height={600}
                    className="post-image w-full h-auto filter grayscale transition-all duration-300 group-hover:grayscale-0"
                    loading="lazy"
                />
            </div>
        )}
      </Link>
    </div>
  );
});