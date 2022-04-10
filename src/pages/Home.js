import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { ADMIN_API } from '../utils/consts';
import { getCookie } from '../utils/cookies';

export const Home = () => {
  const [auth, setAuth] = useState(false);
  let navigate = useNavigate();
  const isLoggedIn = getCookie('auth');

  useEffect(() => {
    if (isLoggedIn == null) {
      navigate('/login');
    }
    setAuth(true);
  }, [auth]);

  const { isLoading, apiData, serverError } = useFetch(
    'GET',
    `${ADMIN_API}/get-bank-details`,
    {},
    isLoggedIn
  );

  if (isLoading) {
    return <span>Loading!</span>;
  }
  if (!isLoading && serverError) {
    return <span>Error!</span>;
  }

  return (
    <section>
      {auth && (
        <>
          <div id='wrapper' className='px-4 py-4'>
            <div className='sm:grid sm:h-32 sm:grid-flow-row sm:gap-4 sm:grid-cols-3'>
              <div className='flex flex-col px-10 py-20 bg-white border-2 border-gray-800 rounded sm:mt-0'>
                <div>
                  <p className='text-2xl mb-4 text-center text-gray-500 font-extrabold'>Total Bank Balance</p>
                  <p className='text-3xl font-semibold text-center text-gray-800'>
                    {apiData.data[0].total_bank_balance}
                  </p>
                </div>
              </div>
              <div className='flex flex-col justify-center px-4 py-4 mt-4 bg-white border-2 border-gray-800 rounded sm:mt-0'>
                <div>
                  <p className='text-2xl mb-4 text-center text-gray-500 font-extrabold'>
                    Total Number of Users
                  </p>
                  <p className='text-3xl font-semibold text-center text-gray-800'>
                    {apiData.data[0].total_number_of_user}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
