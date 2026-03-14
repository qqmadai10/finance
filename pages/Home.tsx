import React from 'react';
import Hero from '../components/Hero';
import { PROFILE_DATA } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="space-y-0">
      <Hero profile={PROFILE_DATA} />
    </div>
  );
};

export default Home;

