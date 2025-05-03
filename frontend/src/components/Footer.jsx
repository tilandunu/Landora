import React from 'react';

const Footer = () => {
  return (
    <div className='flex flex-col items-center px-4 sm:px-16 poppins-regular'>
      <div className='w-full h-px bg-white/70'></div>
      <div className='flex flex-col lg:flex-row justify-between items-center text-white w-full gap-2 sm:gap-4 text-center pt-4 sm:pt-6 pb-6 sm:pb-10'>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm'>
          <p>COPYRIGHT</p>
          <svg
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle cx='12' cy='12' r='10' />
            <path d='M15 9.354a4 4 0 1 0 0 5.292' />
          </svg>
          <p>TILAN DUNUWILA. ALL RIGHTS RESERVED</p>
        </div>
        <p className='text-xs sm:text-sm'>SRI LANKA</p>
      </div>
    </div>
  );
};

export default Footer;
