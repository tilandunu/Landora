import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CountryCard from '../components/CountryCard';
import NavigationButtons from '../components/NavigationButtons';

const CountrySlider = ({ countries, isMobile }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef(null);

  const handleChange = (direction) => {
    if (!contentRef.current || countries.length === 0) return;
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        setCurrentIndex((prev) =>
          direction === 'next'
            ? (prev + 1) % countries.length
            : (prev - 1 + countries.length) % countries.length
        );
      },
    });
  };

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentIndex]);

  const country = countries[currentIndex];

  return (
    <div className='flex flex-col lg:flex-row mt-2 sm:mt-6'>
      {/* Index indicator for desktop */}
      <div className='hidden lg:flex w-full lg:w-1/4 items-center justify-center py-4'>
        <p className='encode-sans text-white'>0{currentIndex + 1}</p>
        <div className='w-px h-10 bg-gray-200 ml-4'></div>
      </div>

      {/* Main country content with navigation control wrapper */}
      <div className='relative w-full px-2 sm:px-6'>
        {/* Mobile navigation buttons overlaid on content */}
        {isMobile && (
          <NavigationButtons
            handleChange={handleChange}
            isMobile={true}
            currentIndex={currentIndex}
          />
        )}

        {/* Current index indicator for mobile */}
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 bg-black/40 text-white px-4 py-1 rounded-b-lg backdrop-blur-sm lg:hidden z-30'>
          <span className='encode-sans text-white text-sm sm:text-base'>
            0{currentIndex + 1}
          </span>
        </div>

        {/* Main country content */}
        <CountryCard
          data-testid='country-card'
          country={country}
          contentRef={contentRef}
        />
      </div>

      {/* Desktop navigation buttons */}
      {!isMobile && (
        <div className='hidden lg:flex w-full lg:w-1/4 justify-center items-center py-4'>
          <NavigationButtons handleChange={handleChange} isMobile={false} />
        </div>
      )}
    </div>
  );
};

export default CountrySlider;
