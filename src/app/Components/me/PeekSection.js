// app/me/PeekSection.jsx
import Link from 'next/link';

export default function PeekSection() {
  return (
    <section className="relative min-h-screen bg-[#f0f0f0] flex items-center justify-center p-8 overflow-hidden workbench-bg">
      <div className="relative text-center flex flex-col items-center gap-12 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">My Journey in Tech</h2>
        <div className="prose prose-lg text-gray-700 mb-8">
          <p className="mb-4">
            As a Computer Science student at Gannon University, I&apos;ve dedicated myself to exploring the intersection of artificial intelligence and software development. 
            My journey began with a fascination for how machines can learn and adapt, leading me to specialize in reinforcement learning and natural language processing.
          </p>
          <p className="mb-4">
            From developing adversarial robustness models for Android malware detection achieving 97% accuracy, to architecting novel LLM reasoning frameworks with 60% performance improvements, 
            I&apos;m driven by the challenge of pushing technological boundaries while creating practical solutions.
          </p>
          <p className="mb-4">
            As the Founder and President of the Gannon Codex Programming Club, I&apos;ve grown our community to 50+ members, organizing AI/ML workshops and hackathons. 
            My role as a CIS Lab Technician has taught me the importance of maintaining robust systems, achieving 95% lab uptime and reducing ticket resolution time by 30%.
          </p>
        </div>
        <div className="personal-note z-10">
          <p>&quot;Technology is a canvas. I use it to explore ideas, solve problems, and build experiences. But beyond the code, there&apos;s a human story.&quot;</p>
        </div>
        <Link href="/sneakpeak" legacyBehavior>
          <a className="portal-button z-10">[ PEEK_INTO_MY_LIFE ]</a>
        </Link>
      </div>
    </section>
  );
}