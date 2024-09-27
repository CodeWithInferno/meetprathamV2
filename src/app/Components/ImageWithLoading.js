// ImageWithLoading.js
import { useState } from 'react';

export default function ImageWithLoading({ src, alt }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <div className="bg-gray-200 w-9/12 h-1/12"></div>}
      <img
        src={src}
        alt={alt}
        className={`object-cover w-full h-full ${isLoading ? 'hidden' : ''}`}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
}