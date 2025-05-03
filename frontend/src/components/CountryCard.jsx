import React from 'react';

const CountryCard = ({ country, contentRef }) => {
  return (
    <div
      ref={contentRef}
      className='w-full py-8 sm:py-12 md:py-18 px-4 sm:px-10 rounded-xl sm:rounded-4xl bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(${country.bg})`,
        boxShadow: '0px 18px 30px 0px rgba(0,0,0,0.4)',
      }}
    >
      <section>
        <div className='flex justify-end'>
          <img
            src={country.flag}
            alt={country.name}
            className='w-10 sm:w-12 md:w-14'
          />
        </div>
        <div>
          <p
            data-testid='country-name'
            className='text-3xl sm:text-5xl md:text-7xl lg:text-9xl poppins-extrabold text-white break-words'
          >
            {country.name}
          </p>
          <p className='w-full sm:w-3/4 pt-2 text-sm sm:text-base text-white poppins-light'>
            {country.description}
          </p>
        </div>
        <div className='flex flex-col items-end gap-2 sm:gap-3 pt-6 sm:pt-10'>
          <CountryStatBadge
            icon={<PopulationIcon />}
            value={country.population}
          />
          <CountryStatBadge icon={<LanguageIcon />} value={country.language} />
        </div>
      </section>
    </div>
  );
};

const CountryStatBadge = ({ icon, value }) => {
  return (
    <div className='flex items-center w-full sm:w-1/2 lg:w-1/4 px-4 sm:px-6 py-1 sm:py-2 gap-2 sm:gap-4 bg-gray-100/90 backdrop-blur-sm rounded-full'>
      {icon}
      <p className='poppins-regular text-xs sm:text-sm truncate'>{value}</p>
    </div>
  );
};

const PopulationIcon = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
    <circle cx='9' cy='7' r='4' />
    <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
    <path d='M16 3.13a4 4 0 0 1 0 7.75' />
  </svg>
);

const LanguageIcon = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle cx='12' cy='12' r='10' />
    <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
    <path d='M2 12h20' />
  </svg>
);

export default CountryCard;
