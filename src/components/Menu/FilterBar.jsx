import React, { useEffect, useRef, useState } from "react";
import { API_URL } from "../../config";

const FilterBar = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
    setIsOpen(false);
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

  // Fetch unique categories from items
  useEffect(() => {
    const fetchCategories = async () => {
      setError("");
      try {
        const response = await fetch(`${API_URL}/api/items`);
        if (!response.ok) throw new Error("Failed to fetch items");

        const items = await response.json();
        const uniqueCategories = [...new Set(items.map((item) => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching items:", error);
        setError("There was a problem loading categories. Please try again.");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-primary-foreground py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Dropdown Button for Mobile */}
        <div className="relative sm:hidden" ref={dropdownRef}>
          <button
            className="text-secondary hover:text-secondary/80 font-semibold"
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            Filter by ▼
          </button>
          {isOpen && (
            <div className="absolute z-10 bg-white shadow-lg rounded mt-1">
              {error ? (
                <div className="p-2 text-red-600">{error}</div>
              ) : (
                categories.map((filter) => (
                  <button
                    key={filter}
                    className="block w-full text-left p-2 hover:bg-gray-100"
                    onClick={() => handleFilterSelection(filter)}
                  >
                    {filter}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Filter Buttons for Larger Screens */}
        <div className="hidden sm:flex space-x-6">
          {error ? (
            <span className="text-red-600">{error}</span>
          ) : (
            categories.map((filter) => (
              <button
                key={filter}
                className={`text-secondary hover:text-secondary/80 font-medium ${
                  selectedFilter === filter ? "font-bold" : ""
                }`}
                onClick={() => handleFilterSelection(filter)}
              >
                {filter}
              </button>
            ))
          )}
          {selectedFilter && (
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => {
                setSelectedFilter("");
                onFilterChange(""); // Clear the filter
              }}
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
