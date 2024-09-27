'use client';
import React from 'react';
import Header from './Components/Header';
import Image from 'next/image';
import Footer from './Components/Footer';
import { Fade } from 'react-awesome-reveal';

function App() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Fade>
        <Header />
      </Fade>
      <Fade>
        <div className="text-4xl font-normal text-left mt-24 ml-40 mb-20">
          <p>Hi, I’m a computer science student </p>
          <p>and a coding enthusiast</p>
          <p>my daily life and projects.</p>
        </div>
      </Fade>
      <div className="grid grid-cols-2 gap-2 mt-10 ml-2">
        <Fade>
          <Image src="/A_1.123.1.jpg" alt="Image 1" width={700} height={300} />
        </Fade>
        <Fade>
          <Image src="/B_1.130.1.jpg" alt="Image 2" width={700} height={300} />
        </Fade>
        <Fade>
          <Image src="/C_1.6.1.jpg" alt="Image 3" width={700} height={300} />
        </Fade>
        <Fade>
          <Image src="/D_1.3.1.jpg" alt="Image 4" width={700} height={300} />
        </Fade>
        <div className="col-span-2 grid grid-cols-3 gap-1 mx-0">
          <Fade>
            <Image src="/E_1.76.1.jpg" alt="Image 5" width={500} height={300} />
          </Fade>
          <Fade>
            <Image src="/F_1.2.1.jpg" alt="Image 6" width={500} height={300} />
          </Fade>
          <Fade>
            <Image src="/G_1.93.1.jpg" alt="Image 7" width={500} height={300} />
          </Fade>
        </div>
        <Fade>
          <div className="text-4xl font-normal text-left mt-24 ml-40 mb-20">
            <p>Hi, I’m a software engineer </p>
            <p>content creator </p>
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






