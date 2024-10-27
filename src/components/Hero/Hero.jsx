import React, { useEffect, useState } from 'react';
import WidgetOffer from './WidgetOffer';
import TypeMenu from './TypeMenu';
import Recommend from '../Pages/Recommend';
import AboutCard from '../Pages/AboutCard';

export default function Hero() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (you can replace this with real data fetching)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);



  return (
    <div className="bg-primary-foreground font-spartan ">
      <div className="relative isolate px-8 lg:px-8 z-0">



        <WidgetOffer />
        <TypeMenu />
        <Recommend />
        <AboutCard />

      </div>
    </div >
  );
}
