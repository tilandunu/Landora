import React from 'react';

const LoadingScreen = () => {
  return (
    <div className='fixed inset-0 bg-black flex flex-col items-center justify-center z-50'>
      <div className='relative text-white text-5xl sm:text-7xl animate-[spin_2s_linear_infinite]'>
        <span className='text-7xl sm:!text-9xl material-symbols-outlined'>
          brightness_7
        </span>
        <div className='absolute top-1 left-1 w-2 h-2 bg-white rounded-full animate-ping'></div>
        <div className='absolute bottom-1 left-1 w-2 h-2 bg-white rounded-full animate-ping delay-[200ms]'></div>
        <div className='absolute top-1 right-1 w-2 h-2 bg-white rounded-full animate-ping delay-[400ms]'></div>
        <div className='absolute bottom-1 right-1 w-2 h-2 bg-white rounded-full animate-ping delay-[600ms]'></div>
      </div>
      <p className='text-white mt-10 text-base sm:text-xl tracking-wide poppins-light animate-fade'>
        Navigating the world..
      </p>
    </div>
  );
};

export default LoadingScreen;
