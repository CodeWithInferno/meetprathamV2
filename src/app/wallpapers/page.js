import WallpapersClient from './client';

export const metadata = {
  title: 'Developer Wallpapers by Pratham Patel | AI/Tech Art & Designs',
  description: 'Free developer wallpapers and tech art created by Pratham Patel. Download AI-themed wallpapers, programming backgrounds, and creative tech designs. Perfect for developers and tech enthusiasts.',
  keywords: 'Pratham Patel wallpapers, developer wallpapers, AI wallpapers, tech backgrounds, programming wallpapers, code wallpapers, free tech art, Pratham Patel designs, developer backgrounds',
  alternates: {
    canonical: 'https://www.meetpratham.me/wallpapers',
  },
  openGraph: {
    title: 'Developer Wallpapers Collection - Pratham Patel',
    description: 'Exclusive collection of AI and tech-themed wallpapers designed by Pratham Patel. Free downloads for developers.',
    url: 'https://www.meetpratham.me/wallpapers',
    type: 'website',
    images: [
      {
        url: 'https://www.meetpratham.me/Warp-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Developer Wallpapers by Pratham Patel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Wallpapers - Pratham Patel',
    description: 'Download free AI and tech-themed wallpapers designed by Pratham Patel.',
    images: ['https://www.meetpratham.me/Warp-1.jpg'],
  },
};

export default function WallpapersPage() {
  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWorkSeries',
    name: 'Developer Wallpapers Collection',
    creator: {
      '@type': 'Person',
      name: 'Pratham Patel',
      url: 'https://www.meetpratham.me',
    },
    description: 'A collection of AI and technology-themed wallpapers for developers and tech enthusiasts',
    url: 'https://www.meetpratham.me/wallpapers',
    genre: 'Digital Art',
    keywords: 'wallpapers, developer art, tech backgrounds, AI themes',
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
          name: 'Wallpapers',
          item: 'https://www.meetpratham.me/wallpapers',
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <div className="sr-only">
        <h1>Developer Wallpapers and Tech Art by Pratham Patel</h1>
        <p>Download free wallpapers designed by Pratham Patel, featuring AI themes, programming aesthetics, and technology-inspired artwork.</p>
      </div>
      <WallpapersClient />
    </>
  );
}