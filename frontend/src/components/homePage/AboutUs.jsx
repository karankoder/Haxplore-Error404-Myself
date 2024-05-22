import React from 'react';
import temple from '../../assets/about.jpg';
export default function AboutUs() {
  return (
    <>
      <div id='aboutus' className='h-[570px] w-full flex '>
        <div className='w-4/5 h-full flex flex-col items-center gap-[50px] pt-[25px]'>
          <h1 className='text-[50px] border-b border-orange-500 text-[#adadad]'>
            About the Temple
          </h1>
          <p className='pl-[100px] pr-[70px] leading-8 text-[#adadad]'>
            Standing on the western bank of India's holiest river Ganges,
            Varanasi is the oldest surviving city of the world and the cultural
            capital of India. It is in the heart of this city that there stands
            in its fullest majesty the Kashi Vishwanath Temple in which is
            enshrined the Jyotirlinga of Shiva, Vishweshwara or Vishwanath. Here
            gravitate the teeming millions of India to seek benediction and
            spiritual peace by the darshan of this Jyotirlinga which confers
            liberation from the bondages of maya and the inexorable
            entanglements of the world. A simple glimpse of the Jyotirlinga is a
            soul-cleansing experience that transforms life and puts it on the
            path of knowledge and bhakti. Vishweshwara Jyotirlinga has a very
            special and unique significance in the spiritual history of India.
            Tradition has it that the merits earned by the darshan of other
            jyotirlinga scattered in various parts of India accrue to devotee by
            a single visit to Kashi Vishwanath Temple.
          </p>
        </div>
        <div className='h-[500px] w-1/5 flex items-center justify-center pr-10'>
          <img className='w-full' src={temple} alt='' />
        </div>
      </div>
    </>
  );
}
