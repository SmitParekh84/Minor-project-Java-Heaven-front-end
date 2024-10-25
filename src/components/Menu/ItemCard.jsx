import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ItemCard = ({ item }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleAddItem = () => {
    navigate(`/item/${item._id}`); // Navigate to ItemDetail with the correct item ID
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex transition-transform transform hover:scale-105">
      <img
        src={item.imageUrl}
        alt={item.name} // Use item name as alt text for better accessibility
        className="rounded-full mb-4 mr-4 sm:mr-6 w-24 h-24 sm:w-32 sm:h-32 object-cover shadow-md" // Maintain aspect ratio
      />
      <div className="flex flex-col justify-between w-full">
        <div>
          <h3 className="font-bold text-lg sm:text-xl text-gray-800">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
        <div className="flex justify-between items-end mt-4">
          <span className="block text-lg sm:text-xl font-semibold text-gray-900">
            ₹ {item.price.toFixed(2)} {/* Format price to 2 decimal places */}
          </span>
          <button
            className="bg-secondary text-white hover:bg-secondary/90 transition duration-300 rounded-full p-2 sm:p-3 flex items-center"
            onClick={handleAddItem} // Use the handler here
            aria-label={`View details for ${item.name}`} // Add aria-label for accessibility
          >
            <span className="mr-2 text-sm sm:text-base">View Details</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5" // Adjust the size of the icon as necessary
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9V7a1 1 0 112 0v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H9a1 1 0 110-2h2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
