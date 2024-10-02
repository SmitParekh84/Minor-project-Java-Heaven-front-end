import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // Import the Cart Context
import toast from "react-hot-toast";

const ItemDetail = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(""); // State to track selected cup size
  const { addToCart } = useCart(); // Access the addToCart function from context
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/items/${id}`);
        if (!response.ok) {
          toast.error("Failed to fetch item");
          return
        }
        const foundItem = await response.json();
        setItem(foundItem);
      } catch (err) {
        setError(err.message); // Set error message if fetch fails
      } finally {
        setLoading(false); // Set loading to false regardless of fetch success or failure
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div>Error: {error}</div>; // Error state
  if (!item) return <div>Item not found</div>; // Handle case where item is not found

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      console.error("Size not selected"); // Debugging: Ensure a size is selected
      return;
    }

    // Add item to cart with selected size and correct id field
    addToCart({ ...item, id: item._id, size: selectedSize });
  };

  return (
    <div className="rounded-lg p-10 w-full h-screen flex items-center justify-center ">
      <div className="rounded-lg w-full p-10 flex flex-col md:flex-row items-start bg-gray-100 shadow-lg">

        <div className="flex-shrink-0">
          {/* Image Section */}
          <img
            src={item.imageUrl || "fallback-image-url"} // Use fallback image URL
            alt={item.name}
            className="w-48 h-48 object-cover rounded-md mx-auto md:mx-0 md:mr-6" // Center on mobile, align left on desktop
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-between w-full md:ml-6">
          <div>
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <p className="text-lg font-semibold mt-4">
              Price: ₹ {item.price.toFixed(2)}
            </p>
          </div>

          {/* Options for cup sizes */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Select Cup Size:</h3>
            <div className="flex space-x-4 mt-2">
              {["Small", "Medium", "Large"].map((size) => (
                <button
                  key={size}
                  className={`border rounded py-1 px-2 transition duration-300 ${selectedSize === size
                    ? "bg-secondary text-primary-foreground font-semibold"
                    : "bg-gray-200 hover:bg-gray-300"
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
              className={`bg-secondary text-primary-foreground py-2 px-4 rounded transition duration-300 ${!selectedSize ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!selectedSize} // Disable button if no size selected
              onClick={handleAddToCart} // Call add to cart on button click
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>






  );
};

export default ItemDetail;
