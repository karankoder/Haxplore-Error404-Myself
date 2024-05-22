import React, { useEffect, useState } from 'react';
import Card from '../../utility/Card';
import axios from 'axios';

export default function Services() {

  const [events, setEvents] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios.get(`${backendUrl}/events`).then(res => {
      setEvents(res.data);
    }).catch(err => console.error(err));
  }, [])

  return (
    <>
      <div
        id='services'
        className='flex flex-col items-center justify-center border-t border-gray-300'
      >
        <h1 className='text-[50px] font-bold text-[#adadad] text-center mt-10 mb-10 border-b  border-orange-500'>
          Our Services
        </h1>
        <div className='grid grid-cols-3 gap-7 w-full pl-[55px] pb-10 pt-5'>
          {
            events.map(event => (
              <Card key={event._id} name={event.name} description={event.description} image_url={event.imageUrl} eventId={event._id}></Card>
            ))
          }
        </div>
      </div>
    </>
  );
}
