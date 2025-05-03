import React from 'react';

const BackToTop = ({ scrollToTop }) => {
  return (
    <div className='flex flex-col items-center text-white gap-3 sm:gap-5 pt-6 sm:pt-10 pb-10 sm:pb-20 poppins-regular'>
      <button
        className='flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/30 transition-colors duration-300'
        onClick={scrollToTop}
        aria-label='Back to top'
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='m18 15-6-6-6 6' />
        </svg>
      </button>
      <button
        className='text-sm sm:text-base flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 sm:px-6 py-2 rounded-full transition-colors duration-300'
        onClick={scrollToTop}
      >
        <span>BACK TO TOP</span>
      </button>
    </div>
  );
};

export default BackToTop;
