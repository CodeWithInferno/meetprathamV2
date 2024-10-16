// 'use client';

// import React from 'react';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import Link from 'next/link';

// const Header = () => {
//   return (
//     <>
//       <header className="relative flex flex-wrap z-50 items-center justify-between p-5 bg-transparent text-3xl font-semibold text-black h-28">
//         <div className="lg:ml-48">Pratham</div>

//         {/* Links visible on large screens */}
//         <div className="hidden lg:flex space-x-4 text-2xl font-normal mr-48">
//           <Link href="/wallpapers">Wallpapers</Link>
//           <Link href="/workingon">Projects</Link>
//           <a href="http://github.com/CodeWithInferno" target="_blank" rel="noopener noreferrer">GitHub</a>
          
//           {/* Hamburger Menu */}
//           <div className="relative">
//             <input type="checkbox" id="hamburger-toggle" className="hidden" />
//             <label htmlFor="hamburger-toggle" className="cursor-pointer text-2xl">
//               <FaBars />
//             </label>

//             {/* Full-Screen Menu shown when hamburger is checked */}
//             <div className="fixed inset-0 hidden bg-white z-50 items-center justify-center p-8" id="menu">
//               {/* Close (cross) button */}
//               <label htmlFor="hamburger-toggle" className="absolute top-5 right-8 text-4xl cursor-pointer">
//                 <FaTimes />
//               </label>

//               {/* Menu items */}
//               <div className="grid z-50 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-lg">
//                 <Link href="/wallpapers" className="block px-4 py-2 text-sm">Wallpapers</Link>
//                 <Link href="/workingon" className="block px-4 py-2 text-sm">Projects</Link>
//                 <a href="http://github.com/CodeWithInferno" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm">GitHub</a>
//                 <Link href="/bloglist" className="block px-4 py-2 text-sm">BlogList</Link>
//                 <Link href="/me" className="block px-4 py-2 text-sm">Learn About Me</Link>
//                 <Link href="/linktree" className="block px-4 py-2 text-sm">LinkTree</Link>
//                 <Link href="/tic-tak-toe" className="block px-4 py-2 text-sm">Game</Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className="lg:hidden">
//           <input type="checkbox" id="mobile-hamburger-toggle" className="hidden" />
//           <label htmlFor="mobile-hamburger-toggle" className="cursor-pointer text-2xl">
//             <FaBars />
//           </label>

//           {/* Full-Screen Mobile Menu */}
//           <div className="fixed inset-0 hidden bg-white z-50 items-center justify-center p-8" id="mobile-menu">
//             {/* Close (cross) button */}
//             <label htmlFor="mobile-hamburger-toggle" className="absolute top-5 right-8 text-4xl cursor-pointer">
//               <FaTimes />
//             </label>

//             {/* Mobile menu items */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-lg">
//               <Link href="/wallpapers">Wallpapers</Link>
//               <Link href="/workingon">Working On</Link>
//               <a href="http://github.com/CodeWithInferno" target="_blank" rel="noopener noreferrer">GitHub</a>
//               <Link href="/bloglist">BlogList</Link>
//               <Link href="/me">Learn About Me </Link>
//               <Link href="/linktree">LinkTree</Link>
//               <Link href="/tic-tak-toe">Game</Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="border-b-2 border-gray-200 mt-1 mb-4 mx-10"></div>

//       {/* CSS for responsiveness and popup */}
//       <style jsx>{`
//         #hamburger-toggle:checked ~ #menu,
//         #mobile-hamburger-toggle:checked ~ #mobile-menu {
//           display: flex;
//         }

//         #menu, #mobile-menu {
//           display: none;
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: white;
//           z-index: 50;
//           justify-content: center;
//           align-items: center;
//           padding: 2rem;
//         }

//         /* Add responsive layout for buttons */
//         .grid {
//           display: grid;
//         }

//         /* Hide the menu by default */
//         #hamburger-toggle:checked ~ #menu,
//         #mobile-hamburger-toggle:checked ~ #mobile-menu {
//           display: flex;
//         }

//         /* Add a smooth transition for popup effect */
//         #menu, #mobile-menu {
//           transition: all 0.3s ease-in-out;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Header;






'use client';

import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="relative flex flex-wrap z-50 items-center justify-between p-5 bg-transparent text-3xl font-semibold text-black h-28">
        <button className="lg:ml-48">
          <Link href="/">Pratham</Link>
        </button>

        {/* Links visible on large screens */}
        <div className="hidden lg:flex space-x-4 text-2xl font-normal mr-48">
        <Link href="/me">Me</Link>
          <Link href="/bloglist">Blogs</Link>
          <Link href="/workingon">Projects</Link>
          
          <a href="http://github.com/CodeWithInferno" target="_blank" rel="noopener noreferrer">GitHub</a>

          {/* Hamburger Menu for desktop */}
          <div className="relative">
            <button onClick={toggleMenu} className="cursor-pointer text-2xl">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Full-Screen Menu for desktop */}
            {menuOpen && (
              <div className="fixed inset-1 bg-white z-50 flex items-center justify-center p-8">
                {/* Close button */}
                <button onClick={toggleMenu} className="absolute top-5 right-8 text-4xl cursor-pointer">
                  <FaTimes />
                </button>

                {/* Menu items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-lg">
                  <Link href="/wallpapers" className="block px-4 py-2" onClick={toggleMenu}>
                    Wallpapers
                  </Link>
                  <Link href="/workingon" className="block px-4 py-2" onClick={toggleMenu}>
                    Projects
                  </Link>
                  <a href="http://github.com/CodeWithInferno" target="_blank" rel="noopener noreferrer" className="block px-4 py-2" onClick={toggleMenu}>
                    GitHub
                  </a>
                  <Link href="/bloglist" className="block px-4 py-2" onClick={toggleMenu}>
                    BlogList
                  </Link>
                  <Link href="/me" className="block px-4 py-2" onClick={toggleMenu}>
                    Learn About Me
                  </Link>
                  <Link href="/linktree" className="block px-4 py-2" onClick={toggleMenu}>
                    LinkTree
                  </Link>
                  <Link href="/tic-tak-toe" className="block px-4 py-2" onClick={toggleMenu}>
                    Game
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="cursor-pointer text-2xl">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Full-Screen Mobile Menu */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-8">
              {/* Close button */}
              <button onClick={toggleMobileMenu} className="absolute top-5 right-8 text-4xl cursor-pointer">
                <FaTimes />
              </button>

              {/* Mobile menu items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-lg">
                <Link href="/wallpapers" className="block px-4 py-2" onClick={toggleMobileMenu}>
                  Wallpapers
                </Link>
                <Link href="/workingon" className="block px-4 py-2" onClick={toggleMobileMenu}>
                  Working On
                </Link>
                <a href="http://github.com/CodeWithInferno" target="_blank" rel="noopener noreferrer" className="block px-4 py-2" onClick={toggleMobileMenu}>
                  GitHub
                </a>
                <Link href="/bloglist" className="block px-4 py-2" onClick={toggleMobileMenu}>
                  BlogList
                </Link>
                <Link href="/me" className="block px-4 py-2" onClick={toggleMobileMenu}>
                  Learn About Me
                </Link>
                <Link href="/linktree" className="block px-4 py-2" onClick={toggleMobileMenu}>
                  LinkTree
                </Link>
                <Link href="/tic-tak-toe" className="block px-4 py-2" onClick={toggleMobileMenu}>
                  Game
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Bottom border */}
      <div className="border-b-2 border-gray-200 mt-1 mb-4 mx-10"></div>
    </>
  );
};

export default Header;
