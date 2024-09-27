import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutMe = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center bg-gray-300 p-6 lg:p-10 rounded-lg shadow-lg w-full lg:w-4/5 mx-auto">
      {/* Avatar Image */}
      <div className="mb-6 lg:mb-0 lg:mr-10">
        <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-md">
          <Image 
            src="/prathamdown.jpeg" 
            alt="Avatar" 
            width={200} 
            height={200} 
            className="object-cover" 
          />
        </div>
      </div>
      
      {/* Text and Button Section */}
      <div className="flex-grow text-center lg:text-left">
        <p className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
          I am Pratham Patel (CodeWithInferno). Explore more to get a sneak peek into my life and work.
        </p>
        <Link href="/sneakpeak" passHref>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out">
            Click me
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutMe;
