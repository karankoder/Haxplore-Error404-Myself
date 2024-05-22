import React, { useEffect, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {

  const navigate = useNavigate();

  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const googleLogin = useGoogleLogin({
    onSuccess: (res) => googleAuth(res.access_token),
    onError: (error) => console.log('Login Failed:', error)
  });

  const googleAuth = async (access_token) => {
    try {
      axios.post(`${backendUrl}/auth/google`, {
        access_token
      })
        .then(res => {
          localStorage.setItem('jwt', res.data.jwt);
          localStorage.setItem('role', res.data.role);
          window.location.reload();
        })
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  }

  const sendOtp = () => {
    try {
      const isNumeric = /^[0-9]+$/.test(mobileNumber);
      if (!isNumeric) {
        return toast.error("Invalid mobile number");
      }
      if (mobileNumber.length !== 10) {
        return toast.error("Mobile number must be 10 digits");
      }
      axios.post(`${backendUrl}/auth/send-otp`, {
        mobileNumber
      }).then(res => {
        setOtpSent(true);
      }).catch(console.error);
    } catch (error) {
      console.error(error);
    }
  }

  const verifyOtp = () => {
    try {
      if (otp.length !== 6) {
        return toast.error("OTP must be 6 digits");
      }
      axios.post(`${backendUrl}/auth/verify-otp`, {
        mobileNumber,
        otp
      }).then(res => {
        localStorage.setItem('jwt', res.data.jwt);
        localStorage.setItem('role', res.data.role);
        window.location.reload();
      }).catch(console.error);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate('/');
    }
  }, [])

  return (
    <>
      <div className='flex items-center justify-center h-screen bg-gray-500'>
        <div className='items-center justify-center h-screen w-3/5 bg-white flex flex-col gap-5'>
          <a className='hover:underline hover:text-orange-400' href='/'>
            Back to Home Page
          </a>
          <button className='px-4 py-2 border flex gap-[70px] border-slate-200  rounded-lg text-slate-700  hover:border-slate-400  hover:text-slate-900  hover:shadow transition duration-150 w-2/5' onClick={googleLogin}>
            <img
              className='w-6 h-6'
              src='https://www.svgrepo.com/show/475656/google-color.svg'
              loading='lazy'
              alt='google logo'
            />
            <span>Signin with Google</span>
          </button>

          <p>Or</p>

          <div className='max-w-sm mx-auto'>
            <label
              htmlFor='phone-input'
              className='block mb-2 text-sm font-medium text-gray-900 '
            >
              Signin with Phone Number:
            </label>
            {
              !otpSent ?
                <div className='relative'>
                  <input
                    type='tel'
                    id='phone-input'
                    aria-describedby='helper-text-explanation'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  '
                    placeholder='Enter phone number'
                    onChange={e => setMobileNumber(e.target.value)}
                    value={mobileNumber}
                    required
                  />
                  <p
                    id='helper-text-explanation'
                    className='mt-2 mb-4 text-sm text-gray-500 '
                  >
                    We will send you an SMS with a verification code.
                  </p>
                  <button
                    className='text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none '
                    onClick={sendOtp}
                  >
                    Send verification code
                  </button>
                </div>
                :
                <div className='relative'>
                  <input
                    type='tel'
                    id='otp'
                    aria-describedby='helper-text-explanation'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  '
                    placeholder='Enter OTP'
                    onChange={e => setOtp(e.target.value)}
                    value={otp}
                    required
                  />
                  <button
                    className='text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none '
                    onClick={verifyOtp}
                  >
                    Verify OTP
                  </button>
                </div>
            }

          </div>
        </div>
      </div>
    </>
  );
}
