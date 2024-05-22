import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card({name, description, image_url, eventId}) {
  return (
    <>
      <div className={style.flip}>
        <div
          className={style.front}
          style={{
            backgroundImage: `url(${image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '250px',
          }}
        >
          <h1 className='text-[20px] font-bold text-black'> {name} </h1>
        </div>
        <div className={style.back}>
          <h2 className='mb-2'> {name} </h2>
          <p>
            {description}
          </p>
          <Link
            to={`/event/${eventId}`}
            className='mt-8 w-[110px] text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-m px-4 py-2 text-center me-2 mb-2 dark:focus:ring-orange-900'
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
}
