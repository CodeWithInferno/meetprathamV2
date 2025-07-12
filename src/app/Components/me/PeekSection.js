// app/me/PeekSection.jsx
import Link from 'next/link';

export default function PeekSection() {
  return (
    <section className="relative min-h-screen bg-[#f0f0f0] flex items-center justify-center p-8 overflow-hidden workbench-bg">
      <div className="relative text-center flex flex-col items-center gap-12">
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