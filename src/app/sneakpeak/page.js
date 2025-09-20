import SneakPeakClient from './client';

export const metadata = {
  title: 'Behind the Scenes - Pratham Patel | Personal Gallery & Life at Gannon University',
  description: 'Get a glimpse into the life of Pratham Patel - AI/ML Engineer at Gannon University. Personal photos, campus life, hackathons, research work, and journey as a Computer Science student in Erie, PA.',
  keywords: 'Pratham Patel personal, Pratham Patel life, Gannon University student, Erie PA developer, Pratham Patel photos, AI engineer life, computer science student, Gannon Codex Club, BSidesROC CTF',
  alternates: {
    canonical: 'https://www.meetpratham.me/sneakpeak',
  },
  openGraph: {
    title: 'Sneak Peek into Pratham Patel\'s Life - AI Engineer & Student',
    description: 'Personal gallery showcasing life as an AI/ML engineer and Computer Science student at Gannon University.',
    url: 'https://www.meetpratham.me/sneakpeak',
    type: 'profile',
    images: [
      {
        url: 'https://www.meetpratham.me/prathamfront.jpeg',
        width: 1200,
        height: 630,
        alt: 'Pratham Patel - Personal Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Behind the Scenes - Pratham Patel',
    description: 'Personal glimpses into the life of an AI/ML engineer and student.',
    images: ['https://www.meetpratham.me/prathamfront.jpeg'],
  },
};

export default function SneakPeakPage() {
  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Pratham Patel - Personal Photo Gallery',
    description: 'A personal collection showcasing life as an AI/ML engineer and Computer Science student',
    creator: {
      '@type': 'Person',
      name: 'Pratham Patel',
      jobTitle: 'AI/ML Engineer',
      affiliation: {
        '@type': 'EducationalOrganization',
        name: 'Gannon University',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Erie',
          addressRegion: 'PA',
        },
      },
    },
    url: 'https://www.meetpratham.me/sneakpeak',
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
          name: 'Gallery',
          item: 'https://www.meetpratham.me/sneakpeak',
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />
      <h1 className="sr-only">Pratham Patel Personal Gallery - Life as an AI/ML Engineer at Gannon University</h1>
      <SneakPeakClient />
    </>
  );
}