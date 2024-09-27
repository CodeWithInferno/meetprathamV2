'use client';

import React, { useState, useEffect } from 'react';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import LoadingAnimation from '../Components/ui/loader/loader';

const Page = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // New state variable

    const client = sanityClient({
        projectId: '1igdvz19',
        dataset: 'production',
        useCdn: false,
    });

    const builder = imageUrlBuilder(client);

    function urlFor(source) {
      return builder.image(source);
    }

    useEffect(() => {
        const fetchImages = async () => {
          try {
            const imageData = await client.fetch('*[_type == "work"]{title, "imageUrl": image.asset->url, gitLink, description}');
            setImages(imageData);
          } catch (error) {
            console.error('Error fetching images:', error);
          }
        };
      
        fetchImages();
    }, []);

    const isValidUrl = (string) => {
        try {
          new URL(string);
          return true;
        } catch (_) {
          return false;  
        }
    };

    const handleImageLoad = () => {
        setIsLoading(false); // Set loading to false when image has loaded
    };

    const truncateDescription = (description, maxLength) => {
        if (description.length <= maxLength) {
            return description;
        }
        return description.substring(0, maxLength) + '...';
    };

    return (
        <div className='bg-white text-black min-h-screen h-1/2 bg-no-repeat'>
            <Header />
            {isLoading && <LoadingAnimation />} 
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 rounded-full h-1/6 gap-4 mx-10  mb-10 mt-10">
                {images.map((image, index) => {
                    return (
                        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg hover:scale-105 transition duration-300 ease-in-out">
                            <img className="w-full h-64" src={image.imageUrl} alt={image.title} onLoad={handleImageLoad} />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{image.title}</div>
                                <p className="text-gray-700 text-base">
                                    {truncateDescription(image.description, 100)}
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                {isValidUrl(image.gitLink) && (
                                    <a href={image.gitLink} target="_blank" rel="noopener noreferrer">
                                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-full">
                                            View on GitHub
                                        </button>
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <Footer />
        </div>
    );
}

export default Page;