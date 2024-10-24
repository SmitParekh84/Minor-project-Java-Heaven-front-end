import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import FilterBar from "./FilterBar";
import toast from "react-hot-toast";
import { API_URL } from "../../config"; // Ensure this path is correct and the config file exports API_URL

const ItemList = () => {
  const [items, setItems] = useState([]); // State to hold the fetched items
  const [filteredItems, setFilteredItems] = useState([]); // State for filtered items
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors
  const [selectedFilter, setSelectedFilter] = useState(""); // State for the selected filter

  // Fetch items from the API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}/api/items`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItems(data); // Update state with fetched data
        setFilteredItems(data); // Initially show all items
      } catch (error) {
        setError(error.message); // Handle errors
        toast.error(error.message); // Notify user about the error
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchItems();
  }, []); // Empty dependency array to run the effect once on mount

  // Filter items based on selected filter
  useEffect(() => {
    setFilteredItems(
      selectedFilter
        ? items.filter((item) => item.category === selectedFilter)
        : items
    );
  }, [selectedFilter, items]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter); // Update selected filter
  };

  if (loading) return <LoadingIndicator />; // Show loading state
  if (error) return <ErrorMessage error={error} />; // Show error message

  return (
    <div className="container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
      {/* Filter Bar */}
      <div className="relative isolate px-4 sm:px-8 lg:px-8 py-16 bg-primary-foreground font-spartan">
        <FilterBar onFilterChange={handleFilterChange} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} /> // Use item._id for key if item has it
          ))}
        </div>
      </div>
    </div>
  );
};

// Loading Indicator Component
const LoadingIndicator = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="loader">Loading...</div>
  </div>
);

// Error Message Component
const ErrorMessage = ({ error }) => (
  <div className="flex items-center justify-center h-screen">
    <p>Error: {error}</p>
  </div>
);

export default ItemList;
