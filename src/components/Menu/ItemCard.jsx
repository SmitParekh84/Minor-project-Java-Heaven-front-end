import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ItemCard = ({ item }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleAddItem = () => {
    navigate(`/item/${item._id}`); // Navigate to ItemDetail with the correct item ID
  };

  return (
    <div
      className="bg-card rounded-lg shadow-md p-4 flex transition-transform transform hover:scale-105" // Added hover effect
      role="button" // Added role for better accessibility
      onClick={handleAddItem} // Make the entire card clickable
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleAddItem();
        }
      }}
      tabIndex={0} // Make the card focusable
      aria-label={`View details for ${item.name}`} // Added aria-label
    >
      <img
        src={item.image}
        alt={item.name}
        className="rounded-full mb-2 mr-4 w-32 h-32 object-cover" // Adjust size as necessary
      />
      <div className="flex flex-col justify-between w-full">
        <div>
          <h3 className="font-semibold text-card-title">{item.name}</h3>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
        <div className="flex justify-between items-end mt-2">
          <span className="block text-lg font-bold text-card-title">
            ₹ {item.price.toFixed(2)}
          </span>
          <button
            className="bg-primary-foreground text-secondary-foreground hover:bg-primary-foreground/80 mt-2 p-2 rounded-full transition-colors" // Added transition for hover effect
            onClick={handleAddItem} // Use the handler here
            aria-label={`View details for ${item.name}`} // Added aria-label for the button
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
ItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ItemCard;
