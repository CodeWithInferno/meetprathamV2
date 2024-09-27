// // page.js
// 'use client';
// import { useState, useEffect, Suspense } from 'react';
// import sanityClient from '@sanity/client';
// import imageUrlBuilder from '@sanity/image-url';
// import Footer from '../../Components/Footer';
// import Header from '../../Components/Header';
// import { Fade } from 'react-awesome-reveal';
// import dynamic from 'next/dynamic';

// const ImageWithLoading = dynamic(() => import('../../Components/ImageWithLoading'));

// const client = sanityClient({
//   projectId: '1igdvz19',
//   dataset: 'production',
//   useCdn: false, // Enable if you want to use the CDN
// });

// const builder = imageUrlBuilder(client);

// function urlFor(source) {
//   return builder.image(source);
// }

// export default function ImageGallery() {
//   const [images, setImages] = useState([]);
  
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const imageData = await client.fetch('*[_type == "images" && category == "Alien"]{title, "imageUrl": mainImage.asset->url}');
//         setImages(imageData);
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       }
//     };

//     fetchImages();
//   }, []);

//   return (
//     <div className='bg-white text-black min-h-screen h-full bg-no-repeat'>
//     <Header />
  
//     <div className="grid grid-cols-3 gap-y-5 mb-10 mt-10 ml-20">
//         {images.map((image, index) => (
//         <Fade key={index}>
//             <div className="relative w-9/12 h-1/12">
//             <Suspense fallback={<div className="bg-gray-200 w-9/12 h-1/12"></div>}>
//                 <ImageWithLoading src={image.imageUrl} alt={image.title} />
//             </Suspense>
//             </div>
//         </Fade>
//         ))}
//     </div>
  
//     <Footer/>
//     </div>
//   );
//   }






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
        const imageData = await client.fetch('*[_type == "images" && category == "Alien"]{title, "imageUrl": mainImage.asset->url}');
        setImages(imageData);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleDownload = (url, title) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='bg-white text-black min-h-screen h-full bg-no-repeat'>
      <Header />
    
      <div className="grid grid-cols-3 gap-y-5 mb-10 mt-10 ml-20">
        {images.map((image, index) => (
          <Fade key={index}>
            <div className="relative w-9/12 h-1/12 group">
              <Suspense fallback={<div className="bg-gray-200 w-9/12 h-1/12"></div>}>
                <ImageWithLoading src={image.imageUrl} alt={image.title} />
              </Suspense>
              <button
                onClick={() => handleDownload(image.imageUrl, image.title)}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Download
              </button>
            </div>
          </Fade>
        ))}
      </div>
  
      <Footer />
    </div>
  );
}