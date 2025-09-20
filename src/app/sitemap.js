// src/app/sitemap.js
import { createClient } from "@sanity/client";

const SANITY_PROJECT_ID = "1igdvz19";
const SANITY_DATASET = "production";
const BASE_URL = 'https://www.meetpratham.me';

// Initialize Sanity client
const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: true,
  apiVersion: '2024-05-01', // Use a fixed API version
});

// Helper to fetch all documents of a certain type and get their slug
async function fetchDocumentSlugs(type) {
  const query = `*[_type == "${type}" && defined(slug.current)]{"slug": slug.current, "updatedAt": _updatedAt}`;
  const documents = await client.fetch(query);
  return documents;
}

// Priority mapping for different page types
const priorityMap = {
  '': 1.0, // Homepage
  '/me': 0.9,
  '/summary': 0.9,
  '/erie-pa-ai-engineer': 0.9, // Location page high priority
  '/projects': 0.8,
  '/blog': 0.8,
  '/bloglist': 0.8,
  '/faq': 0.8, // High priority for FAQ
  '/home': 0.8,
  '/linktree': 0.7,
  '/sneakpeak': 0.6,
  '/workingon': 0.6,
  '/wallpapers': 0.5,
  '/me/knowme': 0.5,
  '/wallpapers/alien': 0.4,
  '/wallpapers/facets': 0.4,
  '/wallpapers/warp': 0.4,
  '/wallpapers/waves': 0.4,
  '/tic-tak-toe': 0.3,
  '/pacman': 0.3,
  '/test': 0.1,
  '/loader': 0.1
};

export default async function sitemap() {
  // 1. Define all your static routes with proper priority and changeFrequency
  const staticRoutes = Object.keys(priorityMap).map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'weekly' : route.includes('/blog') || route.includes('/projects') ? 'weekly' : 'monthly',
    priority: priorityMap[route],
  }));

  // 2. Fetch all dynamic blog post slugs
  const posts = await fetchDocumentSlugs('post');
  const postUrls = posts.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // 3. Fetch all dynamic project slugs (assuming they have pages at /projects/[slug])
  const projects = await fetchDocumentSlugs('work');
  const projectUrls = projects.map(project => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
  
  // 4. Fetch all unique category slugs
  const topicData = await client.fetch(`*[_type == "post" && defined(topics)].topics[]->{ "slug": slug.current }`);
  const uniqueCategorySlugs = [...new Set(topicData.map(item => item.slug).filter(Boolean))];
  const categoryUrls = uniqueCategorySlugs.map(slug => ({
    url: `${BASE_URL}/bloglist/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  // 5. Combine all URLs and return
  return [...staticRoutes, ...postUrls, ...projectUrls, ...categoryUrls];
}
