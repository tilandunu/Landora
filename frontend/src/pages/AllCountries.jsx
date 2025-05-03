import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  // Navigate to country details page
  const goToCountryDetails = (countryCode) => {
    navigate(`/country/${countryCode}`);
  };

  // Fetch countries data when component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://restcountries.com/v3.1/all');

        if (!response.ok) {
          throw new Error('Failed to fetch countries data');
        }

        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Filter countries based on search query and selected region
  useEffect(() => {
    let results = countries;

    // Filter by search query
    if (searchQuery) {
      results = results.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by region
    if (selectedRegion && selectedRegion !== 'All') {
      results = results.filter((country) => country.region === selectedRegion);
    }

    setFilteredCountries(results);
  }, [searchQuery, selectedRegion, countries]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle region selection change
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  // Toggle mobile filters visibility
  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  // Format population numbers with commas
  const formatPopulation = (population) => {
    return population.toLocaleString();
  };

  // Extract languages as a comma-separated string
  const getLanguages = (languagesObj) => {
    if (!languagesObj) return 'N/A';
    return Object.values(languagesObj).join(', ');
  };

  return (
    <div className="h-screen bg-[url('https://res.cloudinary.com/dpdrfruja/image/upload/v1746279677/All_ez1k3g.jpg')] bg-cover bg-center flex flex-col">
      {/* Top search & filter bar - Desktop */}
      <div className='hidden md:flex flex-row items-center justify-between py-6 md:py-10 px-16'>
        <div className='flex flex-row gap-5 items-center'>
          <span
            className='material-symbols-outlined text-black cursor-pointer text-2xl hover:scale-110 transition-transform'
            onClick={goToHome}
          >
            arrow_back
          </span>
          <div className='backdrop-blur-md bg-black/60 rounded-lg flex p-2 w-64 md:w-80 lg:w-96 gap-3 px-4'>
            <span className='material-symbols-outlined text-white/60'>
              search
            </span>
            <input
              type='text'
              placeholder='Search a country'
              className='bg-transparent outline-none placeholder:font-light placeholder:text-white/60 poppins-regular text-white w-full'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Region Selector - Desktop */}
        <select
          name='region'
          className='backdrop-blur-md w-48 bg-black/50 px-5 p-3 poppins-regular rounded-lg text-white'
          value={selectedRegion}
          onChange={handleRegionChange}
        >
          <option value='' className='text-white'>
            ALL REGIONS
          </option>
          <option value='Africa' className='text-white'>
            AFRICA
          </option>
          <option value='Asia' className='text-white'>
            ASIA
          </option>
          <option value='Europe' className='text-white'>
            EUROPE
          </option>
          <option value='Americas' className='text-white'>
            AMERICAS
          </option>
          <option value='Oceania' className='text-white'>
            OCEANIA
          </option>
          <option value='Antarctic' className='text-white'>
            ANTARCTICA
          </option>
        </select>
      </div>

      {/* Mobile header with search and filter */}
      <div className='md:hidden flex flex-col gap-3 p-4'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <span
              className='material-symbols-outlined text-black cursor-pointer text-2xl hover:scale-110 transition-transform'
              onClick={goToHome}
            >
              arrow_back
            </span>
          </div>
          <button
            onClick={toggleMobileFilters}
            className='material-symbols-outlined text-white bg-black/60 p-2 rounded-full'
          >
            {isMobileFiltersOpen ? 'close' : 'filter_list'}
          </button>
        </div>

        {/* Search input - always visible */}
        <div className='flex items-center gap-3 px-4 py-2 backdrop-blur-md bg-black/60 rounded-lg'>
          <span className='material-symbols-outlined text-white/60'>
            search
          </span>
          <input
            type='text'
            data-testid='search-input'
            placeholder='Search a country'
            className='bg-transparent outline-none placeholder:font-light placeholder:text-white/60 poppins-regular text-white w-full'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Mobile region filter - Collapsible */}
        <div
          className={`transition-all duration-300 ${
            isMobileFiltersOpen
              ? 'max-h-20 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <select
            name='region'
            data-testid='region-select'
            className='w-full backdrop-blur-md bg-black/60 px-4 py-3 poppins-regular rounded-lg text-white'
            value={selectedRegion}
            onChange={handleRegionChange}
          >
            <option value='' className='text-white'>
              ALL REGIONS
            </option>
            <option value='Africa' className='text-white'>
              AFRICA
            </option>
            <option value='Asia' className='text-white'>
              ASIA
            </option>
            <option value='Europe' className='text-white'>
              EUROPE
            </option>
            <option value='Americas' className='text-white'>
              AMERICAS
            </option>
            <option value='Oceania' className='text-white'>
              OCEANIA
            </option>
            <option value='Antarctic' className='text-white'>
              ANTARCTICA
            </option>
          </select>
        </div>
      </div>

      {/* Countries Grid Container with Fixed Height and Scroll */}
      <div className='flex-1 px-3 sm:px-4 md:px-16 mx-auto overflow-hidden'>
        <div className='backdrop-blur-lg bg-black/20 rounded-xl p-2 sm:p-4 border border-white/20 h-full'>
          {loading ? (
            <div className='flex items-center justify-center w-full h-full'>
              <p className='text-white uppercase'>LOADING COUNTRIES</p>
            </div>
          ) : error ? (
            <div className='flex items-center justify-center w-full h-full'>
              <div className='backdrop-blur-lg bg-white/20 p-4 sm:p-8 rounded-xl border border-white/30'>
                <p className='text-red-400 text-base sm:text-xl'>
                  Error: {error}
                </p>
              </div>
            </div>
          ) : (
            <div className='h-[calc(100vh-150px)] md:h-[calc(100vh-120px)] overflow-y-auto pr-2 sm:pr-4'>
              {filteredCountries.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 pb-4'>
                  {filteredCountries.map((country, idx) => (
                    <div
                      key={idx}
                      className='backdrop-blur-xl bg-white/15 rounded-xl border border-white/30 overflow-hidden hover:shadow-2xl hover:bg-white/20 transition-all duration-300 flex flex-col cursor-pointer'
                      onClick={() => goToCountryDetails(country.cca3)}
                    >
                      {/* Flag Section - Large and prominent */}
                      <div className='w-full h-32 sm:h-40 overflow-hidden relative'>
                        <img
                          src={country.flags.png}
                          alt={`Flag of ${country.name.common}`}
                          className='w-full h-full object-cover'
                        />
                        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/80'></div>
                        <h2 className='absolute bottom-0 left-0 right-0 text-left text-white text-sm sm:text-lg font-bold py-2 px-3 uppercase'>
                          {country.name.common}
                        </h2>
                      </div>

                      {/* Country Details with Creative Layout */}
                      <div className='p-2 sm:p-3 flex-grow flex flex-col gap-1 sm:gap-2 text-white grayscale'>
                        {/* Capital with icon */}
                        <div className='flex items-center gap-2'>
                          <span className='material-symbols-outlined text-amber-300 text-sm sm:text-base'>
                            location_city
                          </span>
                          <div>
                            <span className='text-gray-300 text-xs'>
                              Capital
                            </span>
                            <p className='font-medium text-xs sm:text-sm'>
                              {country.capital ? country.capital[0] : 'N/A'}
                            </p>
                          </div>
                        </div>

                        {/* Region with icon */}
                        <div className='flex items-center gap-2'>
                          <span className='material-symbols-outlined text-green-300 text-sm sm:text-base'>
                            public
                          </span>
                          <div>
                            <span className='text-gray-300 text-xs'>
                              Region
                            </span>
                            <p className='font-medium text-xs sm:text-sm'>
                              {country.region}
                            </p>
                          </div>
                        </div>

                        {/* Population with icon */}
                        <div className='flex items-center gap-2'>
                          <span className='material-symbols-outlined text-blue-300 text-sm sm:text-base'>
                            person
                          </span>
                          <div>
                            <span className='text-gray-300 text-xs'>
                              Population
                            </span>
                            <p className='font-medium text-xs sm:text-sm'>
                              {formatPopulation(country.population)}
                            </p>
                          </div>
                        </div>

                        {/* Languages with icon */}
                        <div className='flex items-start gap-2'>
                          <span className='material-symbols-outlined text-purple-300 mt-0.5 text-sm sm:text-base'>
                            language
                          </span>
                          <div>
                            <span className='text-gray-300 text-xs'>
                              Languages
                            </span>
                            <p className='font-medium text-xs sm:text-sm break-words line-clamp-2'>
                              {getLanguages(country.languages)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='flex items-center justify-center w-full h-64'>
                  <div className='backdrop-blur-lg bg-white/20 p-4 sm:p-8 rounded-xl border border-white/30 mx-4'>
                    <p className='text-white text-base sm:text-xl text-center'>
                      No countries found matching your search criteria
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCountries;
