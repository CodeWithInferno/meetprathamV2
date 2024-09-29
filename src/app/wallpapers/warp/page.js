// page.js
'use client';
import { useState, useEffect, Suspense } from 'react';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { Fade } from 'react-awesome-reveal';
import dynamic from 'next/dynamic';

const ImageWithLoading = dynamic(() => import('../../Components/ImageWithLoading'));

const client = sanityClient({
  projectId: '1igdvz19',
  dataset: 'production',
  useCdn: false, // Enable if you want to use the CDN
});

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageData = await client.fetch('*[_type == "images" && category == "warp"]{title, "imageUrl": mainImage.asset->url}');
        setImages(imageData);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
        <div className='bg-white text-black min-h-screen h-full bg-no-repeat'>
        <Header />

        <div className="grid grid-cols-3 gap-y-5 mb-10 mt-10 ml-20">
            {images.map((image, index) => (
            <Fade key={index}>
                <div className="relative w-9/12 h-1/12">
                <Suspense fallback={<div className="bg-gray-200 w-9/12 h-1/12"></div>}>
                    <ImageWithLoading src={image.imageUrl} alt={image.title} />
                </Suspense>
                </div>
            </Fade>
            ))}
        </div>

        <Footer/>
        </div>
  );
}