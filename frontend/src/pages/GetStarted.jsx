import React from 'react';
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();

  const goToAuth = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/home');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className='h-screen flex items-center justify-center bg-[url("./assets/GETSTARTED.png")] bg-cover bg-center'>
      <div className='flex flex-col cursor-default'>
        <div className='flex flex-row items-center justify-center pb-1'>
          <span className='material-symbols-outlined !text-xs'>
            align_justify_flex_end
          </span>
          <p className='cormorant-garamond text-6xl px-5 hover:tracking-widest duration-700'>
            LANDORA
          </p>
          <span className='material-symbols-outlined !text-xs'>
            align_justify_flex_start
          </span>
        </div>
        <div className='flex justify-center items-center'>
          <p className='cormorant-garamond uppercase text-center'>
            All the countries. None of the baggage fees
          </p>
        </div>
        <div className='flex justify-center pt-6 pb-64'>
          <div
            className='bg-[#29290D]  text-gray-200 text-sm px-8 py-3 rounded-full cursor-pointer hover:bg-white hover:text-black duration-500'
            onClick={goToAuth}
          >
            <p className='poppins-regular'> GET STARTED</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
