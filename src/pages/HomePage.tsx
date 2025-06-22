import React from 'react';
import Hero from '../components/Hero';
import ServiceCards from '../components/ServiceCards';
import Statistics from '../components/Statistics';
import Testimonials from '../components/Testimonials';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ServiceCards />
      <Statistics />
      <Testimonials />
    </div>
  );
};

export default HomePage;