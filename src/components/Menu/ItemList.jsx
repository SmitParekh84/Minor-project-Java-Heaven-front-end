import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import FilterBar from "./FilterBar";

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
        const response = await fetch("http://localhost:5000/api/items");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItems(data); // Update state with fetched data
        setFilteredItems(data); // Initially show all items
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchItems();
  }, []); // Empty dependency array to run the effect once on mount

  // Filter items based on selected filter
  useEffect(() => {
    if (selectedFilter) {
      setFilteredItems(items.filter((item) => item.category === selectedFilter));
    } else {
      setFilteredItems(items);
    }
  }, [selectedFilter, items]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter); // Update selected filter
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
        <span className="ml-2">Loading...</span>
      </div>
    ); // Show loading state with spinner
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error}</p>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    ); // Show error message with retry button
  }

  return (
    <section className="container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
      {/* Filter Bar */}
      <div className="relative isolate px-8 lg:px-8 py-16 bg-primary-foreground font-spartan">
        <FilterBar onFilterChange={handleFilterChange} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard key={item._id} item={item} /> // Use _id for a unique key
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No items found matching the selected filter.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemList;
