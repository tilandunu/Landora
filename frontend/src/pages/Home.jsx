import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import CountrySlider from '../components/CountrySlider';
import ExploreDivider from '../components/ExploreDivider';
import CountryStats from '../components/CountryStats';
import InfoBoxes from '../components/InfoBoxes';
import BackToTop from '../components/BackToTop';
import Footer from '../components/Footer';
import { countryImages, featuredCountryNames } from '../components/CountryData';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [featuredCountries, setFeaturedCountries] = useState([]);
  const [totalCountries, setTotalCountries] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const numberRef = useRef(null);

  const navigate = useNavigate();

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/auth');
    }
  }, [navigate]);

  // Fetch country data
  useEffect(() => {
    fetchCountries();
    const timeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  // Counter animation
  useEffect(() => {
    if (!loading && numberRef.current && totalCountries > 0) {
      animateCounter();
    }
  }, [loading, totalCountries]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) throw new Error('Failed to fetch countries data');

      const allCountries = await response.json();
      setTotalCountries(allCountries.length);

      const featured = processCountryData(allCountries);
      setFeaturedCountries(featured);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching country data:', err);
      setLoading(false);
    }
  };

  const processCountryData = (allCountries) => {
    // Filter and map featured countries
    const featured = allCountries.filter((country) =>
      featuredCountryNames.includes(country.name.common)
    );

    const mappedFeatured = mapCountryData(featured);

    // Sort to match desired order
    return sortFeaturedCountries(mappedFeatured);
  };

  const mapCountryData = (countries) => {
    return countries.map((country) => {
      const images = countryImages[country.name.common];
      const description = createCountryDescription(country);
      const languages = country.languages
        ? Object.values(country.languages).join(' & ')
        : 'Various';

      return {
        name: country.name.common.toUpperCase(),
        flag: images?.flag || country.flags.png,
        bg: images?.bg || country.flags.png,
        description: description,
        population: `${(country.population / 1000000).toFixed(1)} MILLION`,
        language: languages.toUpperCase(),
      };
    });
  };

  const createCountryDescription = (country) => {
    let description = `${country.region} nation`;
    if (country.subregion) {
      description += ` in ${country.subregion}`;
    }
    if (country.capital && country.capital.length > 0) {
      description += `, with capital ${country.capital[0]}`;
    }
    description += `. Known for its culture and heritage.`;
    return description;
  };

  const sortFeaturedCountries = (mappedFeatured) => {
    const sortedFeatured = [];
    featuredCountryNames.forEach((name) => {
      const found = mappedFeatured.find(
        (country) => country.name === name.toUpperCase()
      );
      if (found) sortedFeatured.push(found);
    });

    return sortedFeatured.length > 0 ? sortedFeatured : mappedFeatured;
  };

  const animateCounter = () => {
    let count = { val: 150 };
    gsap.to(count, {
      val: totalCountries,
      duration: 4,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: numberRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.innerText = Math.floor(count.val);
        }
      },
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (featuredCountries.length === 0) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-xl sm:text-2xl mb-4'>Error loading country data</p>
          <button
            onClick={() => window.location.reload()}
            className='bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='relative min-h-screen cursor-default'>
      <div className="absolute inset-0 bg-[url('./assets/Home.jpg')] bg-cover bg-center bg-no-repeat z-0"></div>
      <div className='absolute inset-0 bg-gradient-to-b from-black/70 to-black/10 z-10'></div>
      <div className='relative z-20'>
        <Header />
        <CountrySlider countries={featuredCountries} isMobile={isMobile} />
        <ExploreDivider />
        <CountryStats totalCountries={totalCountries} numberRef={numberRef} />
        <InfoBoxes />
        <BackToTop scrollToTop={scrollToTop} />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
