import { motion } from 'framer-motion';

export default function ArtisticFooter() {
  return (
    <footer className="relative w-full h-[40vh] bg-black text-yellow-300 flex flex-col justify-center overflow-hidden z-50">

      {/* Massive faded text behind */}
      <motion.h1
        className="absolute text-[18vw] md:text-[12vw] font-extrabold uppercase opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        THANK YOU
      </motion.h1>

      {/* Main content */}
      <div className="relative z-10 flex flex-col md:flex-row md:justify-between items-center w-full max-w-7xl mx-auto px-6 gap-6">
        
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          PRATHAM
        </motion.h2>

        <nav className="flex gap-6 text-sm md:text-base font-bold uppercase tracking-wide">
          <motion.a
            href="/about"
            className="hover:text-pink-500 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            About
          </motion.a>
          <motion.a
            href="/contact"
            className="hover:text-pink-500 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            Contact
          </motion.a>
          <motion.a
            href="/credits"
            className="hover:text-pink-500 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            Credits
          </motion.a>
        </nav>
      </div>

    </footer>
  );
}
