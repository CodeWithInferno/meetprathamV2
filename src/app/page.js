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
  
  return { education, researchExperience, leadershipAndAwards, technicalSkills, socialLinks };
}

// SEO Metadata
export const metadata = {
  title: 'Pratham Patel | AI/ML Engineer & Researcher | Digital CV',
  description: 'The digital curriculum vitae of Pratham Patel, a Computer Science student at Gannon University specializing in AI and Machine Learning. Showcasing research in Reinforcement Learning, NLP, and projects in AI-driven systems.',
  keywords: ['Pratham Patel', 'AI', 'Machine Learning', 'Reinforcement Learning', 'NLP', 'Portfolio', 'Resume', 'CV', 'Gannon University', 'Software Engineer'],
  author: 'Pratham Patel',
};

export default async function SummaryPage() {
  const projects = await getProjects();
  const { education, researchExperience, leadershipAndAwards, technicalSkills, socialLinks } = getProfileData();

  // JSON-LD Structured Data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Pratham Patel',
    url: 'https://meetpratham.com/summary', // Replace with your actual domain
    sameAs: [
      socialLinks.linkedin,
      socialLinks.github,
    ],
    jobTitle: 'AI/ML Engineer & Researcher',
    alumniOf: 'Gannon University',
    knowsAbout: technicalSkills.flatMap(cat => cat.skills),
    email: 'prathambiren2618@gmail.com',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmoothScrollProvider>
        <SummaryClientPage 
          projects={projects}
          education={education}
          researchExperience={researchExperience}
          leadershipAndAwards={leadershipAndAwards}
          technicalSkills={technicalSkills}
          socialLinks={socialLinks} 
        />
      </SmoothScrollProvider>
    </>
  );
}