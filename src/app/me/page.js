import MePageClient from './client';

// SEO Metadata for About Me page
export const metadata = {
  title: 'About Me | Pratham Patel',
  description: 'Learn about my journey as an AI/ML engineer, my research work at Gannon University, technical skills, and what drives me in the field of artificial intelligence and software development.',
  keywords: ['About Pratham Patel', 'AI Engineer Biography', 'Machine Learning Researcher', 'Gannon University', 'Technical Skills', 'Experience'],
  alternates: {
    canonical: 'https://www.meetpratham.me/me',
  },
  openGraph: {
    title: 'About Me | Pratham Patel',
    description: 'Learn about my journey as an AI/ML engineer and researcher at Gannon University.',
    url: 'https://www.meetpratham.me/me',
    type: 'profile',
    images: [
      {
        url: 'https://www.meetpratham.me/prathamfront.jpeg',
        width: 1200,
        height: 630,
        alt: 'Pratham Patel - AI/ML Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Me | Pratham Patel',
    description: 'Learn about my journey as an AI/ML engineer and researcher.',
    images: ['https://www.meetpratham.me/prathamfront.jpeg'],
  },
};

export default function MePage() {
  // Enhanced structured data for About page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Person',
      name: 'Pratham Patel',
      alternateName: 'CodeWithInferno',
      description: 'AI/ML Engineer and Full-Stack Developer specializing in reinforcement learning, NLP, and modern web technologies.',
      url: 'https://www.meetpratham.me',
      image: 'https://www.meetpratham.me/prathamfront.jpeg',
      sameAs: [
        'https://github.com/CodeWithInferno',
        'https://linkedin.com/in/pratham-patel-6a40b5323',
        'https://twitter.com/prathambiren',
      ],
      jobTitle: 'AI/ML Engineer & Researcher',
      worksFor: {
        '@type': 'EducationalOrganization',
        name: 'Gannon University',
        address: 'Erie, PA',
      },
      knowsAbout: [
        'Artificial Intelligence',
        'Machine Learning',
        'Reinforcement Learning',
        'Natural Language Processing',
        'Full-Stack Development',
        'Python',
        'JavaScript',
        'React',
        'Next.js',
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'AI/ML Engineer',
        educationRequirements: 'B.S. in Computer Science (In Progress)',
        skills: 'Python, PyTorch, TensorFlow, JavaScript, React, Next.js, Docker',
      },
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
          name: 'About Me',
          item: 'https://www.meetpratham.me/me',
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
      <MePageClient />
    </>
  );
}