// src/app/sitemap.js

import { createClient } from "@sanity/client";

// Initialize the Sanity client ONLY for fetching slugs
const client = createClient({
  projectId: "1igdvz19",
  dataset: "production",
  useCdn: true,
  apiVersion: '2024-07-08',
});

export default async function sitemap() {
  const baseUrl = 'https://www.meetpratham.me';

  // --- 1. Fetch Dynamic Blog Post URLs ---
  const posts = await client.fetch(`*[_type == "post"]{"slug": slug.current, "updatedAt": _updatedAt}`);
  const postUrls = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt).toISOString(),
  }));

  // --- 2. Fetch Dynamic Category URLs ---
  // This query gets all "topics" referenced in your posts
  const topicData = await client.fetch(`*[_type == "post" && defined(topics)].topics[]->{ "slug": slug.current }`);
  // Use a Set to get unique category slugs, preventing duplicates
  const uniqueCategorySlugs = [...new Set(topicData.map(item => item.slug).filter(Boolean))];
  
  const categoryUrls = uniqueCategorySlugs.map(slug => ({
    url: `${baseUrl}/bloglist/${slug}`, // Assuming your category URL is /bloglist/[slug]
    lastModified: new Date().toISOString(),
  }));

  // --- 3. Manually Add All Your Static Page URLs ---
  const staticUrls = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/bloglist`, lastModified: new Date() },
    { url: `${baseUrl}/me`, lastModified: new Date() },
    { url: `${baseUrl}/projects`, lastModified: new Date() },
    { url: `${baseUrl}/linktree`, lastModified: new Date() },
    { url: `${baseUrl}/sneakpeak`, lastModified: new Date() },
    { url: `${baseUrl}/workingon`, lastModified: new Date() },
    { url: `${baseUrl}/wallpapers`, lastModified: new Date() },
    { url: `${baseUrl}/wallpapers/alien`, lastModified: new Date() },
    { url: `${baseUrl}/wallpapers/facets`, lastModified: new Date() },
    { url: `${baseUrl}/wallpapers/warp`, lastModified: new Date() },
    { url: `${baseUrl}/wallpapers/waves`, lastModified: new Date() },
    // Add any other static pages here
  ];
  
  // --- 4. Combine and return everything ---
  return [...staticUrls, ...postUrls, ...categoryUrls];
}