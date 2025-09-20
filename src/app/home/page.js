import HomeClient from './client';
import { generateKeywordsForPage, generateFAQItems } from '@/lib/seo-keywords';

// Aggressive SEO metadata for home page
export const metadata = {
  title: 'Pratham Patel - AI/ML Engineer | Gannon University | Portfolio & Resume',
  description: 'Pratham Patel is an AI/ML Engineer and Computer Science student at Gannon University in Erie, PA. Specializing in reinforcement learning, NLP, PyTorch, TensorFlow, React, and full-stack development. View portfolio, projects, and resume.',
  keywords: generateKeywordsForPage('home').join(', '),
  authors: [{ name: 'Pratham Patel', url: 'https://www.meetpratham.me' }],
  creator: 'Pratham Patel',
  publisher: 'Pratham Patel',
  alternates: {
    canonical: 'https://www.meetpratham.me/home',
  },
  openGraph: {
    title: 'Pratham Patel - AI/ML Engineer & Full-Stack Developer | Portfolio',
    description: 'Explore the portfolio of Pratham Patel, an AI/ML Engineer at Gannon University. Expertise in reinforcement learning, NLP, and modern web development.',
    url: 'https://www.meetpratham.me/home',
    siteName: 'Pratham Patel Portfolio',
    type: 'profile',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.meetpratham.me/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Pratham Patel - AI/ML Engineer Portfolio',
      },
      {
        url: 'https://www.meetpratham.me/prathamfront.jpeg',
        width: 800,
        height: 800,
        alt: 'Pratham Patel Profile Photo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratham Patel - AI/ML Engineer | Gannon University',
    description: 'AI/ML Engineer specializing in reinforcement learning and full-stack development. View my portfolio and projects.',
    creator: '@prathambiren',
    images: ['https://www.meetpratham.me/og-banner.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export default function HomePage() {
  // Multiple schema types for maximum coverage
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://www.meetpratham.me/#pratham-patel',
    name: 'Pratham Patel',
    alternateName: ['CodeWithInferno', 'Pratham Biren Patel', 'Pratham B. Patel'],
    url: 'https://www.meetpratham.me',
    image: 'https://www.meetpratham.me/prathamfront.jpeg',
    description: 'AI/ML Engineer and Computer Science student at Gannon University specializing in reinforcement learning, NLP, and full-stack development.',
    email: 'prathambiren2618@gmail.com',
    telephone: '+1-Erie-PA', // Add if comfortable
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Erie',
      addressRegion: 'PA',
      addressCountry: 'US',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Gannon University',
      url: 'https://www.gannon.edu',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Erie',
        addressRegion: 'PA',
      }
    },
    jobTitle: 'AI/ML Engineer & Full-Stack Developer',
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'Gannon University',
    },
    knowsAbout: [
      'Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Reinforcement Learning',
      'Natural Language Processing', 'Computer Vision', 'PyTorch', 'TensorFlow', 'Python',
      'JavaScript', 'TypeScript', 'React', 'Next.js', 'Full-Stack Development', 'Docker',
      'AWS', 'Cloud Computing', 'Software Engineering'
    ],
    sameAs: [
      'https://github.com/CodeWithInferno',
      'https://linkedin.com/in/pratham-patel-6a40b5323',
      'https://twitter.com/prathambiren',
    ],
    memberOf: [
      {
        '@type': 'Organization',
        name: 'Gannon Codex Programming Club',
        description: 'Founder & President',
      }
    ],
    award: [
      '1st Place - BSidesROC Capture the Flag 2024',
      'Microsoft Future Tech Conference Speaker 2025',
    ],
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: '2024-01-01',
    dateModified: new Date().toISOString(),
    mainEntity: { '@id': 'https://www.meetpratham.me/#pratham-patel' },
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
          name: 'Portfolio',
          item: 'https://www.meetpratham.me/home',
        },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: generateFAQItems().map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.meetpratham.me/#website',
    url: 'https://www.meetpratham.me',
    name: 'Pratham Patel - AI/ML Engineer Portfolio',
    author: { '@id': 'https://www.meetpratham.me/#pratham-patel' },
    description: 'Official portfolio website of Pratham Patel, showcasing AI/ML projects, research, and full-stack development work.',
    inLanguage: 'en-US',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([personSchema, profilePageSchema, faqSchema, websiteSchema]) }}
      />
      <div className="sr-only">
        <h1>Pratham Patel - AI/ML Engineer and Full-Stack Developer Portfolio</h1>
        <p>Welcome to the portfolio of Pratham Patel, a Computer Science student at Gannon University in Erie, Pennsylvania. 
           Specializing in artificial intelligence, machine learning, reinforcement learning, and full-stack development.</p>
      </div>
      <HomeClient />
    </>
  );
}