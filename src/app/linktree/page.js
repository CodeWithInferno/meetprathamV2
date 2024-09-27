import React from 'react';
import Image from 'next/image';
import { FaInstagram, FaSnapchat, FaLinkedin } from 'react-icons/fa';

const LinkTree = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-700 to-blue-500">
      {/* Avatar and Profile */}
      <div className="mt-20 shadow-lg rounded-full border-4 border-white overflow-hidden w-40 h-40">
        <Image
          src="/IMG_1663.jpeg"
          alt="Avatar"
          width={150}
          height={150}
          className="object-cover"
        />
      </div>
      <h3 className="text-3xl font-extrabold text-white mt-4">@Pratham_Disc</h3>
      <p className="text-gray-300 text-sm italic mb-6">This is my LinkTree</p>

      {/* Social Media Icons */}
      <div className="flex items-center justify-center gap-6">
        <FaInstagram className="text-3xl text-pink-500 hover:scale-110 transition-transform duration-200" />
        <FaSnapchat className="text-3xl text-yellow-400 hover:scale-110 transition-transform duration-200" />
        <FaLinkedin className="text-3xl text-blue-600 hover:scale-110 transition-transform duration-200" />
      </div>

      {/* Buttons for Links */}
      <div className="mt-10 space-y-4">
        <a
          href="https://github.com/codewithinferno"
          target="_blank"
          rel="noreferrer"
          className="block text-white py-3 px-6 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Github
        </a>
        <a
          href="https://www.instagram.com/pratham_disc/"
          target="_blank"
          rel="noreferrer"
          className="block text-white py-3 px-6 rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-red-400 hover:from-pink-600 hover:to-red-500 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Instagram
        </a>
        <a
          href="https://www.instagram.com/pratham_disc/"
          target="_blank"
          rel="noreferrer"
          className="block text-white py-3 px-6 rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-red-400 hover:from-pink-600 hover:to-red-500 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Instagram
        </a>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-400 mt-auto mb-4">
        <p>@pratham_disc | Meet Pratham</p>
      </div>
    </div>
  );
};

export default LinkTree;
