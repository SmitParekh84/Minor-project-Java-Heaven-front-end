import React, { useEffect, useRef, useState } from 'react';

const FilterBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="bg-primary-foreground py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Dropdown Button for Mobile */}
        <div className="relative sm:hidden " ref={dropdownRef}>
          <button 
            className="text-secondary hover:text-secondary/80 font-semibold " 
            onClick={toggleDropdown}
          >
            Filter by ▼
          </button>
          {isOpen && (
            <div className="absolute z-10 bg-white shadow-lg rounded mt-1">
              <button className="block w-full text-left p-2 hover:bg-gray-100">Bestseller</button>
              <button className="block w-full text-left p-2 hover:bg-gray-100">Drinks</button>
              <button className="block w-full text-left p-2 hover:bg-gray-100">Food</button>
              <button className="block w-full text-left p-2 hover:bg-gray-100">Merchandise</button>
              <button className="block w-full text-left p-2 hover:bg-gray-100">Coffee At Home</button>
              <button className="block w-full text-left p-2 hover:bg-gray-100">Ready to Eat</button>
            </div>
          )}
        </div>

        {/* Filter Buttons for Larger Screens */}
        <div className="hidden sm:flex space-x-6"> {/* Only show on larger screens */}
          <button className="text-secondary hover:text-secondary/80 font-medium">Bestseller</button>
          <button className="text-secondary hover:text-secondary/80 font-medium">Drinks</button>
          <button className="text-secondary hover:text-secondary/80 font-medium">Food</button>
          <button className="text-secondary hover:text-secondary/80 font-medium">Merchandise</button>
          <button className="text-secondary hover:text-secondary/80 font-medium">Coffee At Home</button>
          <button className="text-secondary hover:text-secondary/80 font-medium">Ready to Eat</button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
