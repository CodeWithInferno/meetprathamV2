import React from 'react';
import Image from 'next/image';
import { FaInstagram, FaSnapchat, FaLinkedin } from 'react-icons/fa';

const LinkTree = () => {
  return (
    <div className="relative flex flex-col items-center min-h-screen bg-black text-white font-mono overflow-hidden">

      {/* Accent elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400" />
      <div className="absolute bottom-0 right-0 w-2 h-full bg-pink-500" />

      {/* Avatar */}
      <div className="relative mt-20 border-8 border-white shadow-[12px_12px_0_0_#ff00ff] w-44 h-44 overflow-hidden animate-pulse">
        <Image
          src="/IMG_1663.jpeg"
          alt="Avatar"
          width={176}
          height={176}
          className="object-cover"
        />
      </div>

      {/* Profile */}
      <h3 className="text-5xl font-extrabold mt-6 tracking-tighter uppercase text-yellow-400 text-center">
        @Pratham_Disc
      </h3>
      <p className="text-white text-base mt-2 mb-8 uppercase text-center">
        Unfiltered. Unapologetic. Me.
      </p>

      {/* Social Media Icons */}
      <div className="flex gap-8 mb-12">
        <a href="https://www.instagram.com/pratham_disc/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform duration-300">
          <FaInstagram className="text-5xl text-pink-500 hover:text-pink-300" />
        </a>
        <a href="https://www.snapchat.com/add/your_snap" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform duration-300">
          <FaSnapchat className="text-5xl text-yellow-400 hover:text-yellow-200" />
        </a>
        <a href="https://www.linkedin.com/in/pratham-patel-6a40b5323/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform duration-300">
          <FaLinkedin className="text-5xl text-blue-500 hover:text-blue-300" />
        </a>
      </div>

      {/* Links */}
      <div className="w-full max-w-xs space-y-6">
        <a
          href="https://github.com/codewithinferno"
          target="_blank"
          rel="noreferrer"
          className="block text-center py-5 px-6 rounded-none border-4 border-yellow-400 shadow-[8px_8px_0_0_#ff00ff] bg-black hover:bg-yellow-400 hover:text-black transition-all duration-300 ease-in-out uppercase text-xl font-extrabold"
        >
          Github
        </a>
        <a
          href="https://www.instagram.com/pratham_disc/"
          target="_blank"
          rel="noreferrer"
          className="block text-center py-5 px-6 rounded-none border-4 border-pink-500 shadow-[8px_8px_0_0_#00ffff] bg-black hover:bg-pink-500 hover:text-black transition-all duration-300 ease-in-out uppercase text-xl font-extrabold"
        >
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/in/pratham-patel-6a40b5323/"
          target="_blank"
          rel="noreferrer"
          className="block text-center py-5 px-6 rounded-none border-4 border-blue-500 shadow-[8px_8px_0_0_#ffff00] bg-black hover:bg-blue-500 hover:text-black transition-all duration-300 ease-in-out uppercase text-xl font-extrabold"
        >
          LinkedIn
        </a>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-400 mt-auto mb-6 uppercase tracking-wide">
        <p>© 2024 Pratham Patel | Neo-Brutalist by Design</p>
      </div>
    </div>
  );
};

export default LinkTree;
