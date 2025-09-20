import { motion } from 'framer-motion';

export default function ArtisticHeader() {
  return (
    <header className="relative  w-full h-[40vh] flex flex-col justify-center bg-white text-black overflow-hidden z-10">

      {/* Massive faded background text */}
      <motion.div
        className="absolute text-[20vw] md:text-[12vw] xl:text-[10vw] font-bold italic uppercase tracking-tight leading-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap opacity-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        PRATHAM
      </motion.div>

      {/* Top navigation */}
      <nav className="absolute top-4 right-6 flex gap-6 z-10">
        
        <motion.a
          href="/projects"
          className="uppercase text-sm md:text-base font-bold hover:underline hover:underline-offset-4"
          whileHover={{ scale: 1.1 }}
        >
          Projects
        </motion.a>
        <motion.a
          href="/bloglist"
          className="uppercase text-sm md:text-base font-bold hover:underline hover:underline-offset-4"
          whileHover={{ scale: 1.1 }}
        >
          Blogs
        </motion.a>
        <motion.a
          href="/me"
          className="uppercase text-sm md:text-base font-bold hover:underline hover:underline-offset-4"
          whileHover={{ scale: 1.1 }}
        >
          Me
        </motion.a>
        <motion.a
          href="/contact"
          className="uppercase text-sm md:text-base font-bold hover:underline hover:underline-offset-4"
          whileHover={{ scale: 1.1 }}
        >
          Contact
        </motion.a>
      </nav>

      {/* Centerpiece name - Using H1 for SEO */}
      <motion.h1
        className="relative text-4xl sm:text-6xl md:text-8xl font-extrabold uppercase tracking-tighter leading-none mx-auto z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ fontFamily: "'Didot', serif" }}
      >
        PRATHAM PATEL - TECHNICAL BLOG
      </motion.h1>
    </header>
  );
}
