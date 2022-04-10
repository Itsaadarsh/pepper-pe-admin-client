import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  let navigate = useNavigate();

  return (
    <div className='flex bg-gray-200 justify-center'>
      <button className='my-5 ml-44 text-3xl font-bold italic' onClick={() => navigate('/')}>
        Pepper Pe - Admin Panel
      </button>
    </div>
  );
};
