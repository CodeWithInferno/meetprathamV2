'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

function Bust() {
  const { scene } = useGLTF('/models/Greek.glb');
  return (
    <Center>
      <primitive object={scene} scale={0.8} />
    </Center>
  );
}
useGLTF.preload('/models/Greek.glb');

export default function WhoAmIBanner() {
  return (
    <section className="relative w-full min-h-screen overflow-visible bg-[#2e241a]">
      {/* vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-black/25 via-transparent to-black/30" />

      {/* responsive grid */}
      <div className="
        h-full w-full
        grid grid-cols-1 md:grid-cols-2
        items-start md:items-center
        px-6 md:px-20
        pt-16 md:pt-0
        gap-y-12 md:gap-y-0
      ">
        {/* ─── copy ─── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-white md:pl-12 md:justify-self-center max-w-xl"
        >
          <h1
            className="
              uppercase tracking-tight
              text-[clamp(9vw,4rem,10rem)]
              leading-[0.9]
            "
            style={{ fontFamily: 'var(--font-tusker)' }}
          >
            Hello,&nbsp;I&nbsp;AM&nbsp;PRATHAM
          </h1>

          <p
            className="mt-6 text-lg sm:text-xl md:text-2xl leading-relaxed text-white/80"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            I use my passion and skills to create digital products and
            experiences. National and international customers rely on me for
            design, implementation, and management of their digital products.
            As an independent, I work with agencies, companies, start-ups, and
            individuals to blueprint their digital business.
          </p>
        </motion.div>

        {/* ─── bust + caption ─── */}
        <div className="flex flex-col items-center md:items-end overflow-visible w-full">
          <div className="relative h-[320px] md:h-[500px] w-full">
            <Canvas camera={{ position: [0, 0, 2.6], fov: 40 }}>
              <directionalLight intensity={1.2} position={[2, 2, 3]} />
              <directionalLight intensity={0.3} position={[-3, 0, 1]} />
              <ambientLight intensity={0.15} />

              <Suspense fallback={null}>
                <Bust />
              </Suspense>

              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
            </Canvas>
          </div>

          {/* caption with better positioning */}
          <p
            className="
              mt-12 md:mt-14
              text-center md:text-right
              text-xs sm:text-sm
              uppercase tracking-wide text-[#f5e1d4]
              select-none
              w-full md:w-auto
            "
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            This is <span className="line-through">Greek god</span>{' '}
            <b>Pratham Patel</b> →
          </p>
        </div>
      </div>
    </section>
  );
}
