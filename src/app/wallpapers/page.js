// 'use client';
// import React from "react";
// import Image from "next/image";
// import Footer from "../Components/Footer";
// import Header from "../Components/Header";
// import { Fade } from "react-awesome-reveal";
// import Link from 'next/link';

// function Wallpapers() {
//   return (
//     <div className="bg-white text-black min-h-screen h-1">
//       <Header />
//       <Fade>
//         <div>
//           <div className="hero-banner">
//             <div style={{ position: "relative", height: "70vh" }}>
//               <Image src="/Facets-1.jpg" alt="Image 1" layout="fill" objectFit="cover" />
//             </div>
//             <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
//               <h1 className="text-white font-semibold text-6xl">Wallpapers</h1>
//             </div>
//           </div>
//         </div>

//         <section className="flex flex-col items-center mt-10 justify-center">
//           <Fade>
//             <h2 className="text-center font-semibold text-4xl mb-4">Alien Landscape</h2>
//             <div className="flex flex-row items-center justify-center bg-white rounded-lg p-4 mb-4">
//               <div className="flex flex-col mr-4">
//                 <p className="text-2xl text-right">
//                   Fourth wallpaper pack is a variation on the
//                 </p>
//                 <p className="text-2xl text-right">
//                   popular topological wallpapers! Two slightly
//                 </p>
//                 <p className="text-2xl text-right">
//                   different designs in multiple colors and crisp
//                 </p>
//                 <p className="text-2xl text-right mb-4">5k resolution!</p>
//                 <Link href="/wallpapers/alien">
//                   <div className="bg-transparent text-black font-bold py-2 px-4 rounded border border-black float-left">
//                     Download Wallpapers
//                   </div>
//                 </Link>
//               </div>
//               <Image
//                 src="/B - Cyan.png"
//                 className="rounded-lg"
//                 alt="Alien Landscape"
//                 width={300}
//                 height={300}
//               />
//             </div>

//             <h2 className="text-center font-bold text-4xl mb-4">Waves</h2>
//             <div className="flex flex-row-reverse items-center justify-center bg-white rounded-lg p-4 mb-4">
//               <div className="flex flex-col ml-4">
//                 <p className="text-2xl text-left">
//                   Fourth wallpaper pack is a variation on the
//                 </p>
//                 <p className="text-2xl text-left">
//                   popular topological wallpapers! Two slightly
//                 </p>
//                 <p className="text-2xl text-left">
//                   different designs in multiple colors and crisp
//                 </p>
//                 <p className="text-2xl text-left mb-4">5k resolution!</p>
//                 <Link href="/wallpapers/waves">
//                   <div className="bg-transparent text-black font-bold py-2 px-4 rounded border border-black float-left">
//                     Download Wallpapers
//                   </div>
//                 </Link>
//               </div>
//               <Image
//                 src="/NetRunner Teal.jpg"
//                 className="rounded-lg"
//                 alt="Alien Landscape"
//                 width={300}
//                 height={300}
//               />
//             </div>

//             <h2 className="text-center font-bold text-4xl mb-4">Warp</h2>
//             <div className="flex flex-row items-center text-sm justify-center bg-white rounded-lg p-4 mb-4">
//               <div className="flex flex-col mr-4">
//                 <p className="text-2xl text-right">
//                   This is my first wallpaper pack. Inspired by
//                 </p>
//                 <p className="text-2xl text-right">
//                   spacetime travel. I’m calling it Warp. It’s a
//                 </p>
//                 <p className="text-2xl text-right">
//                   pack of 5 crisp 5k square images to fit any
//                 </p>
//                 <p className="text-2xl text-right mb-4">screen.</p>
//                 <Link href="/wallpapers/warp">
//                   <div className="bg-transparent text-black font-bold py-2 px-4 rounded border border-black float-left">
//                     Download Wallpapers
//                   </div>
//                 </Link>
//               </div>
//               <Image
//                 src="/Warp-2.jpg"
//                 className="rounded-xl"
//                 alt="Alien Landscape"
//                 width={300}
//                 height={300}
//               />
//             </div>

//             <h2 className="text-center font-bold text-4xl mb-4">Facets</h2>
//             <div className="flex flex-row-reverse items-center justify-center bg-white rounded-lg p-4 mb-4">
//               <div className="flex flex-col ml-4">
//                 <p className="text-2xl text-left">
//                   Fourth wallpaper pack is a variation on the
//                 </p>
//                 <p className="text-2xl text-left">
//                   popular topological wallpapers! Two slightly
//                 </p>
//                 <p className="text-2xl text-left">
//                   different designs in multiple colors and crisp
//                 </p>
//                 <p className="text-2xl text-left mb-4">5k resolution!</p>
//                 <Link href="/wallpapers/facets">
//                   <div className="bg-transparent text-black font-bold py-2 px-4 rounded border border-black float-left">
//                     Download Wallpapers
//                   </div>
//                 </Link>
//               </div>
//               <Image
//                 src="/Facets-5.jpg"
//                 className="rounded-lg"
//                 alt="Alien Landscape"
//                 width={300}
//                 height={300}
//               />
//             </div>
//           </Fade>
//         </section>
//         <Footer />
//       </Fade>
//     </div>
//   );
// }

// export default Wallpapers;











'use client';
import React from "react";
import Image from "next/image";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Fade } from "react-awesome-reveal";
import Link from 'next/link';

function Wallpapers() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Header />
      <Fade>
        <div className="relative">
          <div className="relative h-64 sm:h-96">
            <Image 
              src="/Facets-1.jpg" 
              alt="Image 1" 
              layout="fill" 
              objectFit="cover" 
              className="w-full h-full"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white font-semibold text-4xl sm:text-6xl">
              Wallpapers
            </h1>
          </div>
        </div>

        <section className="flex flex-col items-center mt-10 justify-center px-4">
          {/* Alien Landscape Section */}
          <Fade>
            <h2 className="text-center font-semibold text-3xl sm:text-4xl mb-4">
              Alien Landscape
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center bg-white rounded-lg p-4 mb-4 shadow-md">
              <div className="flex flex-col sm:mr-4 text-center sm:text-right mb-4 sm:mb-0">
                <p className="text-lg sm:text-2xl">Fourth wallpaper pack is a variation on the</p>
                <p className="text-lg sm:text-2xl">popular topological wallpapers! Two slightly</p>
                <p className="text-lg sm:text-2xl">different designs in multiple colors and crisp</p>
                <p className="text-lg sm:text-2xl mb-4">5k resolution!</p>
                <Link href="/wallpapers/alien">
                  <div className="bg-transparent text-black font-bold py-2 px-4 rounded border border-black hover:bg-gray-200 transition">
                    Download Wallpapers
                  </div>
                </Link>
              </div>
              <Image 
                src="/B - Cyan.png" 
                className="rounded-lg" 
                alt="Alien Landscape" 
                width={300} 
                height={300} 
              />
            </div>
          </Fade>

          {/* Waves Section */}
          <Fade>
            <h2 className="text-center font-bold text-3xl sm:text-4xl mb-4">Waves</h2>
            <div className="flex flex-col sm:flex-row-reverse items-center justify-center bg-white rounded-lg p-4 mb-4 shadow-md">
              <div className="flex flex-col sm:ml-4 text-center sm:text-left mb-4 sm:mb-0">
                <p className="text-lg sm:text-2xl">Fourth wallpaper pack is a variation on the</p>
                <p className="text-lg sm:text-2xl">popular topological wallpapers! Two slightly</p>
                <p className="text-lg sm:text-2xl">different designs in multiple colors and crisp</p>
                <p className="text-lg sm:text-2xl mb-4">5k resolution!</p>
                <Link href="/wallpapers/waves">
                  <div className="bg-transparent text-black font-bold py-2 px-4 rounded border border-black hover:bg-gray-200 transition">
                    Download Wallpapers
                  </div>
                </Link>
              </div>
              <Image 
                src="/NetRunner Teal.jpg" 
                className="rounded-lg" 
                alt="Waves" 
                width={300} 
                height={300} 
              />
            </div>
          </Fade>

          {/* Warp Section */}
          <Fade>
            <h2 className="text-center font-bold text-3xl sm:text-4xl mb-4">Warp</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center bg-white rounded-lg p-4 mb-4 shadow-md">
              <div className="flex flex-col sm:mr-4 text-center sm:text-right mb-4 sm:mb-0">
                <p className="text-lg sm:text-2xl">This is my first wallpaper pack. Inspired by</p>
                <p className="text-lg sm:text-2xl">spacetime travel. I’m calling it Warp. It’s a</p>
                <p className="text-lg sm:text-2xl">pack of 5 crisp 5k square images to fit any</p>
                <p className="text-lg sm:text-2xl mb-4">screen.</p>
                <Link href="/wallpapers/warp">
                  <div className="bg-transparent text-black font-bold py-2 px-4 rounded border border-black hover:bg-gray-200 transition">
                    Download Wallpapers
                  </div>
                </Link>
              </div>
              <Image 
                src="/Warp-2.jpg" 
                className="rounded-lg" 
                alt="Warp" 
                width={300} 
                height={300} 
              />
            </div>
          </Fade>

          {/* Facets Section */}
          <Fade>
            <h2 className="text-center font-bold text-3xl sm:text-4xl mb-4">Facets</h2>
            <div className="flex flex-col sm:flex-row-reverse items-center justify-center bg-white rounded-lg p-4 mb-4 shadow-md">
              <div className="flex flex-col sm:ml-4 text-center sm:text-left mb-4 sm:mb-0">
                <p className="text-lg sm:text-2xl">Fourth wallpaper pack is a variation on the</p>
                <p className="text-lg sm:text-2xl">popular topological wallpapers! Two slightly</p>
                <p className="text-lg sm:text-2xl">different designs in multiple colors and crisp</p>
                <p className="text-lg sm:text-2xl mb-4">5k resolution!</p>
                <Link href="/wallpapers/facets">
                  <div className="bg-transparent text-black font-bold py-2 px-4 rounded border border-black hover:bg-gray-200 transition">
                    Download Wallpapers
                  </div>
                </Link>
              </div>
              <Image 
                src="/Facets-5.jpg" 
                className="rounded-lg" 
                alt="Facets" 
                width={300} 
                height={300} 
              />
            </div>
          </Fade>
        </section>
        <Footer />
      </Fade>
    </div>
  );
}

export default Wallpapers;
