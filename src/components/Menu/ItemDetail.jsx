import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import items from './data'; // Import the items data
import { useCart } from '../../context/CartContext'; // Import the Cart Context

const ItemDetail = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(''); // State to track selected cup size
  const { addToCart } = useCart(); // Access the addToCart function from context

  useEffect(() => {
    // Find the item by ID
    const foundItem = items.find((item) => item.id === parseInt(id));
    setItem(foundItem);
  }, [id]);

  if (!item) return <div>Loading...</div>; // Loading state

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    addToCart({ ...item, size: selectedSize }); // Add item with selected size to cart
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="rounded-lg p-6 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
        <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md" />
        <h2 className="text-2xl font-bold mt-4">{item.name}</h2>
        <p className="text-gray-600 mt-2">{item.description}</p>
        <p className="text-lg font-semibold mt-4">Price: ₹ {item.price.toFixed(2)}</p>

        {/* Options for cup sizes */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Select Cup Size:</h3>
          <div className="flex space-x-4 mt-2">
            {['Small', 'Medium', 'Large'].map((size) => (
              <button
                key={size}
                className={`border rounded py-1 px-2 ${
                  selectedSize === size ? 'bg-secondary text-primary-foreground' : ''
                }`}
                onClick={() => handleSizeSelection(size)} // Handle size selection
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add item button */}
        <div className="flex items-center mt-4">
          <button
            className="bg-secondary text-primary-foreground py-2 px-4 rounded"
            disabled={!selectedSize}
            onClick={handleAddToCart} // Call add to cart on button click
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
