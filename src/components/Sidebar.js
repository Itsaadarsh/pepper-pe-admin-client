import React from 'react';
import { FaHome } from 'react-icons/fa';
import { RiLuggageDepositFill } from 'react-icons/ri';
import { ImUsers } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  let navigate = useNavigate();

  return (
    <section className='flex-col w-72 h-screen bg-gray-100'>
      <button className='flex text-xl ml-10 mt-10 font-semibold' onClick={() => navigate('/')}>
        <span>
          <FaHome size={25} className='mr-4' />
        </span>
        Home
      </button>
      <button className='flex text-xl ml-10 mt-20 font-semibold' onClick={() => navigate('/users')}>
        <span>
          <ImUsers size={25} className='mr-4' />
        </span>
        Users
      </button>
      <button
        className='flex text-xl ml-10 mt-20 font-semibold'
        onClick={() => navigate('/deposit-withdraw')}
      >
        <span>
          <RiLuggageDepositFill size={25} className='mr-4' />
        </span>
        Deposit / Withdraw
      </button>
    </section>
  );
};
