import Image from 'next/image';
import React from 'react';

const Languages = () => {
  return (
    <div>
      {/* Title Section */}
      <div className="mx-5 sm:mx-10 my-10">
        <h1 className="text-2xl font-bold">Languages I Know</h1>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
          So I Am Learning Many Languages And Have Mastered Many. Here Are Some Of My Favorites:
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mx-5 sm:mx-10 my-10">
        <div className="bg-white h-48 sm:h-64 w-full relative flex items-center justify-center shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-110">
          <Image src={"/java.png"} width={80} height={80} className="shadow-outside" alt="Java" />
        </div>
        <div className="bg-white h-48 sm:h-64 w-full relative flex items-center justify-center shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-110">
          <Image src={"/python.png"} width={80} height={80} className="shadow-outside" alt="Python" />
        </div>
        <div className="bg-white h-48 sm:h-64 w-full relative flex items-center justify-center shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-110">
          <Image src={"/react.png"} width={80} height={80} className="shadow-outside" alt="React" />
        </div>
        <div className="bg-white h-48 sm:h-64 w-full relative flex items-center justify-center shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-110">
          <Image src={"/mongo.png"} width={80} height={80} className="shadow-outside" alt="MongoDB" />
        </div>
        <div className="bg-white h-48 sm:h-64 w-full relative flex items-center justify-center shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-110">
          <Image src={"/docker.png"} width={80} height={80} className="shadow-outside" alt="Docker" />
        </div>
        <div className="bg-white h-48 sm:h-64 w-full relative flex items-center justify-center shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-110">
          <Image src={"/c++.png"} width={80} height={80} className="shadow-outside" alt="C++" />
        </div>
        <div className="bg-white h-48 sm:h-64 w-full relative flex items-center justify-center shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-110">
          <Image src={"/sanity.png"} width={80} height={80} className="shadow-outside" alt="Sanity" />
        </div>
        <div className="bg-white h-48 sm:h-64 w-full relative flex items-center justify-center shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-110">
          <Image src={"/tailwind.png"} width={80} height={80} className="shadow-outside" alt="Tailwind CSS" />
        </div>
      </div>
    </div>
  );
};

export default Languages;
