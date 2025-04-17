import React, { useContext } from 'react';
import SearchBar from '../components/SearchBar';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  
  return (
    <div className='w-full flex items-center justify-center bg-gray-50'>

      <div className='w-full max-w-[1280px] h-[90vh] flex'>
        <div className='w-full lg:w-[60%] flex flex-col justify-center items-start gap-6 mx-4 sm:mx-'>
          <h1 className='text-5xl text-gray-800 font-semibold'>
            Find Real Estate & Get Your Dream Place
          </h1>
          <h1 className='text-gray-800'>
            Whether you're looking to buy or rent, we offer a wide range of properties tailored to your lifestyle and budget.
            Start your journey towards owning your dream place with our advanced search tools and personalized services.
          </h1>
            <SearchBar />
        </div>
        
        <div className='w-[40%]  relative hidden lg:inline'>
          <img src="bg.png" alt="bg" className='absolute h-[90vh] right-0'/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
