'use client';

export default function BrutalistBanner() {
  return (
    <section className="relative min-h-screen bg-white text-black flex flex-col items-center justify-center px-8">
      {/* Fade-in via simple CSS */}
      <div className="max-w-3xl text-center animate-fadeIn">
        <h1 className="text-6xl md:text-8xl font-mono leading-tight mb-4 uppercase">
          Pratham Patel
        </h1>
        <p className="text-xl md:text-2xl font-mono mb-8">
          Developer & AI Researcher
        </p>
        <a
          href="#projects"
          className="inline-block border-2 border-black px-6 py-3 font-mono uppercase hover:bg-black hover:text-white transition-colors"
        >
          View Projects
        </a>
      </div>

      {/* Simple brutalist grid accents */}
      <div className="absolute bottom-8 left-8 border-l-2 border-black h-16" />
      <div className="absolute top-8 right-8 border-t-2 border-black w-16" />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out both;
        }
      `}</style>
    </section>
  );
}
