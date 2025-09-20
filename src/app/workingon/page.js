import WorkingOnClient from './client';
import { generateKeywordsForPage } from '@/lib/seo-keywords';

export const metadata = {
  title: 'Current Projects - Pratham Patel | AI/ML Research & Development',
  description: 'Discover what Pratham Patel is currently working on. Active AI/ML research projects, reinforcement learning experiments, LLM development, and open-source contributions at Gannon University.',
  keywords: 'Pratham Patel current projects, AI research 2025, ML projects in progress, Gannon University research, reinforcement learning projects, LLM development, open source AI, Erie PA developer projects',
  alternates: {
    canonical: 'https://www.meetpratham.me/workingon',
  },
  openGraph: {
    title: 'Current Projects & Research - Pratham Patel',
    description: 'See what AI/ML projects and research Pratham Patel is currently working on at Gannon University.',
    url: 'https://www.meetpratham.me/workingon',
    type: 'website',
    images: [
      {
        url: 'https://www.meetpratham.me/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Pratham Patel Current Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Current Projects - Pratham Patel',
    description: 'Active AI/ML research and development projects.',
    images: ['https://www.meetpratham.me/og-banner.png'],
  },
};

export default function WorkingOnPage() {
  const projectsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Current Projects and Research',
    description: 'Active AI/ML projects and research initiatives by Pratham Patel',
    numberOfItems: 5, // Update based on actual count
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'SoftwareSourceCode',
          name: 'LLM Reasoning Framework',
          description: 'Novel reasoning framework augmenting LLMs with PPO and RAG-based grounding',
          programmingLanguage: 'Python',
          keywords: 'LLM, reinforcement learning, RAG, PPO',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'ResearchProject',
          name: 'Adversarial Robustness in Android Malware Detection',
          description: 'Building robust models achieving 97% accuracy on 100,000+ APKs',
          keywords: 'cybersecurity, machine learning, Android, adversarial robustness',
        },
      },
    ],
    creator: {
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
          name: 'Current Work',
          item: 'https://www.meetpratham.me/workingon',
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
      <h1 className="sr-only">Current AI/ML Projects and Research - Pratham Patel at Gannon University</h1>
      <WorkingOnClient />
    </>
  );
}