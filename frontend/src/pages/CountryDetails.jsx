import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CountryDetails = () => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { countryCode } = useParams();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch country details');
        }

        const data = await response.json();
        setCountry(data[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryCode]);

  // Format population numbers with commas
  const formatPopulation = (population) => {
    return population.toLocaleString();
  };

  // Extract languages as a comma-separated string
  const getLanguages = (languagesObj) => {
    if (!languagesObj) return 'N/A';
    return Object.values(languagesObj).join(', ');
  };

  // Extract currencies as a comma-separated string
  const getCurrencies = (currenciesObj) => {
    if (!currenciesObj) return 'N/A';
    return Object.values(currenciesObj)
      .map((currency) => `${currency.name} (${currency.symbol || 'N/A'})`)
      .join(', ');
  };

  // Get array of border countries
  const getBorderCountries = (borders) => {
    if (!borders || borders.length === 0) return [];
    return borders;
  };

  return (
    <div className="h-screen bg-[url('https://res.cloudinary.com/dpdrfruja/image/upload/v1746279677/All_ez1k3g.jpg')] bg-cover bg-center flex flex-col poppins-regular">
      {/* Header with back button */}
      <div className='flex flex-row justify-start px-20 items-center py-6 w-full'></div>

      {/* Main content */}
      <div className='flex-1 px-4 md:px-16 pb-8 mx-auto w-full overflow-y-auto'>
        {loading ? (
          <div className='flex items-center justify-center w-full h-64'>
            <div className='backdrop-blur-lg bg-white/20 p-8 rounded-xl border border-white/30'>
              <p className='text-white text-xl'>Loading country details...</p>
            </div>
          </div>
        ) : error ? (
          <div className='flex items-center justify-center w-full h-64'>
            <div className='backdrop-blur-lg bg-white/20 p-8 rounded-xl border border-white/30'>
              <p className='text-red-400 text-xl'>Error: {error}</p>
            </div>
          </div>
        ) : country ? (
          <div className='backdrop-blur-lg bg-black/20 rounded-xl p-6 border border-white/20'>
            {/* Country name header */}
            <div className='flex w-full gap-10 items-center'>
              {' '}
              <span
                className='material-symbols-outlined text-white relative bottom-5 cursor-pointer'
                onClick={goBack}
              >
                arrow_back
              </span>
              <div className='flex '>
                {' '}
                <h1 className='text-3xl font-bold text-white mb-6 uppercase'>
                  {country.name.official}
                  <span className='block text-lg mt-1 font-normal text-gray-300'>
                    {country.name.common}
                  </span>
                </h1>
              </div>
            </div>

            {/* Main content - Flag and Details side by side */}
            <div className='flex flex-col lg:flex-row gap-8'>
              {/* Flag section - large and prominent */}
              <div className='lg:w-1/2'>
                <div className='h-64 md:h-80 lg:h-96 w-full overflow-hidden rounded-xl border border-white/30 shadow-lg'>
                  <img
                    src={
                      country.flags?.svg || country.flags?.png || fallbackFlag
                    }
                    alt={`Flag of ${country.name.common}`}
                    className='w-full h-full object-cover'
                  />
                </div>
                {country.flags.alt && (
                  <p className='text-gray-300 text-sm mt-2 italic'>
                    {country.flags.alt}
                  </p>
                )}

                {/* Coat of arms if available */}
                {country.coatOfArms?.svg && (
                  <div className='mt-6 flex flex-col items-center justify-end gap-3 bg-white/10 py-10 rounded-xl border border-white/20'>
                    <div className='h-40 w-40  overflow-hidden'>
                      <img
                        src={country.coatOfArms.svg || country.coatOfArms.png}
                        alt={`Coat of Arms of ${country.name.common}`}
                        className='h-full w-full object-contain p-4'
                      />
                    </div>{' '}
                    <h3 className='text-white text-sm'>Coat of Arms</h3>
                  </div>
                )}
              </div>

              {/* Country details */}
              <div className='lg:w-1/2 text-white'>
                <div className='backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20 h-full'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Column 1 */}
                    <div className='space-y-4'>
                      {/* Region with icon */}
                      <div className='flex items-center gap-3'>
                        <span className='material-symbols-outlined text-green-300'>
                          public
                        </span>
                        <div>
                          <span className='text-gray-300 text-sm'>Region</span>
                          <p className='font-medium'>
                            {country.region}{' '}
                            {country.subregion ? `(${country.subregion})` : ''}
                          </p>
                        </div>
                      </div>

                      {/* Capital with icon */}
                      <div className='flex items-center gap-3'>
                        <span className='material-symbols-outlined text-amber-300'>
                          location_city
                        </span>
                        <div>
                          <span className='text-gray-300 text-sm'>Capital</span>
                          <p className='font-medium'>
                            {country.capital ? country.capital[0] : 'N/A'}
                          </p>
                        </div>
                      </div>

                      {/* Population with icon */}
                      <div className='flex items-center gap-3'>
                        <span className='material-symbols-outlined text-blue-300'>
                          person
                        </span>
                        <div>
                          <span className='text-gray-300 text-sm'>
                            Population
                          </span>
                          <p className='font-medium'>
                            {formatPopulation(country.population)}
                          </p>
                        </div>
                      </div>

                      {/* Area with icon */}
                      <div className='flex items-center gap-3'>
                        <span className='material-symbols-outlined text-orange-300'>
                          straighten
                        </span>
                        <div>
                          <span className='text-gray-300 text-sm'>Area</span>
                          <p className='font-medium'>
                            {country.area
                              ? formatPopulation(country.area) + ' km²'
                              : 'N/A'}
                          </p>
                        </div>
                      </div>

                      {/* Languages with icon */}
                      <div className='flex items-start gap-3'>
                        <span className='material-symbols-outlined text-purple-300 mt-1'>
                          language
                        </span>
                        <div>
                          <span className='text-gray-300 text-sm'>
                            Languages
                          </span>
                          <p className='font-medium break-words'>
                            {getLanguages(country.languages)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Column 2 */}
                    <div className='space-y-4'>
                      {/* Currencies with icon */}
                      <div className='flex items-start gap-3'>
                        <span className='material-symbols-outlined text-yellow-300 mt-1'>
                          payments
                        </span>
                        <div>
                          <span className='text-gray-300 text-sm'>
                            Currencies
                          </span>
                          <p className='font-medium break-words'>
                            {getCurrencies(country.currencies)}
                          </p>
                        </div>
                      </div>

                      {/* Continent with icon */}
                      <div className='flex items-center gap-3'>
                        <span className='material-symbols-outlined text-teal-300'>
                          globe
                        </span>
                        <div>
                          <span className='text-gray-300 text-sm'>
                            Continent
                          </span>
                          <p className='font-medium'>
                            {country.continents.join(', ')}
                          </p>
                        </div>
                      </div>

                      {/* Timezones with icon */}
                      <div className='flex items-start gap-3'>
                        <span className='material-symbols-outlined text-red-300 mt-1'>
                          schedule
                        </span>
                        <div>
                          <span className='text-gray-300 text-sm'>
                            Timezones
                          </span>
                          <p className='font-medium'>
                            {country.timezones && country.timezones.length > 3
                              ? `${country.timezones
                                  .slice(0, 2)
                                  .join(', ')} and ${
                                  country.timezones.length - 2
                                } more`
                              : country.timezones.join(', ')}
                          </p>
                        </div>
                      </div>

                      {/* TLDs with icon */}
                      <div className='flex items-center gap-3'>
                        <span className='material-symbols-outlined text-indigo-300'>
                          dns
                        </span>
                        <div>
                          <span className='text-gray-300 text-sm'>Domain</span>
                          <p className='font-medium'>
                            {country.tld ? country.tld.join(', ') : 'N/A'}
                          </p>
                        </div>
                      </div>

                      {/* Calling codes with icon */}
                      <div className='flex items-center gap-3'>
                        <span className='material-symbols-outlined text-pink-300'>
                          call
                        </span>
                        <div>
                          <span className='text-gray-300 text-sm'>
                            Dialing Code
                          </span>
                          <p className='font-medium'>
                            {country.idd?.root && country.idd?.suffixes
                              ? `${country.idd.root}${country.idd.suffixes[0]}`
                              : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Maps section */}
                  <div className='mt-6'>
                    <div className='flex items-start gap-3 mb-3'>
                      <span className='material-symbols-outlined text-green-400 mt-1'>
                        map
                      </span>
                      <h3 className='text-white text-lg'>Maps</h3>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                      {country.maps?.googleMaps && (
                        <a
                          href={country.maps.googleMaps}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='backdrop-blur-md bg-white/10 rounded-lg p-3 border border-white/20 flex items-center gap-2 hover:bg-white/20 transition-colors'
                        >
                          <span className='material-symbols-outlined'>
                            location_on
                          </span>
                          Google Maps
                        </a>
                      )}
                      {country.maps?.openStreetMaps && (
                        <a
                          href={country.maps.openStreetMaps}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='backdrop-blur-md bg-white/10 rounded-lg p-3 border border-white/20 flex items-center gap-2 hover:bg-white/20 transition-colors'
                        >
                          <span className='material-symbols-outlined'>
                            public
                          </span>
                          OpenStreetMap
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Border countries section */}
                  {country.borders && country.borders.length > 0 && (
                    <div className='mt-6'>
                      <div className='flex items-start gap-3 mb-3'>
                        <span className='material-symbols-outlined text-blue-400 mt-1'>
                          shuffle
                        </span>
                        <h3 className='text-white text-lg'>Border Countries</h3>
                      </div>
                      <div className='flex flex-wrap gap-2'>
                        {getBorderCountries(country.borders).map(
                          (borderCode) => (
                            <div
                              key={borderCode}
                              onClick={() => navigate(`/country/${borderCode}`)}
                              className='backdrop-blur-md bg-white/10 rounded-lg px-3 py-2 border border-white/20 text-sm cursor-pointer hover:bg-white/20 transition-colors'
                            >
                              {borderCode}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-center w-full h-64'>
            <div className='backdrop-blur-lg bg-white/20 p-8 rounded-xl border border-white/30'>
              <p className='text-white text-xl'>Country not found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetails;
