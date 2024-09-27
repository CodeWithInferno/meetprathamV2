'use client';
import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Fade } from 'react-awesome-reveal';
import Image from 'next/image';
import Links from "../../Components/aboutme/links";

export default function ImageGallery() {
    return (
    <div className="bg-white text-black min-h-screen bg-no-repeat">
       <Header />
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
       
       </div>
       <div className="items-center mx-28 justify-center ">
        <h1 className="font-mono font-bold"> So Here Are My Social Media </h1>
       <Links />

       </div>
       <Footer />
    </div>
    )
}