import React from 'react';
import logo from '../assets/temple_logo.png';
import { Link } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
export default function Navbar() {

  const logout = () => {
    googleLogout();
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    window.location.reload();
  }

  return (
    <>
      <div className='h-20 w-full bg-[#222] text-white flex justify-between items-center border-gray-300'>
        <div className='flex justify-center h-20 w-25 items-center'>
          <Link to='/'>
            <img className='h-22 w-20 pt-4' src={logo} alt='No Image' />
          </Link>
        </div>
        <div>
          <p>Ayodhya Ram Mandir</p>
          <p
            className='font-semibold'
            style={{
              background: '#FF6D01',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            A place of worship
          </p>
        </div>
        <div className='flex justify-around items-center gap-8'>
          <a href='#aboutus' className='hover:text-[#FF6D01]'>
            About Us
          </a>
          <a className='hover:text-[#FF6D01]' href='#services'>
            Our Services
          </a>
          <a className='hover:text-[#FF6D01]' href='#contactus'>
            Contact Us
          </a>
          <Link className='hover:text-[#FF6D01]' to='/dashboard'>
            Dashboard
          </Link>
        </div>
        <div className='flex items-center'>
          {
            !localStorage.getItem('jwt') ?
              <Link
                to='/signin'
                className='mr-5 w-24 h-10 flex justify-center items-center text-base font-semibold text-center bg-white text-black rounded-md'
              >
                Sign in
              </Link> :
              <button className='mr-5 w-24 h-10 flex justify-center items-center text-base font-semibold text-center bg-white text-black rounded-md' onClick={logout}>Logout</button>
          }
        </div>
      </div>
    </>
  );
}
