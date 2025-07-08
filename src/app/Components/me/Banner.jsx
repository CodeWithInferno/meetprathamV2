// in your Banner.jsx or similar
import Image from 'next/image';

import FibonacciSpiral from '@/app/Components/FibonacciSpiral';

export default function Banner() {
  return (
    <div className="relative w-full h-[60vh] bg-black overflow-hidden">
      {/* Spiral overlay */}
      <div className="absolute inset-0 opacity-20 mix-blend-screen">
        <Image
          src="/images/golden.png"
          alt="Fibonacci Spiral"
          fill
          className="object-contain"
        />
      </div>
      {/* Your actual banner content here */}
      <h1 className="relative z-10 text-white text-6xl">Pratham Patel</h1>
    </div>
  );
}
