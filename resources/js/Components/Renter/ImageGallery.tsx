
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: {
    name: string;
    link: string;
  }[];
}


const ImageGallery = ({images}:ImageGalleryProps) => {

const [currentIndex, setCurrentIndex] = useState(0);

const nextImage = () => {
setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
};

const prevImage = () => {
setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
};

const goToImage = (index: number) => {
setCurrentIndex(index);
};
  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-gray-100">
      <div className="aspect-w-16 aspect-h-9 md:aspect-w-4 md:aspect-h-3 relative">
        <img 
          src={images[currentIndex].link} 
          alt="Rental item" 
          className="w-full h-full transition-opacity duration-500"
        />
        
        <button 
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-300 opacity-80 hover:opacity-100"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        <button 
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-300 opacity-80 hover:opacity-100"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      
      <div className="flex justify-center mt-4 gap-2 pb-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-blue-600 w-4' : 'bg-gray-300'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageGallery