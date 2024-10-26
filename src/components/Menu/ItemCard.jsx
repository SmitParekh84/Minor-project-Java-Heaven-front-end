import { faCartPlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ItemCard = ({ item }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleAddItem = () => {
    navigate(`/item/${item._id}`); // Navigate to ItemDetail with the correct item ID
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
      <img
        src={item.imageUrl}
        alt={`Image of ${item.name}`} // Use descriptive alt text for accessibility
        className="rounded-full mb-4 mr-4 sm:mr-6 w-24 h-24 sm:w-32 sm:h-32 object-cover shadow-md transition-opacity duration-300 hover:opacity-90" // Add hover effect for the image
      />
      <div className="flex flex-col justify-between w-full">
        <div>
          <h3 className="font-bold text-lg sm:text-xl text-gray-800 leading-tight">{item.name}</h3> {/* Added tight line spacing */}
          <p className="text-sm sm:text-base text-gray-600 mt-1">{item.description}</p> {/* Responsive font size and margin */}
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="block text-lg sm:text-xl font-semibold text-gray-900 tracking-wide">
            ₹ {item.price.toFixed(2)}
          </span>
          <button
            className="bg-secondary text-white hover:bg-secondary/90 transition duration-300 ease-in-out rounded-full py-2 px-4 sm:px-5 flex items-center shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
            onClick={handleAddItem}
            aria-label={`Add ${item.name} to cart`}
          >
            <span className="mr-2 text-sm sm:text-base">View Details</span>
            <FontAwesomeIcon icon={faCartPlus} className="ml-2 sm:ml-3" />
          </button>
        </div>


      </div>
    </div>

  );
};

export default ItemCard;
