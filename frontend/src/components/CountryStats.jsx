import React from 'react';

const CountryStats = ({ totalCountries, numberRef }) => {
  return (
    <div className='flex flex-col items-center py-10 sm:py-20 px-4'>
      <p className='text-lg sm:text-xl md:text-2xl text-white'>THERE ARE</p>
      <p
        ref={numberRef}
        className='text-[80px] sm:text-[120px] md:text-[180px] lg:text-[250px] poppins-bold text-white leading-none'
      >
        0
      </p>
      <p className='text-lg sm:text-xl md:text-2xl text-white text-center'>
        COUNTRIES IN THE WORLD TODAY
      </p>
    </div>
  );
};

export default CountryStats;
