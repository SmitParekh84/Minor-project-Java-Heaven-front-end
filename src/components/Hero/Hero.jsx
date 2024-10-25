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

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen flex-col">
            <div
                className="animate-spin h-12 w-12 border-4 border-brown-500 border-t-transparent rounded-full"
                style={{ borderColor: '#8B4513', borderTopColor: 'transparent' }} // Set the desired brown color
            ></div>
            <span className="mt-4 text-lg">Loading...</span>
        </div>
    );
}

  return (
    <div className="bg-primary-foreground font-spartan">
      <div className="relative isolate px-8 lg:px-8 py-16">
        <section aria-labelledby="hero-section">
          <h2 id="hero-section" className="sr-only">Welcome to Our Coffee Shop</h2>

          <WidgetOffer />
          <TypeMenu />
          <Recommend />
          <AboutCard />
        </section>
      </div>
    </div>
  );
}
