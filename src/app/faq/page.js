import { generateFAQItems } from '@/lib/seo-keywords';
import Link from 'next/link';

export const metadata = {
  title: 'Frequently Asked Questions about Pratham Patel | AI/ML Engineer FAQ',
  description: 'Common questions about Pratham Patel - AI/ML Engineer at Gannon University. Learn about his experience, skills, availability for projects, and how to contact him.',
  keywords: 'Pratham Patel FAQ, questions about Pratham Patel, hire Pratham Patel, Pratham Patel experience, Pratham Patel skills, contact Pratham Patel, AI engineer FAQ',
  alternates: {
    canonical: 'https://www.meetpratham.me/faq',
  },
  openGraph: {
    title: 'FAQ - Pratham Patel | AI/ML Engineer',
    description: 'Frequently asked questions about Pratham Patel, his work, and how to collaborate.',
    url: 'https://www.meetpratham.me/faq',
    type: 'website',
  },
};

export default function FAQPage() {
  const faqItems = generateFAQItems();
  
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-white text-black py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 mb-12">
            Everything you need to know about Pratham Patel, AI/ML Engineer at Gannon University
          </p>
          
          <div className="space-y-8">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-semibold mb-4">{item.question}</h2>
                <p className="text-lg text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 p-8 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-lg mb-6">
              Feel free to reach out directly. I&apos;m always happy to discuss AI/ML projects, research opportunities, or potential collaborations.
            </p>
            <div className="flex gap-4">
              <Link 
                href="mailto:prathambiren2618@gmail.com" 
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Email Me
              </Link>
              <Link 
                href="/linktree" 
                className="border-2 border-black px-6 py-3 rounded-lg hover:bg-gray-200 transition"
              >
                View All Contact Options
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}