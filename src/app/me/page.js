'use client';

// app/me/page.jsx
import HeroSection from '@/app/Components/me/HeroSection';
import PeekSection from '@/app/Components/me/PeekSection';
import WorkbenchSection from '@/app/Components/me/WorkbenchSection';
import ResearchSection from '@/app/Components/me/ResearchSection';
import Footer from '@/app/Components/Reusable/Footer'; // Assuming this path
import Header from "@/app/Components/Reusable/Header"
import MusicChoiceSection from '@/app/Components/me/MusicChoiceSection'; // <-- Import it




export default function MePage() {
  return (
    <main className="bg-black">
      <Header />
      <HeroSection />
      <PeekSection />
      <div className="workbench-container">
        <WorkbenchSection />
      </div>
      <ResearchSection />
      <div className="music-container">
        <MusicChoiceSection />
      </div>
      <Footer />
    </main>
  );
}