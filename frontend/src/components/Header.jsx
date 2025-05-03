import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, LogOut } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  const goToCountries = () => {
    navigate('/allCountries');
  };

  const logout = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/auth');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem('authToken');
        navigate('/auth');
      } else {
        console.error('Logout failed:', data.error);
        alert(`Logout failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Server error during logout');
    }
  };

  return (
    <div className='flex justify-between items-center px-4 sm:px-6 md:px-20 lg:px-72 pt-2 md:pt-12 pb-2 md:pb-2'>
      <p className='cormorant-garamond text-white text-xs sm:text-sm'>
        LANDORA
      </p>
      <div className='flex gap-2 sm:gap-4'>
        <button
          className='flex items-center justify-center text-white p-2 rounded-full hover:bg-white/20 transition-colors duration-300 cursor-pointer'
          onClick={goToCountries}
          aria-label='View all countries'
          title='View all countries'
        >
          <Globe size={20} strokeWidth={1.5} />
        </button>
        <button
          className='flex items-center justify-center text-white p-2 rounded-full hover:bg-white/20 transition-colors duration-300 cursor-pointer'
          onClick={logout}
          aria-label='Logout'
          title='Logout'
        >
          <LogOut size={20} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

export default Header;
