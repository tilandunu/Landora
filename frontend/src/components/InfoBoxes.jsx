import React from 'react';

const InfoBoxes = () => {
  const infoData = [
    {
      icon: (
        <svg
          role='img'
          aria-label='Languages Icon'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M2 12h5' />
          <path d='M9 12h5' />
          <path d='M16 12h6' />
          <path d='M3 7h2c1 0 1.5-.5 1.5-1.5S6 4 5 4H3' />
          <path d='M3 16h2c1 0 1.5.5 1.5 1.5S6 20 5 20H3' />
          <path d='M16 7h-1c-1 0-1.5-.5-1.5-1.5S14 4 15 4h1' />
          <path d='M16 16h-1c-1 0-1.5.5-1.5 1.5S14 20 15 20h1' />
        </svg>
      ),
      label: 'LANGUAGES SPOKEN',
      value: '7000+',
    },
    {
      icon: (
        <svg
          role='img'
          aria-label='Cities Icon'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <rect x='4' y='2' width='16' height='20' rx='2' />
          <path d='M9 22v-4h6v4' />
          <path d='M8 6h.01' />
          <path d='M16 6h.01' />
          <path d='M12 6h.01' />
          <path d='M12 10h.01' />
          <path d='M12 14h.01' />
          <path d='M16 10h.01' />
          <path d='M16 14h.01' />
          <path d='M8 10h.01' />
          <path d='M8 14h.01' />
        </svg>
      ),
      label: 'CITIES IN THE WORLD',
      value: '20000+',
    },
    {
      icon: (
        <svg
          role='img'
          aria-label='Continent Icon'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='12' cy='12' r='10' />
          <path d='M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20' />
          <path d='M2 12h20' />
        </svg>
      ),
      label: 'CONTINENTS REPRESENTED',
      value: '6',
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mx-4 sm:mx-6 py-8 sm:py-12'>
      {infoData.map((box, i) => (
        <InfoBox key={i} icon={box.icon} label={box.label} value={box.value} />
      ))}
    </div>
  );
};

const InfoBox = ({ icon, label, value }) => {
  return (
    <div className='flex flex-col justify-center items-center bg-white bg-opacity-95 w-full py-8 sm:py-12 shadow-lg rounded-xl transition-transform hover:scale-105 duration-300 poppins-regular'>
      <div className='text-2xl sm:text-3xl text-gray-700'>{icon}</div>
      <p className='text-2xl sm:text-4xl font-bold mt-2 sm:mt-4'>{value}</p>
      <p className='text-center text-sm sm:text-base mt-1 sm:mt-2'>{label}</p>
    </div>
  );
};

export default InfoBoxes;
