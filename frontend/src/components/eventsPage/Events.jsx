import React, { useEffect, useState } from 'react';
import Navbar from '../../utility/Navbar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Events() {
  const { eventId } = useParams();
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [eventName, setEventName] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const checkAvailability = () => {
    try {
      if (date === '') return toast.error("Please provide a date");
      axios.post(`${backendUrl}/events/slots`, {
        eventId,
        date
      }).then(res => {
        setSlots(res.data);
      }).catch(console.error);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    axios.get(`${backendUrl}/events/${eventId}`).then(res => {
      setEventName(res.data.name);
    }).catch(console.error);
  }, [])
  return (
    <>
      <Navbar></Navbar>
      <div className='bg-white h-screen'>
        <p className='text-center text-[50px] underline'>{eventName}</p>
        <div className='w-full flex items-center justify-center  mt-10'>
          <label
            for='date_field'
            className='block mb-2 mr-2 text-xl font-medium text-gray-900'
          >
            Select Date:
          </label>
          <input
            type='date'
            id='date_field'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
          <button className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-orange-400 to-orange-400 group-hover:from-orange-500 group-hover:to-orange-400 hover:text-white ml-20' onClick={checkAvailability}>
            <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0'>
              Check Availability
            </span>
          </button>
        </div>
        {
          slots.length !== 0 && <div className='flex flex-col items-center justify-center'>
            <p className='text-[35px] mt-12 mb-10 text-orange-500 underline'>
              Available Slots
            </p>

            <div className='relative overflow-x-auto shadow-md sm:rounded-lg w-4/5'>
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50  '>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      Event Name
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Slot Timing
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Availability
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    slots.map(slot => (
                      <tr className='odd:bg-white even:bg-gray-50 border-b ' key={slot._id}>
                        <th
                          scope='row'
                          className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '
                        >
                          {eventName}
                        </th>
                        <td className='px-6 py-4'> {slot.startTime} - {slot.endTime} </td>
                        <td className='px-6 py-4'> {slot.MAX_ATTENDEES - slot.currentReserved}/{slot.MAX_ATTENDEES} </td>
                        <td className='px-6 py-4'>
                          <Link
                            to={`/bookingForm/${slot._id}`}
                            className='font-medium text-blue-600  hover:underline'
                          >
                            Book Now
                          </Link>
                        </td>
                      </tr>
                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    </>
  );
}
