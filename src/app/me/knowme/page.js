import KnowMeClient from './client';

export const metadata = {
  title: 'Personal Life & Gallery - Pratham Patel | Student Life at Gannon University',
  description: 'Personal photo gallery and social media links of Pratham Patel. Get to know the person behind the code - student life at Gannon University, hackathons, coding sessions, and Erie PA experiences.',
  keywords: 'Pratham Patel personal life, Pratham Patel photos, Gannon University student life, Erie PA student, Pratham Patel gallery, CodeWithInferno personal, computer science student life',
  alternates: {
    canonical: 'https://www.meetpratham.me/me/knowme',
  },
  openGraph: {
    title: 'Get to Know Pratham Patel - Personal Gallery',
    description: 'Personal side of Pratham Patel - student life, coding sessions, and experiences at Gannon University.',
    url: 'https://www.meetpratham.me/me/knowme',
    type: 'profile',
    images: [
      {
        url: 'https://www.meetpratham.me/A_1.123.1.jpg',
        width: 1200,
        height: 630,
        alt: 'Pratham Patel Personal Gallery',
      },
    ],
  },
};

export default function KnowMePage() {
  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Pratham Patel - Personal Life Gallery',
    description: 'Personal photographs showcasing student life and experiences',
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
          name: 'About',
          item: 'https://www.meetpratham.me/me',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Personal',
          item: 'https://www.meetpratham.me/me/knowme',
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
      <KnowMeClient />
    </>
  );
}