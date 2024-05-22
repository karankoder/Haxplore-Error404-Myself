import React from 'react';
import Hero from './Hero';
import AboutUs from './AboutUs';
import Services from './Services';
import Footer from '../../utility/Footer';
import Navbar from '../../utility/Navbar';

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <AboutUs></AboutUs>
      <Services></Services>
      <Footer></Footer>
    </>
  );
}
