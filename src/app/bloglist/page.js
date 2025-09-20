import BlogListClient from './client';

// SEO Metadata for Blog List
export const metadata = {
  title: 'Blog | Pratham Patel',
  description: 'Technical articles, tutorials, and insights on AI, machine learning, web development, and my journey in tech. Learn from my experiences in building AI systems.',
  keywords: ['Tech Blog', 'AI Tutorials', 'Machine Learning Articles', 'Programming', 'Web Development', 'Software Engineering'],
  alternates: {
    canonical: 'https://www.meetpratham.me/bloglist',
  },
  openGraph: {
    title: 'Blog | Pratham Patel',
    description: 'Technical articles and tutorials on AI, machine learning, and web development.',
    url: 'https://www.meetpratham.me/bloglist',
    type: 'website',
    images: [
      {
        url: 'https://www.meetpratham.me/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Pratham Patel Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Pratham Patel',
    description: 'Technical articles and tutorials on AI, machine learning, and web development.',
    images: ['https://www.meetpratham.me/og-banner.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
    },
  },
};

export default function BlogListPage() {
  // Structured data for blog listing page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Pratham Patel Tech Blog',
    description: 'Technical articles and tutorials on AI, machine learning, and web development',
    url: 'https://www.meetpratham.me/bloglist',
    author: {
      '@type': 'Person',
      name: 'Pratham Patel',
      url: 'https://www.meetpratham.me',
    },
    publisher: {
      '@type': 'Person',
      name: 'Pratham Patel',
    },
    blogPost: [], // Will be populated dynamically in the client component
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.meetpratham.me',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://www.meetpratham.me/bloglist',
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogListClient />
    </>
  );
}