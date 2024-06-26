import { useState } from "react";

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel flex items-center">
      <div className="carousel-control-container" onClick={prevSlide}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 carousel-control"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
      <img src={images[currentImageIndex]} alt={`Slide ${currentImageIndex}`} />
      <div className="carousel-control-container" onClick={nextSlide}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 carousel-control"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>

  );
};

export default Carousel;
