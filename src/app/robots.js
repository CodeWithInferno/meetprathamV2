// src/app/robots.js

export default function robots() {
  return {
    rules: {
      userAgent: '*', // This means the rules apply to all crawlers (Google, Bing, etc.)
      allow: '/',     // This means they are allowed to crawl everything
    },
    // This tells them where to find your sitemap
    sitemap: 'https://www.meetpratham.me/sitemap.xml',
  };
}