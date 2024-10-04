import React from 'react';
import Image from 'next/image';
import { FaInstagram, FaSnapchat, FaLinkedin } from 'react-icons/fa';

const LinkTree = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      
      {/* Avatar and Profile */}
      <div className="mt-16 shadow-xl rounded-full border-4 border-white overflow-hidden w-44 h-44">
        <Image
          src="/IMG_1663.jpeg"
          alt="Avatar"
          width={176}
          height={176}
          className="object-cover"
        />
      </div>
      <h3 className="text-4xl font-extrabold mt-6">@Pratham_Disc</h3>
      <p className="text-gray-200 text-sm italic mb-8">Welcome to my LinkTree!</p>

      {/* Social Media Icons */}
      <div className="flex items-center justify-center gap-8 mb-8">
        <FaInstagram className="text-4xl text-pink-400 hover:text-pink-600 transition-transform duration-300 hover:scale-125" />
        <FaSnapchat className="text-4xl text-yellow-400 hover:text-yellow-500 transition-transform duration-300 hover:scale-125" />
        <FaLinkedin className="text-4xl text-blue-500 hover:text-blue-700 transition-transform duration-300 hover:scale-125" />
      </div>

      {/* Buttons for Links */}
      <div className="w-full max-w-xs space-y-4">
        <a
          href="https://github.com/codewithinferno"
          target="_blank"
          rel="noreferrer"
          className="block text-center py-3 px-6 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Github
        </a>
        <a
          href="https://www.instagram.com/pratham_disc/"
          target="_blank"
          rel="noreferrer"
          className="block text-center py-3 px-6 rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/in/pratham-disc/"
          target="_blank"
          rel="noreferrer"
          className="block text-center py-3 px-6 rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          LinkedIn
        </a>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-200 mt-auto mb-6">
        <p>© 2024 @pratham_disc | Built by Pratham</p>
      </div>
    </div>
  );
};

export default LinkTree;
