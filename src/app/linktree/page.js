import LinkTreeClient from './client';

export const metadata = {
  title: 'Contact Pratham Patel - Links & Social Media | AI/ML Engineer Erie PA',
  description: 'Connect with Pratham Patel on GitHub, LinkedIn, Twitter, and more. AI/ML Engineer at Gannon University. Available for projects, consulting, and collaboration. Contact: prathambiren2618@gmail.com',
  keywords: 'Pratham Patel contact, Pratham Patel links, Pratham Patel social media, Pratham Patel GitHub, CodeWithInferno, Pratham Patel LinkedIn, hire Pratham Patel, contact AI engineer Erie PA',
  alternates: {
    canonical: 'https://www.meetpratham.me/linktree',
  },
  openGraph: {
    title: 'Contact & Connect with Pratham Patel - AI/ML Engineer',
    description: 'All links and contact information for Pratham Patel. GitHub, LinkedIn, Email, and social media profiles.',
    url: 'https://www.meetpratham.me/linktree',
    type: 'profile',
    images: [
      {
        url: 'https://www.meetpratham.me/prathamfront.jpeg',
        width: 800,
        height: 800,
        alt: 'Pratham Patel - AI/ML Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Connect with Pratham Patel',
    description: 'Find all links and contact information for Pratham Patel, AI/ML Engineer at Gannon University.',
    images: ['https://www.meetpratham.me/prathamfront.jpeg'],
  },
};

export default function LinkTreePage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Pratham Patel',
    description: 'Contact information and social media links for Pratham Patel',
    url: 'https://www.meetpratham.me/linktree',
    mainEntity: {
      '@type': 'Person',
      name: 'Pratham Patel',
      email: 'prathambiren2618@gmail.com',
      url: 'https://www.meetpratham.me',
      sameAs: [
        'https://github.com/CodeWithInferno',
        'https://linkedin.com/in/pratham-patel-6a40b5323',
        'https://twitter.com/prathambiren',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'prathambiren2618@gmail.com',
        contactType: 'professional inquiries',
        availableLanguage: ['en'],
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
          name: 'Contact',
          item: 'https://www.meetpratham.me/linktree',
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <h1 className="sr-only">Contact Pratham Patel - AI/ML Engineer at Gannon University</h1>
      <LinkTreeClient />
    </>
  );
}