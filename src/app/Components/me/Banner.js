// components/me/Banner.jsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Banner() {
  return (
    <section className="relative w-full h-[90vh] flex items-center bg-black overflow-hidden">
      {/* Left: Main Text */}
      <div className="flex-1 flex flex-col justify-center pl-[8vw] z-10">
        <motion.h1
          className="text-[5vw] font-bold uppercase tracking-tight text-white"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          style={{ fontFamily: 'var(--font-bebas)' }}
        >
          Hey there
        </motion.h1>
        <motion.p
          className="mt-2 text-4xl  text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ letterSpacing: 0.3, fontFamily: 'var(--font-tusker)' }}
        >
          Designer, Developer & Tech Explorer
        </motion.p>
        <motion.p
          className="mt-4 text-lg text-gray-500 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          Building at the intersection of <span className="text-white/80">design</span> & <span className="text-white/80">technology</span>.
        </motion.p>
      </div>

      {/* Right: Photo with Vertical Tusker Word */}
      <motion.div
        className="flex-1 flex justify-center items-center h-full relative"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl shadow-2xl p-2 relative flex items-center">
          {/* Vertical Tusker Identity */}
          <motion.div
            className="
              absolute -left-24 top-10
              text-gray-500
              uppercase select-none
              text-[2.8vw]
              tracking-wider
              leading-[2.5vw]
              font-[var(--font-tusker)]
              pointer-events-none
              z-10
            "
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.2 }}
            style={{
              writingMode: 'vertical-rl',
              letterSpacing: '0.04px',
              fontFamily: 'var(--font-tusker)',
              fontWeight: 400,
            }}
          >
            A R T I S T
          </motion.div>
          {/* Photo */}
          <Image
            src="/images/image.png"
            alt="Pratham Patel"
            width={420}
            height={540}
            priority
            className="rounded-2xl object-contain shadow-xl relative z-20"
          />
        </div>
      </motion.div>

      {/* Accent Line */}
      <motion.div
        className="absolute left-0 top-1/2 w-1/3 h-[2px] bg-gradient-to-r from-white/10 via-white/50 to-transparent"
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
      />
    </section>
  );
}
