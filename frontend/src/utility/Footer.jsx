import React from 'react';
import logo from '../assets/temple_logo.png';
import email from '../assets/email_icon.svg';
import facebook from '../assets/fb_icon.svg';
import instagram from '../assets/insta_icon.svg';
import linkedin from '../assets/linkedin_icon.svg';

export default function Footer() {
  return (
    <>
      <div id='contactus' className='w-full h-[400px] border-t flex bg-white'>
        <div className='flex flex-col items-center w-2/5'>
          <img className='h-[250px]' src={logo} alt='' />
          <div className='flex mb-[40px] items-center justify-center gap-[70px]'>
            <div className='flex flex-col gap-2 pl-5'>
              <a className='hover:underline' href=''>
                Home
              </a>
              <a className='hover:underline' href=''>
                About Us
              </a>
            </div>
            <div className='flex flex-col gap-2'>
              <a className='hover:underline' href=''>
                Our Services
              </a>
              <a className='hover:underline' href=''>
                Dashboard
              </a>
            </div>
          </div>
          <div className='flex gap-7'>
            <img className='h-10 w-10' src={email} alt='' />
            <img className='h-10 w-10' src={instagram} alt='' />
            <img className='h-10 w-10' src={facebook} alt='' />
            <img className='h-10 w-10' src={linkedin} alt='' />
          </div>
        </div>
        <div className='w-3/5 flex flex-col items-center justify-center gap-10'>
          <p className='text-[20px] border-b border-orange-500'>Contact Us</p>
          <p>
            Shri Kashi Vishwanath Official Web Portal CK 37/40,41,42 Bansphatak,
            Varanasi-221 001
          </p>
          <p>Mandir Phone No.: +91-7080292930, +91-6393131608</p>
          <p>shrikashivishwanathtempletrust@gmail.com</p>
          <p>support@shrikashivishwanath.org</p>
        </div>
      </div>
    </>
  );
}
