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

export default async function sitemap() {
  // 1. Define all your static routes
  const staticRoutes = [
    '', // Homepage
    '/me',
    '/summary',
    '/projects',
    '/blog',
    '/bloglist',
    '/linktree',
    '/sneakpeak',
    '/workingon',
    '/wallpapers',
    '/tic-tak-toe',
    '/pacman',
    '/test',
    '/loader'
  ].map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // 2. Fetch all dynamic blog post slugs
  const posts = await fetchDocumentSlugs('post');
  const postUrls = posts.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt).toISOString(),
  }));

  // 3. Fetch all dynamic project slugs (assuming they have pages at /projects/[slug])
  const projects = await fetchDocumentSlugs('work');
  const projectUrls = projects.map(project => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt).toISOString(),
  }));
  
  // 4. Fetch all unique category slugs
  const topicData = await client.fetch(`*[_type == "post" && defined(topics)].topics[]->{ "slug": slug.current }`);
  const uniqueCategorySlugs = [...new Set(topicData.map(item => item.slug).filter(Boolean))];
  const categoryUrls = uniqueCategorySlugs.map(slug => ({
    url: `${BASE_URL}/bloglist/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  // 5. Combine all URLs and return
  return [...staticRoutes, ...postUrls, ...projectUrls, ...categoryUrls];
}
