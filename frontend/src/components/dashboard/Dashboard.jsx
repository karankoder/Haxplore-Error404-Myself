import React from 'react';
import Navbar from '../../utility/Navbar';

export default function Dashboard() {
  return (
    <>
      <Navbar></Navbar>
      <div className='container bg-white h-screen flex flex-col items-center'>
        <p className='text-[40px]'>Upcoming Events</p>
        <p> Current Visitor Count - 100</p>
        <p> Estimated Waiting Time - 10000</p>
      </div>
    </>
  );
}
