// SEO Configuration for meetpratham.me
export const seoConfig = {
  defaultTitle: 'Pratham Patel | AI/ML Engineer & Full-Stack Developer',
  titleTemplate: '%s | Pratham Patel',
  defaultDescription: 'AI/ML Engineer and Full-Stack Developer specializing in reinforcement learning, NLP, and modern web development. Building intelligent systems and sharing insights through code.',
  siteUrl: 'https://www.meetpratham.me',
  siteLanguage: 'en',
  siteLocale: 'en_US',
  authorName: 'Pratham Patel',
  authorEmail: 'prathambiren2618@gmail.com',
  twitterHandle: '@prathambiren',
  githubHandle: 'CodeWithInferno',
  linkedinProfile: 'pratham-patel-6a40b5323',
  
  // Default Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.meetpratham.me',
    siteName: 'Pratham Patel Portfolio',
    images: [
      {
        url: 'https://www.meetpratham.me/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Pratham Patel - AI/ML Engineer & Developer',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    handle: '@prathambiren',
    site: '@prathambiren',
    cardType: 'summary_large_image',
  },
  
  // Structured Data Schemas
  schemas: {
    person: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Pratham Patel',
      url: 'https://www.meetpratham.me',
      email: 'prathambiren2618@gmail.com',
      image: 'https://www.meetpratham.me/prathamfront.jpeg',
      jobTitle: 'AI/ML Engineer & Full-Stack Developer',
      worksFor: {
        '@type': 'Organization',
        name: 'Gannon University',
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Gannon University',
      },
      knowsAbout: [
        'Artificial Intelligence',
        'Machine Learning',
        'Deep Learning',
        'Natural Language Processing',
        'Reinforcement Learning',
        'Full-Stack Development',
        'Python',
        'JavaScript',
        'React',
        'Next.js',
        'PyTorch',
        'TensorFlow',
      ],
      sameAs: [
        'https://github.com/CodeWithInferno',
        'https://linkedin.com/in/pratham-patel-6a40b5323',
        'https://twitter.com/prathambiren',
      ],
    },
    
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://www.meetpratham.me',
      name: 'Pratham Patel Portfolio',
      description: 'Personal portfolio and blog of Pratham Patel - AI/ML Engineer and Full-Stack Developer',
      author: {
        '@type': 'Person',
        name: 'Pratham Patel',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.meetpratham.me/bloglist?search={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  },
  
  // Page-specific metadata
  pages: {
    home: {
      title: 'Pratham Patel | AI/ML Engineer & Full-Stack Developer',
      description: 'Welcome to my digital space. I build AI systems, create web applications, and share my journey in tech through projects and blog posts.',
      keywords: ['Pratham Patel', 'AI Engineer', 'ML Engineer', 'Full Stack Developer', 'Portfolio'],
    },
    projects: {
      title: 'Projects',
      description: 'Explore my portfolio of AI/ML projects, web applications, and open-source contributions. From reinforcement learning to full-stack applications.',
      keywords: ['AI Projects', 'Machine Learning Projects', 'Web Development', 'Open Source'],
    },
    blog: {
      title: 'Blog',
      description: 'Technical articles, tutorials, and insights on AI, machine learning, web development, and my journey in tech.',
      keywords: ['Tech Blog', 'AI Tutorials', 'Programming', 'Machine Learning Articles'],
    },
    me: {
      title: 'About Me',
      description: 'Learn about my journey, research work, technical skills, and what drives me as an AI/ML engineer and developer.',
      keywords: ['About', 'Biography', 'Research', 'Experience'],
    },
    wallpapers: {
      title: 'Wallpapers',
      description: 'Collection of AI-generated and custom wallpapers for developers and tech enthusiasts.',
      keywords: ['Wallpapers', 'Developer Wallpapers', 'Tech Art'],
    },
  },
};

// Helper function to generate metadata for pages
export function generateMetadata(page) {
  const pageData = seoConfig.pages[page] || {};
  
  return {
    title: pageData.title || seoConfig.defaultTitle,
    description: pageData.description || seoConfig.defaultDescription,
    keywords: pageData.keywords?.join(', ') || '',
    authors: [{ name: seoConfig.authorName, email: seoConfig.authorEmail }],
    creator: seoConfig.authorName,
    publisher: seoConfig.authorName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(seoConfig.siteUrl),
    alternates: {
      canonical: `${seoConfig.siteUrl}${page === 'home' ? '' : `/${page}`}`,
    },
    openGraph: {
      title: pageData.title || seoConfig.defaultTitle,
      description: pageData.description || seoConfig.defaultDescription,
      url: `${seoConfig.siteUrl}${page === 'home' ? '' : `/${page}`}`,
      siteName: seoConfig.openGraph.siteName,
      type: seoConfig.openGraph.type,
      locale: seoConfig.openGraph.locale,
      images: seoConfig.openGraph.images,
    },
    twitter: {
      card: seoConfig.twitter.cardType,
      title: pageData.title || seoConfig.defaultTitle,
      description: pageData.description || seoConfig.defaultDescription,
      creator: seoConfig.twitter.handle,
      images: [seoConfig.openGraph.images[0].url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add your verification codes when you get them
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };
}

// Generate Article structured data for blog posts
export function generateArticleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description || post.shortDescription,
    author: {
      '@type': 'Person',
      name: seoConfig.authorName,
      url: seoConfig.siteUrl,
    },
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    publisher: {
      '@type': 'Person',
      name: seoConfig.authorName,
      logo: {
        '@type': 'ImageObject',
        url: `${seoConfig.siteUrl}/Logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${seoConfig.siteUrl}/blog/${post.slug}`,
    },
    image: post.image ? {
      '@type': 'ImageObject',
      url: post.image,
      width: 1200,
      height: 630,
    } : undefined,
    keywords: post.keywords?.join(', ') || '',
  };
}

// Generate BreadcrumbList schema
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}