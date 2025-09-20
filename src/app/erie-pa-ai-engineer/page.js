import Link from 'next/link';

export const metadata = {
  title: 'AI/ML Engineer in Erie, PA - Pratham Patel | Gannon University',
  description: 'Looking for an AI/ML engineer in Erie, Pennsylvania? Pratham Patel is a Computer Science student at Gannon University specializing in artificial intelligence, machine learning, and full-stack development. Available for projects and consulting.',
  keywords: 'AI engineer Erie PA, ML engineer Erie Pennsylvania, Gannon University AI student, Erie PA developer, Pennsylvania machine learning engineer, Erie tech community, AI consulting Erie, ML developer northwestern PA',
  alternates: {
    canonical: 'https://www.meetpratham.me/erie-pa-ai-engineer',
  },
  openGraph: {
    title: 'Pratham Patel - AI/ML Engineer in Erie, PA',
    description: 'Local AI/ML engineer and Gannon University student available for projects in Erie, Pennsylvania.',
    url: 'https://www.meetpratham.me/erie-pa-ai-engineer',
    type: 'profile',
    images: [
      {
        url: 'https://www.meetpratham.me/prathamfront.jpeg',
        width: 1200,
        height: 630,
        alt: 'Pratham Patel - AI Engineer Erie PA',
      },
    ],
  },
};

export default function ErieAIEngineerPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Pratham Patel',
    jobTitle: 'AI/ML Engineer',
    url: 'https://www.meetpratham.me',
    email: 'prathambiren2618@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Erie',
      addressRegion: 'PA',
      postalCode: '16501',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.1292,
      longitude: -80.0851,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Erie',
      },
      {
        '@type': 'State',
        name: 'Pennsylvania',
      },
      {
        '@type': 'Country',
        name: 'United States',
      },
    ],
    knowsAbout: ['AI', 'Machine Learning', 'Deep Learning', 'Python', 'PyTorch', 'TensorFlow'],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Gannon University',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '109 University Square',
        addressLocality: 'Erie',
        addressRegion: 'PA',
        postalCode: '16541',
      },
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI/ML Development Services',
    provider: { '@id': 'https://www.meetpratham.me/#pratham-patel' },
    areaServed: {
      '@type': 'State',
      name: 'Pennsylvania',
    },
    description: 'AI and machine learning development services including reinforcement learning, NLP, computer vision, and full-stack development.',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: 'Contact for pricing',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, serviceSchema]) }}
      />
      
      <div className="min-h-screen bg-white text-black">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            AI/ML Engineer in Erie, Pennsylvania
          </h1>
          
          <p className="text-2xl text-gray-700 mb-8">
            Local expertise in artificial intelligence and machine learning, right here in Northwestern PA
          </p>
          
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">About Pratham Patel</h2>
            <p className="text-lg mb-4">
              I'm Pratham Patel, a Computer Science student at Gannon University in Erie, PA, specializing in 
              artificial intelligence and machine learning. As a local AI engineer, I bring cutting-edge technology 
              expertise to the Erie tech community.
            </p>
            <p className="text-lg mb-4">
              Located in the heart of Erie, I'm available for local projects, consulting, and collaborations with 
              businesses and organizations throughout Northwestern Pennsylvania.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Services for Erie Area Businesses</h2>
            <ul className="space-y-4 text-lg">
              <li>✓ AI/ML Model Development and Deployment</li>
              <li>✓ Natural Language Processing Solutions</li>
              <li>✓ Computer Vision Applications</li>
              <li>✓ Predictive Analytics and Data Science</li>
              <li>✓ Full-Stack Web Development with AI Integration</li>
              <li>✓ AI Strategy Consulting for Local Businesses</li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Local Involvement</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-3">Gannon University</h3>
                <p className="text-lg">
                  Active Computer Science student contributing to research and leading the Gannon Codex 
                  Programming Club with 50+ members.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">Erie Tech Community</h3>
                <p className="text-lg">
                  Organizing AI/ML workshops, hackathons, and mentoring local students interested in 
                  artificial intelligence.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Choose a Local AI Engineer?</h2>
            <ul className="space-y-3 text-lg">
              <li>• Face-to-face meetings and consultations in Erie</li>
              <li>• Understanding of local business needs and challenges</li>
              <li>• Quick response times and same timezone communication</li>
              <li>• Support for the local tech ecosystem</li>
              <li>• Connections with Gannon University resources</li>
            </ul>
          </section>

          <section className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-lg mb-6">
              Ready to bring AI/ML solutions to your Erie-based business? Let's discuss how artificial 
              intelligence can transform your operations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="mailto:prathambiren2618@gmail.com?subject=AI Project Inquiry from Erie Business" 
                className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition text-lg font-semibold"
              >
                Contact for Erie Projects
              </Link>
              <Link 
                href="/projects" 
                className="border-2 border-black px-8 py-4 rounded-lg hover:bg-gray-200 transition text-lg font-semibold"
              >
                View My Work
              </Link>
              <Link 
                href="/" 
                className="border-2 border-black px-8 py-4 rounded-lg hover:bg-gray-200 transition text-lg font-semibold"
              >
                Full Portfolio
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}