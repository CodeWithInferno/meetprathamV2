// src/app/blog/page.jsx
'use client';

import React, { useEffect, useState } from 'react';
import Link   from 'next/link';
import Image  from 'next/image';
import { motion } from 'framer-motion';

import Header from '@/app/Components/Resuables/Header';
import Footer from '@/app/Components/Resuables/Footer';

import sanityClient from '@sanity/client';

/* ── Sanity client ────────────────────────── */
const client = sanityClient({
  projectId: '1igdvz19',
  dataset:   'production',
  useCdn:    true,
});

/* fallback tile colours */
const GREYS = ['#111827', '#1f2937', '#334155'];

/* ─────────────────────────────────────────── */

export default function Blog() {
  const [posts,  setPosts]  = useState([]);
  const [topics, setTopics] = useState([]);
  const [active, setActive] = useState('All');

  /* fetch posts + topics */
  useEffect(() => {
    (async () => {
      const raw = await client.fetch(`
        *[_type=="post"]|order(_createdAt desc){
          title,
          slug,
          description,
          "bannerUrl": banner.asset->url,
          topics[]->{title}
        }`);
      const cooked = raw.map(p => ({
        title: p.title,
        slug:  p.slug.current,
        description: p.description,
        banner: p.bannerUrl,
        topics: p.topics?.map(t => t.title) || [],
      }));
      setPosts(cooked);
      setTopics(['All', ...new Set(cooked.flatMap(p => p.topics))]);
    })();
  }, []);

  const visible = active === 'All'
    ? posts
    : posts.filter(p => p.topics.includes(active));

  return (
    <div className="bg-white text-black">
      <Header />

      {/* 40-vh spacer */}
      <section className="h-[40vh] flex items-end justify-center select-none">
        <h1 className="text-[18vw] font-black text-gray-200 leading-none uppercase">Blog</h1>
      </section>

      <TopicBar topics={topics} active={active} setActive={setActive} />

      {/* document-level scroll, each slide 100 vh */}
      <div className="snap-y snap-mandatory">
        {visible.map((post, i) => (
          <Slide key={post.slug} post={post} index={i} />
        ))}
      </div>

      <Footer />
    </div>
  );
}

/* ───────── topic pills ───────── */
function TopicBar({ topics, active, setActive }) {
  return (
    <div className="sticky top-[40vh] md:top-0 z-30 flex gap-3 px-6 md:px-20 py-4 bg-white/70 backdrop-blur">
      {topics.map(t => (
        <button
          key={t}
          onClick={() => setActive(t)}
          className={`px-4 py-1 rounded-full border transition
                      ${active === t ? 'bg-black text-white' : ''}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/* ───────── one full-viewport slide ───────── */
function Slide({ post, index }) {
  const fallback = GREYS[index % GREYS.length];
  const firstTopic = post.topics[0] || 'Untitled';

  return (
    <motion.section
      className="snap-start h-screen w-screen relative group"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* banner or colour tile */}
      {post.banner ? (
        <Image src={post.banner} alt="" fill className="object-cover " />
      ) : (
        <div className="absolute inset-0" style={{ background: fallback }} />
      )}

      {/* grain overlay (optional) */}
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay pointer-events-none" />

      {/* hover meta — bottom-left */}
      <div className="absolute bottom-8 left-8 z-20 max-w-lg
                      opacity-0 group-hover:opacity-100 transition">
        <h2 className="text-3xl md:text-4xl font-bold text-white">{post.title}</h2>
        <p className="mt-2 text-white/90 line-clamp-2">{post.description}</p>
      </div>

      {/* topic chip — top-right */}
      <span className="absolute top-6 right-6 z-20 text-xs uppercase bg-white/90 text-black px-3 py-1 rounded-full">
        {firstTopic}
      </span>

      {/* click hotspot */}
      <Link href={`/blogs/${post.slug}`} className="absolute inset-0" />
    </motion.section>
  );
}
