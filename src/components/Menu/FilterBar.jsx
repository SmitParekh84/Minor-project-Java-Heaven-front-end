import React, { useEffect, useRef, useState } from "react";

const FilterBar = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [categories, setCategories] = useState([]); // State to hold unique categories

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter); // Call the parent function to change filter
    setIsOpen(false); // Close dropdown after selection
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Fetch items to get unique categories
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/items");
        if (!response.ok) throw new Error("Failed to fetch items");

        const items = await response.json();
        const uniqueCategories = [...new Set(items.map((item) => item.category))]; // Extract unique categories
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="bg-primary-foreground py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Dropdown Button for Mobile */}
        <div className="relative sm:hidden" ref={dropdownRef}>
          <button
            className="text-secondary hover:text-secondary/80 font-semibold"
            onClick={toggleDropdown}
          >
            Filter by ▼
          </button>
          {isOpen && (
            <div className="absolute z-10 bg-white shadow-lg rounded mt-1">
              {categories.map((filter) => ( // Render unique categories
                <button
                  key={filter}
                  className="block w-full text-left p-2 hover:bg-gray-100"
                  onClick={() => handleFilterSelection(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter Buttons for Larger Screens */}
        <div className="hidden sm:flex space-x-6">
          {categories.map((filter) => ( // Render unique categories
            <button
              key={filter}
              className="text-secondary hover:text-secondary/80 font-medium"
              onClick={() => handleFilterSelection(filter)} // Handle filter selection
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
