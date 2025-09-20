// Comprehensive keyword strategy for maximum search dominance
export const seoKeywords = {
  // Name variations people might search
  nameVariations: [
    'Pratham Patel',
    'Pratham Biren Patel',
    'Pratham B Patel',
    'Pratham Patel Gannon',
    'Pratham Patel AI',
    'Pratham Patel ML',
    'Pratham Patel Engineer',
    'Pratham Patel Developer',
    'Pratham Patel Portfolio',
    'Pratham Patel Resume',
    'Pratham Patel CV',
    'Pratham Patel GitHub',
    'CodeWithInferno',
    'Pratham Patel Gannon University',
    'Pratham Patel Erie PA',
    'Pratham Patel Pennsylvania',
    'Pratham Patel Computer Science',
    'Pratham Patel AI Engineer',
    'Pratham Patel Machine Learning',
    'Pratham Patel Full Stack',
    'Pratham Patel React',
    'Pratham Patel Python',
    'Pratham Patel PyTorch',
    'Pratham Patel Research',
    'Pratham Patel Projects',
    'Pratham Patel Blog',
    'Pratham Patel Contact',
    'Pratham Patel LinkedIn',
    'prathambiren2618',
    '@prathambiren'
  ],
  
  // Technical skills for compound searches
  technicalCompounds: [
    'Pratham Patel Reinforcement Learning',
    'Pratham Patel NLP',
    'Pratham Patel Deep Learning',
    'Pratham Patel Neural Networks',
    'Pratham Patel TensorFlow Developer',
    'Pratham Patel PyTorch Expert',
    'Pratham Patel React Developer',
    'Pratham Patel Next.js Developer',
    'Pratham Patel Full Stack Developer',
    'Pratham Patel Software Engineer',
    'Pratham Patel AI Researcher',
    'Pratham Patel ML Engineer',
    'Pratham Patel Data Scientist',
    'Pratham Patel Computer Vision',
    'Pratham Patel LLM Developer',
    'Pratham Patel RAG Systems',
    'Pratham Patel PEFT Expert',
    'Pratham Patel Docker Developer',
    'Pratham Patel AWS Engineer',
    'Pratham Patel Cloud Developer'
  ],
  
  // Location-based searches
  locationBased: [
    'AI Engineer Erie PA',
    'Machine Learning Engineer Erie Pennsylvania',
    'Gannon University AI Student',
    'Gannon University Computer Science',
    'Erie PA Software Developer',
    'Pennsylvania AI Developer',
    'Erie Tech Community',
    'Gannon Codex Club',
    'BSidesROC CTF Winner',
    'Erie PA Python Developer',
    'Pennsylvania React Developer',
    'Gannon University Researcher'
  ],
  
  // Common search queries
  commonQueries: [
    'hire Pratham Patel',
    'contact Pratham Patel',
    'Pratham Patel availability',
    'Pratham Patel freelance',
    'Pratham Patel consulting',
    'Pratham Patel internship',
    'Pratham Patel experience',
    'Pratham Patel skills',
    'Pratham Patel education',
    'Pratham Patel achievements',
    'Pratham Patel certifications',
    'Pratham Patel publications',
    'Pratham Patel research papers',
    'Pratham Patel open source',
    'Pratham Patel contributions'
  ],
  
  // Long-tail keywords
  longTail: [
    'best AI engineer Gannon University',
    'top machine learning student Erie PA',
    'reinforcement learning expert Pennsylvania',
    'full stack AI developer for hire',
    'Python PyTorch developer Erie',
    'React Next.js developer Pennsylvania',
    'AI research intern available',
    'machine learning consulting services',
    'custom AI solutions developer',
    'LLM fine-tuning expert',
    'computer vision project developer',
    'NLP systems architect'
  ]
};

// Generate meta keywords for any page
export function generateKeywordsForPage(pageName) {
  const baseKeywords = [
    'Pratham Patel',
    'AI Engineer',
    'ML Engineer',
    'Gannon University',
    'Erie PA',
    'Computer Science',
    'Portfolio'
  ];
  
  const pageSpecific = {
    home: [...seoKeywords.nameVariations.slice(0, 10)],
    projects: [...seoKeywords.technicalCompounds.slice(0, 10)],
    blog: ['Tech Blog', 'AI Articles', 'ML Tutorials', ...seoKeywords.commonQueries.slice(0, 5)],
    about: [...seoKeywords.locationBased.slice(0, 10)],
    contact: ['hire', 'freelance', 'consulting', 'contact', ...seoKeywords.commonQueries],
    wallpapers: ['AI Wallpapers', 'Tech Art', 'Developer Wallpapers', 'Pratham Patel Designs'],
    default: baseKeywords
  };
  
  return [...new Set([...baseKeywords, ...(pageSpecific[pageName] || pageSpecific.default)])];
}

// Generate FAQ items for structured data
export function generateFAQItems() {
  return [
    {
      question: "Who is Pratham Patel?",
      answer: "Pratham Patel is an AI/ML Engineer and Computer Science student at Gannon University, specializing in reinforcement learning, NLP, and full-stack development."
    },
    {
      question: "What technologies does Pratham Patel work with?",
      answer: "Pratham works with Python, PyTorch, TensorFlow, React, Next.js, Docker, and various AI/ML frameworks. He specializes in reinforcement learning, NLP, and full-stack development."
    },
    {
      question: "Where is Pratham Patel located?",
      answer: "Pratham Patel is based in Erie, Pennsylvania, where he studies Computer Science at Gannon University."
    },
    {
      question: "How can I contact Pratham Patel for projects?",
      answer: "You can contact Pratham Patel via email at prathambiren2618@gmail.com or connect on LinkedIn at linkedin.com/in/pratham-patel-6a40b5323/"
    },
    {
      question: "What is Pratham Patel's experience in AI/ML?",
      answer: "Pratham has experience as an AI Research Intern at DA-IICT, developed adversarial robustness models with 97% accuracy, and created novel LLM reasoning frameworks with 60% performance improvements."
    },
    {
      question: "Is Pratham Patel available for freelance work?",
      answer: "Yes, Pratham Patel is open to discussing freelance projects, consulting opportunities, and collaborations in AI/ML and full-stack development."
    },
    {
      question: "What achievements does Pratham Patel have?",
      answer: "Pratham won 1st place at BSidesROC CTF, founded the Gannon Codex Programming Club with 50+ members, and has research accepted at Microsoft Future Tech Conference."
    },
    {
      question: "What is Pratham Patel's GitHub?",
      answer: "Pratham Patel's GitHub username is CodeWithInferno, where he shares open-source projects and contributions."
    }
  ];
}