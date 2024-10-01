import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ItemCard = ({ item }) => {
  const navigate = useNavigate(); // Initialize navigate function

  // Handle item view details action
  const handleAddItem = () => {
    if (item.id) {
      navigate(`/item/${item.id}`); // Navigate to ItemDetail with the item ID
    } else {
      console.error("Item ID is undefined");
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-4 flex">
      <img
        src={item.image || "default-image-url.jpg"} // Fallback to a default image if item.image is undefined
        alt={item.name || "Item Image"} // Add alt text fallback
        className="rounded-full mb-2 mr-4 w-32 h-32" // Adjust size as necessary
      />
      <div className="flex flex-col justify-between w-full">
        <div>
          <h3 className="font-semibold text-card-title">
            {item.name || "Unnamed Item"} {/* Fallback in case item.name is missing */}
          </h3>
          <p className="text-sm text-muted-foreground">
            {item.description || "No description available."} {/* Fallback for missing description */}
          </p>
        </div>
        <div className="flex justify-between items-end mt-2">
          <span className="block text-lg font-bold text-card-title">
            ₹ {item.price ? item.price.toFixed(2) : "N/A"} {/* Fallback for missing price */}
          </span>
          <button
            className="bg-primary-foreground text-secondary-foreground hover:bg-primary-foreground/80 mt-2 p-2 rounded-full"
            onClick={handleAddItem} // Use the handler here
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
