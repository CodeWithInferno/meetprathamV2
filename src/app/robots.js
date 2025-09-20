// src/app/robots.js

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/static/',
          '/*.json$',
          '/*?*', // Block URLs with query parameters
          '/404',
        ],
        crawlDelay: 0, // No delay for general crawlers
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://www.meetpratham.me/sitemap.xml',
    host: 'https://www.meetpratham.me',
  };
}