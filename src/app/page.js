// src/app/page.js
import SummaryClientPage from './Components/summary/client';
import SmoothScrollProvider from './Components/summary/SmoothScrollProvider';
import { client } from '../../sanity/lib/client';
import { urlForImage } from '../../sanity/lib/image';

// Fetches project data from Sanity CMS
async function getProjects() {
  const projectQuery = `*[_type == "work"]{
    _id,
    title,
    description,
    gitLink,
    image
  }`;
  const sanityProjects = await client.fetch(projectQuery);
  return sanityProjects.map(project => ({
    ...project,
    imageUrl: urlForImage(project.image),
  }));
}

// Fetches blog posts from Sanity CMS
async function getBlogPosts() {
  const blogQuery = `*[_type == "post"] | order(publishedAt desc)[0...6]{
    _id,
    title,
    shortDescription,
    slug,
    publishedAt,
    banner,
    "topics": topics[]->title
  }`;
  const sanityPosts = await client.fetch(blogQuery);
  return sanityPosts.map(post => ({
    ...post,
    bannerUrl: post.banner ? urlForImage(post.banner) : null,
  }));
}

// Fetches sneak peek images from Sanity CMS
async function getSneakPeekImages() {
  const imageQuery = `*[_type == "imagePost"][0...8]{
    _id,
    title,
    image
  }`;
  const sanityImages = await client.fetch(imageQuery);
  return sanityImages.map(img => ({
    ...img,
    imageUrl: urlForImage(img.image),
  }));
}

// Statically defines personal data based on the provided resume
function getProfileData() {
  const education = {
    degree: 'B.S. in Computer Science',
    university: 'Gannon University, Erie, PA',
    date: 'Expected May 2028',
    courses: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Database Systems', 'Operating Systems', 'Computer Networks', 'Software Engineering'],
  };

  const researchExperience = [
    {
      role: 'AI Research Intern',
      company: 'DA-IICT',
      date: 'Summer 2025',
      points: [
        'Engineered a reproducible RL research pipeline using Docker, reducing model evaluation time by 40% and boosting accuracy by 20%.',
        'Developed robust experiment harnesses for hyperparameter optimization and ablation studies, integrating Weights & Biases for metric visualization.',
        'Produced high-quality, reusable code modules to support ongoing and future studies.',
      ],
    },
    {
      role: 'Synergistic Self-Correction for LLM Reasoning',
      company: 'Independent Research',
      date: '2025',
      points: [
        'Architected a novel reasoning framework augmenting LLMs with Proximal Policy Optimization (PPO) and RAG-based grounding.',
        'Demonstrated a 60% relative improvement on the GSM8K benchmark over baseline models.',
        'Developed a complete research codebase, including an evaluation harness and interpretability tools.',
      ],
    },
    {
      role: 'Adversarial Robustness in Android Malware Detection',
      company: 'Gannon University',
      date: '2025',
      points: [
        'Constructed a hybrid model achieving 97% accuracy on a dataset of 100,000+ APKs.',
        'Validated model robustness against adversarial attacks and utilized SHAP for post-hoc interpretability.',
        'Accepted for presentation at the Microsoft Future Tech Conference (Nov 2025).',
      ],
    },
  ];

  const leadershipAndAwards = [
    {
      title: 'Founder & President, Gannon Codex Programming Club',
      date: '2024–Present',
      description: 'Grew community to 50+ members; organized AI/ML workshops, hackathons, and mentored peers on research methods.',
    },
    {
      title: '1st Place, BSidesROC Capture the Flag',
      date: '2024',
      description: 'Led a team of four to win a university-level cybersecurity competition focused on reverse engineering, cryptography, and exploitation.',
    },
    {
      title: 'CIS Lab Technician',
      date: '2024–Present',
      description: 'Maintained 95% lab uptime and reduced average IT ticket resolution time by 30%.',
    },
  ];

  const technicalSkills = [
    { category: 'Languages', skills: ['Python', 'C++', 'Java', 'SQL', 'JavaScript/TypeScript'] },
    { category: 'AI/ML', skills: ['PyTorch', 'TensorFlow', 'JAX', 'Transformers', 'RL (PPO, DQN)', 'RAG', 'PEFT', 'scikit-learn'] },
    { category: 'Tools & Systems', skills: ['Docker', 'Git', 'Linux', 'Slurm', 'FastAPI', 'Flask', 'Next.js', 'Weights & Biases'] },
    { category: 'Data & Cloud', skills: ['PostgreSQL', 'Redis', 'MongoDB', 'AWS', 'GCP (Foundational)'] },
  ];

  const socialLinks = {
    github: 'https://github.com/CodeWithInferno',
    linkedin: 'https://linkedin.com/in/pratham-patel-6a40b5323/',
    twitter: 'https://twitter.com/prathambiren', // Placeholder, please update if incorrect
  };

  // Research papers and publications
  const researchPapers = [
    {
      title: 'Synergistic Self-Correction for Enhanced LLM Reasoning',
      abstract: 'A novel framework that augments large language models with Proximal Policy Optimization and RAG-based grounding, achieving 60% improvement on GSM8K benchmark.',
      concepts: ['Reinforcement Learning', 'Language Models'],
      status: 'In Progress',
      conference: 'Targeting ICML 2026',
    },
    {
      title: 'Adversarial Robustness in Android Malware Detection',
      abstract: 'Hybrid model achieving 97% accuracy on 100,000+ APKs with validated robustness against adversarial attacks using SHAP interpretability.',
      concepts: ['Security', 'Machine Learning'],
      status: 'Accepted',
      conference: 'Microsoft Future Tech Conference 2025',
    },
    {
      title: 'Reproducible RL Research Pipeline',
      abstract: 'Docker-based framework reducing model evaluation time by 40% while improving accuracy by 20% through standardized experiment harnesses.',
      concepts: ['MLOps', 'Reproducibility'],
      status: 'Completed',
      conference: 'DA-IICT Research Symposium',
    },
  ];
  
  return { education, researchExperience, leadershipAndAwards, technicalSkills, socialLinks, researchPapers };
}

// SEO Metadata
export const metadata = {
  title: 'Pratham Patel | AI/ML Engineer & Researcher | Digital CV',
  description: 'The digital curriculum vitae of Pratham Patel, a Computer Science student at Gannon University specializing in AI and Machine Learning. Showcasing research in Reinforcement Learning, NLP, and projects in AI-driven systems.',
  keywords: ['Pratham Patel', 'AI', 'Machine Learning', 'Reinforcement Learning', 'NLP', 'Portfolio', 'Resume', 'CV', 'Gannon University', 'Software Engineer'],
  alternates: {
    canonical: 'https://www.meetpratham.me',
  },
  openGraph: {
    title: 'Pratham Patel | AI/ML Engineer & Researcher',
    description: 'Computer Science student at Gannon University specializing in AI/ML. Explore my research, projects, and technical journey.',
    url: 'https://www.meetpratham.me',
    type: 'profile',
    images: [
      {
        url: 'https://www.meetpratham.me/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Pratham Patel - AI/ML Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratham Patel | AI/ML Engineer & Researcher',
    description: 'Computer Science student at Gannon University specializing in AI/ML.',
  },
};

export default async function SummaryPage() {
  const projects = await getProjects();
  const blogPosts = await getBlogPosts();
  const sneakPeekImages = await getSneakPeekImages();
  const { education, researchExperience, leadershipAndAwards, technicalSkills, socialLinks, researchPapers } = getProfileData();

  // Enhanced JSON-LD Structured Data for SEO
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://www.meetpratham.me/#person',
    name: 'Pratham Patel',
    givenName: 'Pratham',
    familyName: 'Patel',
    url: 'https://www.meetpratham.me',
    image: 'https://www.meetpratham.me/prathamfront.jpeg',
    sameAs: [
      socialLinks.linkedin,
      socialLinks.github,
      socialLinks.twitter,
    ],
    jobTitle: 'AI/ML Engineer & Researcher',
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'Gannon University',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Erie',
        addressRegion: 'PA',
        addressCountry: 'US',
      },
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Gannon University',
      url: 'https://www.gannon.edu',
    },
    knowsAbout: technicalSkills.flatMap(cat => cat.skills),
    email: 'prathambiren2618@gmail.com',
    description: 'AI/ML Engineer specializing in reinforcement learning, NLP, and full-stack development. Building intelligent systems and sharing knowledge through research and open-source projects.',
    hasOccupation: {
      '@type': 'Occupation',
      name: 'AI/ML Engineer',
      skills: technicalSkills.flatMap(cat => cat.skills).join(', '),
      responsibilities: 'Research in reinforcement learning, developing AI systems, full-stack development, technical writing',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.meetpratham.me/#website',
    url: 'https://www.meetpratham.me',
    name: 'Pratham Patel Portfolio',
    description: 'Personal portfolio and blog of Pratham Patel - AI/ML Engineer and Full-Stack Developer',
    publisher: {
      '@id': 'https://www.meetpratham.me/#person',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.meetpratham.me/bloglist?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.meetpratham.me',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([personSchema, websiteSchema, breadcrumbSchema]) }}
      />
      <SmoothScrollProvider>
        <SummaryClientPage 
          projects={projects}
          blogPosts={blogPosts}
          sneakPeekImages={sneakPeekImages}
          education={education}
          researchExperience={researchExperience}
          leadershipAndAwards={leadershipAndAwards}
          technicalSkills={technicalSkills}
          socialLinks={socialLinks}
          researchPapers={researchPapers}
        />
      </SmoothScrollProvider>
    </>
  );
}