import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_API } from '../utils/consts';
import { getCookie, setCookie } from '../utils/cookies';

export const Login = () => {
  let navigate = useNavigate();
  const [accNo, setAccNo] = useState('');
  const [password, setPassword] = useState('');
  const [resMessage, setResMessage] = useState('');
  const [disable, setDisable] = useState(false);

  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const isLoggedIn = getCookie('auth');
    if (isLoggedIn != null) {
      navigate('/');
    }
    setAuth(true);
  }, [auth]);

  const login = async () => {
    setDisable(true);
    const resp = await axios({
      method: 'POST',
      url: `${ADMIN_API}/login`,
      data: {
        admin_id: +accNo,
        password: password,
      },
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
      <div className='bg-white rounded-2xl border shadow-xl px-36 py-40'>
        <div className='flex flex-col items-center space-y-4'>
          <h1 className='font-bold text-6xl text-gray-700 text-center'>Login</h1>
          <p className='text-4xl text-gray-500 py-9'>Welcome to Pepper Pe 😊</p>
          <input
            value={accNo}
            onChange={event => setAccNo(event.target.value)}
            type='text'
            placeholder='Admin ID'
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
            onClick={login}
            disabled={disable}
            className='bg-blue-400 text-white rounded-md font-semibold px-4 py-3 w-full'
          >
            Login
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
