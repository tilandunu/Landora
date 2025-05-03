import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GetStarted from './pages/GetStarted';
import Home from './pages/Home';
import AllCountries from './pages/AllCountries';
import AuthPage from './pages/AuthPage';
import CountryDetails from './pages/CountryDetails';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<GetStarted />} />
        <Route path='/home' element={<Home />} />
        <Route path='/allCountries' element={<AllCountries />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/country/:countryCode' element={<CountryDetails />} />
      </Routes>
    </div>
  );
}

export default App;
