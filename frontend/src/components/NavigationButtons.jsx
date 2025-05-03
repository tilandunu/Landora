import React from 'react';

const NavigationButtons = ({ handleChange, isMobile, currentIndex }) => {
  if (isMobile) {
    return (
      <div className='absolute top-1/2 left-0 right-0 -translate-y-1/2 z-30 flex justify-between px-4'>
        <button
          className='flex items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-white/30 transition-colors'
          onClick={() => handleChange('prev')}
          aria-label='Previous country'
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
            <path d='m15 18-6-6 6-6' />
          </svg>
        </button>

        <button
          className='flex items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-white/30 transition-colors'
          onClick={() => handleChange('next')}
          aria-label='Next country'
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
            <path d='m9 18 6-6-6-6' />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className='text-white flex flex-col gap-10'>
      <button
        className='hover:text-red-500 duration-500 cursor-pointer'
        onClick={() => handleChange('prev')}
        aria-label='Previous country'
      >
        <svg
          width='32'
          height='32'
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
        className='hover:text-red-500 duration-500 cursor-pointer'
        onClick={() => handleChange('next')}
        aria-label='Next country'
      >
        <svg
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='m6 9 6 6 6-6' />
        </svg>
      </button>
    </div>
  );
};

export default NavigationButtons;
