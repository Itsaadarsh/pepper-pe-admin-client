import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const Layout = props => {
  return (
    <section className='h-screen overflow-hidden'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <div className='flex-1'>{props.children}</div>
      </div>
    </section>
  );
};
