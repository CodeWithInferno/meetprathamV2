'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

/* ─── Bust wrapper ─── */
function Bust() {
  const { scene } = useGLTF('/models/Greek.glb');
  return (
    <Center>
      <primitive object={scene} scale={0.8} />
    </Center>
  );
}
useGLTF.preload('/models/Greek.glb');

/* ─── Banner ─── */
export default function WhoAmIBanner() {
  return (
    <section className="relative w-full h-screen overflow-visible bg-[#2e241a]">
      {/* vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-black/25 via-transparent to-black/30" />

      {/* grid */}
      <div className="
        h-full w-full
        grid grid-cols-1 md:grid-cols-2
        items-start md:items-center       /* top-align first, center on ≥md */
        px-6 md:px-20
        pt-16 md:pt-0                     /* give tall headline breathing room */
        gap-y-14
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
              text-[clamp(9vw,9rem,11rem)]
              leading-[0.9]
            "
            style={{ fontFamily: 'var(--font-tusker)' }}
          >
            Hello,&nbsp;I&nbsp;AM&nbsp;PRATHAM
          </h1>

          <p
  className="mt-6 text-l sm:text-xl md:text-2xl leading-relaxed text-white/80"
  style={{ fontFamily: 'var(--font-playfair)' }}
>
  I’m Pratham Patel—born and raised in India, a perpetual tinkerer who sees everything as a puzzle to solve. When I’m not buried in code or experimenting with hardware, you’ll find me on the badminton court or sketching abstract designs over a cup of masala chai. I thrive on the thrill of learning something new—whether that’s untangling an algorithm, exploring space‑debris simulations, or simply discovering the perfect recipe for the weekend’s biryani. Let’s see what we can uncover next.

</p>

        </motion.div>

        {/* ─── bust + caption ─── */}
        <div className="flex flex-col items-end overflow-visible">
          <div className="relative h-[320px] md:h-[550px] w-full">
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

          {/* caption */}
          <p
            className="mt-4 text-right text-xs sm:text-sm uppercase tracking-wide text-[#f5e1d4] select-none"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            This is <span className="line-through">Greek god</span>{' '}
            <b>Pratham Patel</b> 
          </p>
        </div>
      </div>
    </section>
  );
}
