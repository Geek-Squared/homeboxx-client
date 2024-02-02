// ImageSlider.tsx
import { useState } from 'react';
import './styles.scss';

interface IImageSlider {
  images: string[];
}

const ImageSlider: React.FC<IImageSlider> = ({ images }) => {
    // If images is not an array, set it to an empty array
    if (!Array.isArray(images)) {
      images = [];
    }
  
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    const nextImage = () => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    };
  
    const previousImage = () => {
      setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
    };
  
    return (
      <div className="image-slider">
        <img src={images[currentImageIndex]} alt="House" />
        <div className="image-slider-controls">
          <button onClick={previousImage}>Previous</button>
          <div className="image-slider-dots">
            {images.map((_, index) => (
              <div
                key={index}
                className={`image-slider-dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
          <button onClick={nextImage}>Next</button>
        </div>
      </div>
    );
  };

export default ImageSlider;