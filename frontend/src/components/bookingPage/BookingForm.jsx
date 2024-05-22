import React, { useEffect, useState } from 'react';
import Navbar from '../../utility/Navbar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from "../../assets/react.svg"
import QRCode from 'react-qr-code';

export default function BookingForm() {
  const { slotId } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [slot, setSlot] = useState(null);
  const [eventName, setEventName] = useState('');
  const [numTickets, setNumTickets] = useState(0);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [qrCodes, setQRCodes] = useState([]);

  const handleChange = (index, field, value) => {
    const newTicketDetails = [...ticketDetails];
    newTicketDetails[index] = {
      ...newTicketDetails[index],
      [field]: value
    };
    setTicketDetails(newTicketDetails);
  };

  const generateQRCodeURLs = (tickets) => {
    const urls = tickets.flatMap(ticket => [
      `${frontendUrl}/entry/${ticket._id}`,
      `${frontendUrl}/exit/${ticket._id}`
    ]);
    return urls;
  }

  const bookTicket = () => {
    try {
      axios.post(`${backendUrl}/tickets/book`, {
        slotId,
        persons: ticketDetails
      }, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}` 
        }
      }).then(res => displayRazorpay()).catch(console.error);
    } catch (error) {
      console.error(error);
    }
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(`${backendUrl}/payment/orders`, {
      payment: totalCost
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
      }
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Kolanu Varun.",
      description: "Test Transaction",
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(`${backendUrl}/payment/success`, data);

        axios.post(`${backendUrl}/tickets/confirm`, {
          slotId
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}` 
          }
        }).then(res => {
          setTickets(res.data)
          console.log(res.data)
          const qrCodeURLs = generateQRCodeURLs(res.data); // Generate QR code URLs
          setQRCodes(qrCodeURLs);
        }).catch(console.error)
      },
      prefill: {
        name: "Kolanu Varun",
        email: "kolanuvarun739@gmail.com",
        contact: "9603138312",
      },
      notes: {
        address: "Temple Ticketing System",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    axios.get(`${backendUrl}/slot/${slotId}`).then(res => {
      setSlot(res.data);
      axios.get(`${backendUrl}/events/${res.data.event}`).then(res => {
        setEventName(res.data.name);
      }).catch(console.error);
    }).catch(console.error);
  }, [])

  const totalCost = slot ? slot.ticketCost * numTickets : 0;

  return (
    <>
      <Navbar />
      <div className='bg-white h-screen flex flex-col items-center'>
        <p className='text-center text-[50px] underline'>{eventName}</p>
        <div className='w-4/5 flex flex-col mt-14 text-orange-500'>
          <p className='self-start text-[25px] mb-5'>Booking Details :</p>

          <div className='relative overflow-x-auto shadow-md sm:rounded-lg w-full'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Event Name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Slot Timing
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Price
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Total Amount
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className='bg-white border-b  '>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '
                  >
                    {eventName}
                  </th>
                  <td className='px-6 py-4'>{slot && `${slot.startTime} - ${slot.endTime}`}</td>
                  <td className='px-6 py-4'>{slot && `Rs. ${slot.ticketCost}/person`}</td>
                  <td className='px-6 py-4'>{`Rs. ${totalCost}`}</td>
                  <td className='px-6 py-4'>
                    <Link
                      to='/events'
                      className='font-medium text-blue-600  hover:underline'
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='mt-3'>
          <span>Number of tickets:</span>
          <input type="number" required placeholder='Number of Tickets' value={numTickets} onChange={e => setNumTickets(e.target.value)} />
        </div>
        <div className='w-4/5 mt-20'>
          <p className='self-start text-[25px] mb-5  text-orange-500'>
            Devotees Details :
          </p>

          {
            Array.from({ length: numTickets }).map((_, index) => (
              <div key={index}>
                <div className='grid gap-6 mb-6 md:grid-cols-3'>
                  <div>
                    <label
                      htmlFor={`name_${index}`}
                      className='block mb-2 text-[18px] font-large text-gray-900'
                    >
                      Name
                    </label>
                    <input
                      type='text'
                      id={`name_${index}`}
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                      placeholder='Enter Name'
                      onChange={(e) => handleChange(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`gender_${index}`}
                      className='block mb-2 text-[18px] font-large text-gray-900'
                    >
                      Gender
                    </label>
                    <select
                      id={`gender_${index}`}
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                      required
                      onChange={(e) => handleChange(index, 'gender', e.target.value)}
                    >
                      <option value=''>Select Gender</option>
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor={`age_${index}`}
                      className='block mb-2 text-[18px] font-large text-gray-900'
                    >
                      Age
                    </label>
                    <input
                      type='number'
                      id={`age_${index}`}
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                      placeholder='Enter Age'
                      onChange={(e) => handleChange(index, 'age', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            ))
          }
          <button
            type='button'
            className='mt-5 focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
            onClick={bookTicket}
          >
            Book Ticket
          </button>
          {/* Display QR codes */}
        <div>
          {qrCodes.map((qrCode, index) => (
            <div key={index} className='mt-5'>
              <span>QR Code {index + 1}:</span>
              <QRCode value={qrCode} />
            </div>
          ))}
        </div>
        </div>
      </div>
    </>
  );
}
