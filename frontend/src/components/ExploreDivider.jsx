import React from 'react';

const ExploreDivider = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-center items-center py-8 sm:py-12 gap-4 sm:gap-6 px-4 sm:px-6'>
      <div className='flex items-center'>
        <div className='w-10 sm:w-20 md:w-40 h-px bg-white/70'></div>
        <svg
          width='14'
          height='14'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='text-white'
        >
          <polygon points='5 3 19 12 5 21 5 3' />
        </svg>
        <div className='w-10 sm:w-20 md:w-40 h-px bg-white/70'></div>
      </div>
      <div className='p-2 rounded-full bg-white/10'>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='text-white'
        >
          <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
        </svg>
      </div>
      <div className='flex items-center'>
        <div className='w-10 sm:w-20 md:w-40 h-px bg-white/70'></div>
        <svg
          width='14'
          height='14'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='text-white'
        >
          <polygon points='19 3 5 12 19 21 19 3' />
        </svg>
        <div className='w-10 sm:w-20 md:w-40 h-px bg-white/70'></div>
      </div>
    </div>
  );
};

export default ExploreDivider;
