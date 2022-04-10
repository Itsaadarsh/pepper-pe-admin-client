import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { ADMIN_API } from '../utils/consts';
import { getCookie } from '../utils/cookies';

export const Users = () => {
  const [auth, setAuth] = useState(false);
  let navigate = useNavigate();
  const isLoggedIn = getCookie('auth');

  useEffect(() => {
    if (isLoggedIn == null) {
      navigate('/login');
    }
    setAuth(true);
  }, [auth]);

  const { isLoading, apiData, serverError } = useFetch('GET', `${ADMIN_API}/get-users`, {}, isLoggedIn);

  if (isLoading) {
    return <span>Loading!</span>;
  }
  if (!isLoading && serverError) {
    return <span>Error!</span>;
  }

  return (
    <section>
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='min-w-full'>
                <thead className='bg-white border-b'>
                  <tr>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Account Number
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Name
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Account Balance
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {apiData.data.map((user, index) => {
                    return (
                      <tr
                        key={index}
                        className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
                      >
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {user.account_number}
                        </td>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          {user.name}
                        </td>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          {user.account_balance}
                        </td>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          {user.email}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center m-20'>
        <button
          onClick={() => navigate('/create-user')}
          class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded'
        >
          Create New User
        </button>
      </div>
    </section>
  );
};
