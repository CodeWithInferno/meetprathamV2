import ProjectsClient from './client';

// SEO Metadata
export const metadata = {
  title: 'Projects | Pratham Patel',
  description: 'Explore my portfolio of AI/ML projects, web applications, and open-source contributions. From reinforcement learning systems to full-stack applications.',
  keywords: ['AI Projects', 'Machine Learning Projects', 'Web Development', 'Open Source', 'Portfolio', 'Pratham Patel'],
  alternates: {
    canonical: 'https://www.meetpratham.me/projects',
  },
  openGraph: {
    title: 'Projects | Pratham Patel',
    description: 'Explore my portfolio of AI/ML projects and web applications.',
    url: 'https://www.meetpratham.me/projects',
    type: 'website',
    images: [
      {
        url: 'https://www.meetpratham.me/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Pratham Patel Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Pratham Patel',
    description: 'Explore my portfolio of AI/ML projects and web applications.',
    images: ['https://www.meetpratham.me/og-banner.png'],
  },
};

export default function ProjectsPage() {
  // Structured data for projects page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects Portfolio',
    description: 'Collection of AI/ML and web development projects by Pratham Patel',
    url: 'https://www.meetpratham.me/projects',
    author: {
      '@type': 'Person',
      name: 'Pratham Patel',
      url: 'https://www.meetpratham.me',
    },
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
          name: 'Projects',
          item: 'https://www.meetpratham.me/projects',
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
      <ProjectsClient />
    </>
  );
}