import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Users } from './pages/Users';
import { DepositWithdraw } from './pages/DepWith';
import { CreateUser } from './pages/CreateUser';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create-user' element={<CreateUser />} />
        <Route path='/deposit-withdraw' element={<DepositWithdraw />} />
        <Route path='*' element={<h1>Page not found</h1>} />
      </Routes>
    </Layout>
  );
}
