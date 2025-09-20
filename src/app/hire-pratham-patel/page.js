import Link from 'next/link';

export const metadata = {
  title: 'Hire Pratham Patel - AI/ML Engineer for Your Project | Available for Freelance',
  description: 'Hire Pratham Patel for AI/ML development, consulting, or freelance projects. Experienced in PyTorch, TensorFlow, reinforcement learning, NLP, and full-stack development. Computer Science student at Gannon University.',
  keywords: 'hire Pratham Patel, Pratham Patel freelance, Pratham Patel consulting, AI engineer for hire, ML developer available, hire AI developer, Pratham Patel availability, Pratham Patel rates, Pratham Patel projects',
  alternates: {
    canonical: 'https://www.meetpratham.me/hire-pratham-patel',
  },
  openGraph: {
    title: 'Hire Pratham Patel - AI/ML Engineer Available for Projects',
    description: 'Looking to hire an AI/ML engineer? Pratham Patel is available for freelance projects, consulting, and collaborations.',
    url: 'https://www.meetpratham.me/hire-pratham-patel',
    type: 'website',
    images: [
      {
        url: 'https://www.meetpratham.me/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Hire Pratham Patel - AI/ML Engineer',
      },
    ],
  },
};

export default function HirePage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Pratham Patel - AI/ML Engineering Services',
    provider: {
      '@type': 'Person',
      name: 'Pratham Patel',
      email: 'prathambiren2618@gmail.com',
      jobTitle: 'AI/ML Engineer',
    },
    description: 'Professional AI/ML development services including model development, NLP solutions, computer vision, and full-stack integration.',
    areaServed: 'Worldwide',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceType: 'Remote and On-site',
      serviceUrl: 'https://www.meetpratham.me/hire-pratham-patel',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      offerCount: '5',
      offers: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI/ML Model Development',
            description: 'Custom machine learning model development using PyTorch and TensorFlow',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NLP Solutions',
            description: 'Natural language processing applications and LLM integration',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Full-Stack AI Integration',
            description: 'Integrating AI models into web applications with React and Next.js',
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Hire Pratham Patel
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300">
              AI/ML Engineer Available for Your Next Project
            </p>
          </div>

          <section className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-yellow-400">Why Hire Me?</h2>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3">▸</span>
                  <span><strong>Proven Track Record:</strong> 97% accuracy in malware detection models, 60% improvement in LLM reasoning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3">▸</span>
                  <span><strong>Full-Stack Capability:</strong> From AI model to production deployment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3">▸</span>
                  <span><strong>Research Background:</strong> Published work accepted at Microsoft Future Tech Conference</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3">▸</span>
                  <span><strong>Leadership:</strong> Founder of 50+ member programming club</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3">▸</span>
                  <span><strong>Competitive:</strong> 1st place BSidesROC CTF winner</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-6 text-yellow-400">Services Offered</h2>
              <div className="space-y-4">
                <div className="border border-gray-700 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">AI/ML Development</h3>
                  <p className="text-gray-300">Custom models, reinforcement learning, deep learning solutions</p>
                </div>
                <div className="border border-gray-700 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">NLP & LLM Solutions</h3>
                  <p className="text-gray-300">RAG systems, fine-tuning, prompt engineering, chatbots</p>
                </div>
                <div className="border border-gray-700 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Computer Vision</h3>
                  <p className="text-gray-300">Image processing, object detection, video analysis</p>
                </div>
                <div className="border border-gray-700 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Full-Stack Integration</h3>
                  <p className="text-gray-300">React, Next.js, FastAPI, Docker deployment</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-8 text-center">Technical Expertise</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {['Python', 'PyTorch', 'TensorFlow', 'React', 'Next.js', 'Docker', 'AWS', 'FastAPI'].map(skill => (
                <div key={skill} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <p className="text-lg font-semibold text-yellow-400">{skill}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-8 text-center">Project Timeline</h2>
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <h3 className="text-2xl font-semibold text-yellow-400 mb-2">Quick Consultation</h3>
                  <p className="text-gray-300">1-2 hours</p>
                  <p className="text-sm mt-2">Technical advice, feasibility analysis</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-yellow-400 mb-2">Short Projects</h3>
                  <p className="text-gray-300">1-4 weeks</p>
                  <p className="text-sm mt-2">MVP development, proof of concepts</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-yellow-400 mb-2">Long-term</h3>
                  <p className="text-gray-300">1-6 months</p>
                  <p className="text-sm mt-2">Full product development, research projects</p>
                </div>
              </div>
            </div>
          </section>

          <section className="text-center bg-yellow-400 text-black p-12 rounded-lg">
            <h2 className="text-4xl font-bold mb-6">Ready to Start?</h2>
            <p className="text-xl mb-8">
              Let&apos;s discuss your AI/ML project and how I can help bring your vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="mailto:prathambiren2618@gmail.com?subject=Project Inquiry - Hiring Pratham Patel" 
                className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition text-lg font-semibold"
              >
                Send Project Details
              </a>
              <Link 
                href="/projects" 
                className="bg-white text-black border-2 border-black px-8 py-4 rounded-lg hover:bg-gray-100 transition text-lg font-semibold"
              >
                View Past Work
              </Link>
              <Link 
                href="/resume/Resume-17.pdf" 
                download
                className="bg-white text-black border-2 border-black px-8 py-4 rounded-lg hover:bg-gray-100 transition text-lg font-semibold"
              >
                Download Resume
              </Link>
            </div>
          </section>

          <section className="mt-20 text-center">
            <p className="text-gray-400">
              Based in Erie, PA • Available for remote work worldwide • 
              <Link href="/erie-pa-ai-engineer" className="text-yellow-400 hover:underline ml-2">
                Local to Northwestern PA
              </Link>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}