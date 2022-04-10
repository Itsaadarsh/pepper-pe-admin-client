import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_API } from '../utils/consts';
import { getCookie, setCookie } from '../utils/cookies';

export const CreateUser = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [resMessage, setResMessage] = useState('');
  const [disable, setDisable] = useState(false);
  const [auth, setAuth] = useState(false);
  let navigate = useNavigate();
  const isLoggedIn = getCookie('auth');

  useEffect(() => {
    if (isLoggedIn == null) {
      navigate('/login');
    }
    setAuth(true);
  }, [auth]);

  const createreq = async () => {
    setDisable(true);
    const resp = await axios({
      method: 'POST',
      url: `${ADMIN_API}/create-user`,
      data: {
        name: username,
        email: userEmail,
        password: password,
      },
      headers: { Authorization: `Bearer ${isLoggedIn}` },
    });
    const data = await resp?.data;
    if (!data.data.error && data.data.token) {
      setCookie('auth', data.data.token);
      navigate('/');
    }

    setResMessage(data);
    setDisable(false);
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-white rounded-2xl border shadow-xl px-24 py-20'>
        <div className='flex flex-col items-center space-y-4'>
          <h1 className='font-bold text-6xl text-gray-700 text-center pb-20'>Create User</h1>
          <input
            value={username}
            onChange={event => setUserName(event.target.value)}
            type='text'
            placeholder='Name'
            className='border-2 rounded-lg w-full h-12 px-4'
          />
          <input
            value={userEmail}
            onChange={event => setUserEmail(event.target.value)}
            type='text'
            placeholder='Email'
            className='border-2 rounded-lg w-full h-12 px-4'
          />
          <input
            value={password}
            onChange={event => setPassword(event.target.value)}
            type='password'
            placeholder='Password'
            className='border-2 rounded-lg w-full h-12 px-4'
          />
          <button
            onClick={createreq}
            disabled={disable}
            className='bg-blue-400 text-white rounded-md font-semibold px-4 py-3 w-full'
          >
            Submit
          </button>
          {resMessage && (
            <>
              {resMessage.error ? (
                <div
                  className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5'
                  role='alert'
                >
                  <span class='block sm:inline'>{resMessage.data.message}</span>
                  <span class='absolute top-0 bottom-0 right-0 px-4 py-3'></span>
                </div>
              ) : (
                <div
                  className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-5'
                  role='alert'
                >
                  <span class='block sm:inline'>{resMessage.data.message}</span>
                  <span class='absolute top-0 bottom-0 right-0 px-4 py-3'></span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
