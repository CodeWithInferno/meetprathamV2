

'use client';
import React from 'react';
import { Typewriter, Cursor } from 'react-simple-typewriter';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Image from 'next/image'; // Import the Image component
import Marquee from 'react-marquee-slider';
import Languages from '../Components/languages';
import { Fade } from 'react-awesome-reveal';
import AboutMe from '../Components/aboutme'


function Me() {
  return (
    <div className='bg-white text-black min-h-screen h-full bg-no-repeat'>
      <Header />
      <Fade>
      <div>

        <div className="hero-banner">
            <div style={{ position: 'relative', height: '70vh' }}>
            <Image src="/A.png" alt="Image 1" layout="fill" objectFit="cover" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h1 className="text-white text-6xl">
            <Typewriter
              words={['Hello I Am Pratham Patel', 'I Am A FullStack Developer', 'Sanity Master!']}
              loop={true}
              cursor
              cursorStyle='_'
              typeSpeed={50}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>
        </div>
      </div>
      </div>
      <div className="bg-gray-200 p-4 mb-1 mt-1 text-black text-2xl overflow-hidden h-16 flex items-center">
      <Marquee velocity={25}>
        {[<div key="quote" style={{ whiteSpace: 'nowrap' }}>&quot;You have the right to work, but never to the fruit of work.&quot;  -Bhagavad Gita, .filapter 2 Verse 47</div>]}
      </Marquee>

      </div>
      <div>
      <AboutMe />
      </div>
      <div className='ml-10 my-10 '>

<ol class="relative border-s border-gray-200 dark:border-gray-700">                  
    <li class="mb-10 ml ms-4">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">May 2022</time>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-bgrey-600">Completed My 10th From St.Kabir School</h3>
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">I Completed my 10th and Opted For Science Stream And Took Maths As I Am Depply Obsessed With Tech You can Understand This By My Github Profile</p>
        <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Github <svg class="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg></a>
    </li>
    <li class="mb-10 ms-4">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">March 2024</time>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-bgrey-400">Completed My 12th With Flying Colors And Planned To Join Gannon University</h3>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">I Scored 89%ile In Jee Mains But Still Opted To Go To Usa And Join Gannon University</p>
    </li>
    <li class="ms-4">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Near Future</time>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-bgrey-500">I Plan To Do My Masters In A Ivey</h3>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements built on top of Tailwind CSS.</p>
    </li>
</ol>
      </div>
      <div className="border-t border-gray-300 my-10 mx-10"></div>
      <Languages />
      </Fade>

      <Footer />
    </div>
  );
}

export default Me;








// 'use client';
// import React from 'react';
// import { Typewriter } from 'react-simple-typewriter';
// import Header from '../Components/Header';
// import Footer from '../Components/Footer';
// import Image from 'next/image';
// import Marquee from 'react-marquee-slider';
// import Languages from '../Components/languages';
// import { Fade } from 'react-awesome-reveal';
// import AboutMe from '../Components/aboutme'

// function Me() {
//   return (
//     <div className='bg-white text-black min-h-screen'>
//       <Header />
//       <Fade>
//         <div className="relative">
//           {/* Hero Banner */}
//           <div style={{ position: 'relative', height: '70vh' }}>
//             <Image src="/A.png" alt="Image 1" layout="fill" objectFit="cover" className="w-full h-full" />
//           </div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-bold text-center">
//               <Typewriter
//                 words={['Hello, I Am Pratham Patel', 'I Am A FullStack Developer', 'Sanity Master!']}
//                 loop={true}
//                 cursor
//                 cursorStyle='&apos;'
//                 typeSpeed={50}
//                 deleteSpeed={50}
//                 delaySpeed={1000}
//               />
//             </h1>
//           </div>
//         </div>

//         {/* Marquee Section */}
//         <div className="bg-gray-200 py-4 mt-4 text-black text-xl sm:text-2xl h-16 flex items-center overflow-hidden">
//           <Marquee velocity={25}>
//             {[<div key="quote" style={{ whiteSpace: 'nowrap' }}>&quot;You have the right to work, but never to the fruit of work.&quot;  -Bhagavad Gita, Chapter 2 Verse 47</div>]}
//           </Marquee>

//         </div>

//         {/* About Me Section */}
//         <div className="my-10 px-4 sm:px-10">
//           <AboutMe />
//         </div>

//         {/* Timeline Section */}
//         <div className="px-4 sm:px-10 my-10">
//           <ol className="relative border-l border-gray-300 dark:border-gray-700">
//             <li className="mb-10 ml-6">
//               <div className="absolute w-3 h-3 bg-gray-300 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
//               <time className="mb-1 text-sm font-medium text-gray-500">May 2022</time>
//               <h3 className="text-lg font-semibold text-gray-900">Completed My 10th From St.Kabir School</h3>
//               <p className="text-base text-gray-500">I opted for the Science stream after my 10th as Im deeply obsessed with tech. Check out my GitHub to learn more!</p>
//               <a href="#" className="inline-flex items-center mt-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white transition-all">
//                 GitHub
//                 <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
//                 </svg>
//               </a>
//             </li>

//             <li className="mb-10 ml-6">
//               <div className="absolute w-3 h-3 bg-gray-300 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
//               <time className="mb-1 text-sm font-medium text-gray-500">March 2024</time>
//               <h3 className="text-lg font-semibold text-gray-900">Completed My 12th With Flying Colors</h3>
//               <p className="text-base text-gray-500">I scored 89%ile in JEE Mains but opted to study in the USA at Gannon University.</p>
//             </li>

//             <li className="ml-6">
//               <div className="absolute w-3 h-3 bg-gray-300 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
//               <time className="mb-1 text-sm font-medium text-gray-500">Near Future</time>
//               <h3 className="text-lg font-semibold text-gray-900">Plan to Pursue a Master's at Ivey</h3>
//               <p className="text-base text-gray-500">My goal is to pursue higher education in one of the top Ivey league universities.</p>
//             </li>
//           </ol>
//         </div>

//         {/* Languages Section */}
//         <div className="border-t border-gray-300 mt-10 mb-10 mx-4 sm:mx-10"></div>
//         <Languages />

//       </Fade>

//       <Footer />
//     </div>
//   );
// }

// export default Me;
