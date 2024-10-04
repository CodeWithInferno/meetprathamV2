'use client';
import React from 'react';
import Header from './Components/Header';
import Image from 'next/image';
import Footer from './Components/Footer';
import { Fade } from 'react-awesome-reveal';

function App() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Header />

      <Fade>
        <div className="text-2xl md:text-4xl font-normal text-left mt-12 md:mt-24 ml-4 md:ml-40 mb-10 md:mb-20">
          <p>Hi, I’m a computer science student</p>
          <p>my daily life and projects.</p>
          <p className="mt-4 text-lg md:text-2xl">Click on the hamburger menu to know more about me!</p> {/* New Line */}
        </div>
      </Fade>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-10 ml-2">
        <Fade>
          <Image src="/A_1.123.1.jpg" alt="Image 1" layout="responsive" width={700} height={300} className="w-full h-auto object-cover" />
        </Fade>
        <Fade>
          <Image src="/B_1.130.1.jpg" alt="Image 2" layout="responsive" width={700} height={300} className="w-full h-auto object-cover" />
        </Fade>
        <Fade>
          <Image src="/C_1.6.1.jpg" alt="Image 3" layout="responsive" width={700} height={300} className="w-full h-auto object-cover" />
        </Fade>
        <Fade>
          <Image src="/D_1.3.1.jpg" alt="Image 4" layout="responsive" width={700} height={300} className="w-full h-auto object-cover" />
        </Fade>

        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-1 mx-0">
          <Fade>
            <Image src="/E_1.76.1.jpg" alt="Image 5" layout="responsive" width={500} height={300} className="w-full h-auto object-cover" />
          </Fade>
          <Fade>
            <Image src="/F_1.2.1.jpg" alt="Image 6" layout="responsive" width={500} height={300} className="w-full h-auto object-cover" />
          </Fade>
          <Fade>
            <Image src="/G_1.93.1.jpg" alt="Image 7" layout="responsive" width={500} height={300} className="w-full h-auto object-cover" />
          </Fade>
        </div>

        <Fade>
          <div className="text-2xl md:text-4xl font-normal text-left mt-12 md:mt-24 ml-4 md:ml-40 mb-10 md:mb-20">
            <p>Hi, I'm a software engineer</p>
            <a href='/portfolio'>
              <div className="bg-transparent mt-5 text-sm hover:underline">View Projects</div>
            </a>
          </div>
        </Fade>
      </div>

      <Fade>
        <Footer />
      </Fade>
    </div>
  );
}

export default App;
