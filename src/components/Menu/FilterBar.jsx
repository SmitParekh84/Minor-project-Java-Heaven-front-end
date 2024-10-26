import React, { useEffect, useRef, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate, useLocation } from "react-router-dom"; // Import hooks from react-router-dom

const FilterBar = ({ onFilterChange }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get current location
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

    // Update the URL with the selected filter
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("category", filter); // Set the category parameter
    navigate(`?${queryParams.toString()}`, { replace: true }); // Navigate with new query params
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
                    onClick={() => handleFilterSelection(filter)}
                    className={`block px-4 py-2 text-left w-full hover:bg-gray-100 ${selectedFilter === filter ? "bg-gray-200" : ""}`}
                  >
                    {filter}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Filter Buttons for Larger Screens */}
        <div className="hidden sm:flex space-x-4">
          {error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            categories.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterSelection(filter)}
                className={`px-4 py-2 rounded-lg transition duration-300 ${selectedFilter === filter
                  ? "bg-secondary text-primary-foreground"
                  : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                {filter}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
