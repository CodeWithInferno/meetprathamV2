// 'use client';

// import React, { useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import Header from "@/app/Components/Resuables/Header"
// import Footer from '@/app/Components/Resuables/Footer';
// import Banner from '@/app/Components/me/Banner';


// const events = [
//   {
//     date: 'May 2022',
//     title: 'Completed My 10th From St.Kabir School',
//     description:
//       'I Completed my 10th and Opted For Science Stream And Took Maths As I Am Deeply Obsessed With Tech. You can Understand This By My Github Profile.',
//     category: 'education',
//     linkText: 'Github →',
//     linkUrl: 'https://github.com/CodeWithInferno',
//     image: '/images/Banner.png',
//   },
//   {
//     date: 'March 2024',
//     title: 'Completed My 12th With Flying Colors And Planned To Join Gannon University',
//     description:
//       'I Scored 89%ile In Jee Mains But Still Opted To Go To USA And Join Gannon University.',
//     category: 'education',
//     image: '/images/Banner.png',
//   },
//   {
//     date: 'June 2024 - Aug 2024',
//     title: 'Frontend Developer Intern at XYZ Tech',
//     description: 'Built interactive UIs using React and Next.js. Improved website performance by 30%.',
//     category: 'work',
//     image: '/images/Banner.png',
//   },
//   {
//     date: 'Near Future',
//     title: 'I Plan To Do My Masters In AI',
//     description:
//       'Get started with dozens of web components and interactive elements built on top of Tailwind CSS.',
//     category: 'education',
//     image: '/images/Banner.png',
//   },
// ];

// const getCategoryStyles = (category) => {
//   switch (category) {
//     case 'work':
//       return 'bg-indigo-700 hover:bg-indigo-600';
//     default:
//       return 'bg-gray-800 hover:bg-gray-700';
//   }
// };

// export default function Timeline() {
//   const [hoveredImage, setHoveredImage] = useState(null);
//   const [pos, setPos] = useState({ x: 0, y: 0 });
//   const containerRef = useRef(null);

//   const handleMouseMove = (e) => {
//     const rect = containerRef.current.getBoundingClientRect();
//     setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
//   };

//   return (
//     <div ref={containerRef} className="py-10 px-6 bg-black text-white relative overflow-hidden">
//         <Header />
//         <Banner />
//       {hoveredImage && (
//         <motion.img
//           src={hoveredImage}
//           alt="hover-preview"
//           className="absolute w-[280px] h-[180px] rounded-lg object-cover pointer-events-none z-0"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1, left: pos.x - 140, top: pos.y - 90 }}
//           transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//           style={{ pointerEvents: 'none', mixBlendMode: 'lighten' }}
//         />
//       )}
//       <div className="max-w-5xl mx-auto relative">
//         <div className="absolute left-1/2 top-0 h-full w-px bg-gray-400"></div>
//         {events.map((event, index) => (
//           <div
//             key={index}
//             className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} items-center w-full mb-12`}
//           >
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7 }}
//               viewport={{ once: true }}
//               className="w-full md:w-5/12 px-4 relative z-10"
//               onMouseEnter={() => setHoveredImage(event.image)}
//               onMouseLeave={() => setHoveredImage(null)}
//               onMouseMove={handleMouseMove}
//             >
//               <span className="text-gray-400 text-lg font-semibold">{event.date}</span>
//               <h3
//                 style={{ fontFamily: 'var(--font-Bebas_Neue)', letterSpacing: '0.1em' }}
//                 className={`text-3xl font-extrabold mb-2 transition-opacity ${hoveredImage === event.image ? 'opacity-30' : 'opacity-100'}`}
//               >
//                 {event.title}
//               </h3>
//               <p className={`text-gray-300 mb-4 transition-opacity ${hoveredImage === event.image ? 'opacity-30' : 'opacity-100'}`}>{event.description}</p>
//               {event.linkUrl && (
//                 <a
//                   href={event.linkUrl}
//                   target="_blank"
//                   className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md transition duration-300 ease-in-out ${getCategoryStyles(
//                     event.category
//                   )}`}
//                 >
//                   {event.linkText}
//                 </a>
//               )}
//             </motion.div>
//           </div>
//         ))}
//         <Footer />
//       </div>
//     </div>
//   );
// }


// app/page.jsx
import BrutalistBanner from '@/app/Components/me/PrologueSection';

export default function HomePage() {
  return (
    <main>
      <BrutalistBanner />
      {/* …other sections… */}
    </main>
  );
}
