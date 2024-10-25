import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext"; 
import { useUser } from "../../context/UserContext"; 
import toast from "react-hot-toast";
import { API_URL } from "../../config";

const ItemDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  const { user } = useUser(); 
  const { addToCart } = useCart(); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [similarItems, setSimilarItems] = useState([]); 

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_URL}/api/items/${id}`);
        if (!response.ok) throw new Error("Failed to fetch item");
        
        const foundItem = await response.json();
        setItem(foundItem);

        // Fetch similar items
        const similarResponse = await fetch(`${API_URL}/api/items?category=${foundItem.category}`);
        const similarItemsData = await similarResponse.json();
        setSimilarItems(similarItemsData.filter(i => i._id !== id)); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  // Loading, error, or item not found states
  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage error={error} />;
  if (!item) return <div>Item not found</div>; 

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a cup size"); 
      return;
    }
    if (!user.username) {
      toast.error("Please log in to add items to your cart");
      navigate("/login"); 
      return;
    }

    addToCart({ ...item, id: item._id, size: selectedSize, customInstructions });
    toast.success("Item added to cart successfully!");
  };

  return (
    <div className="rounded-lg p-10 w-full h-screen flex items-center justify-center">
      <div className="rounded-lg w-full p-10 flex flex-col md:flex-row items-start bg-gray-100 shadow-lg">
        <div className="flex-shrink-0">
          <ImageCarousel images={item.images || [item.imageUrl]} />
        </div>

        <div className="flex flex-col justify-between w-full md:ml-6">
          <div>
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <p className="text-lg font-semibold mt-4">Price: ₹ {item.price.toFixed(2)}</p>
          </div>

          <CupSizeSelector selectedSize={selectedSize} onSizeSelect={handleSizeSelection} />

          <textarea
            className="mt-4 p-2 border rounded w-full"
            placeholder="Add any special instructions..."
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
          />

          <div className="flex items-center mt-4">
            <button
              className={`bg-secondary text-primary-foreground py-2 px-4 rounded transition duration-300 ${!selectedSize ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!selectedSize}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <SimilarItemsSection similarItems={similarItems} />
    </div>
  );
};

// Similar Items Section
const SimilarItemsSection = ({ similarItems }) => (
  <div className="mt-10">
    <h3 className="text-lg font-semibold">Similar Items:</h3>
    <div className="flex flex-wrap mt-4">
      {similarItems.map((similarItem) => (
        <SimilarItemCard key={similarItem._id} item={similarItem} />
      ))}
    </div>
  </div>
);

// Image Carousel Component
const ImageCarousel = ({ images }) => (
  <div className="flex overflow-x-auto">
    {images.map((image, index) => (
      <img key={index} src={image} alt={`Item image ${index + 1}`} className="w-48 h-48 object-cover rounded-md mx-2" />
    ))}
  </div>
);

// Similar Item Card Component
const SimilarItemCard = ({ item }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/item/${item._id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 m-2 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleNavigate}
    >
      <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover rounded-md" />
      <h4 className="font-bold text-lg">{item.name}</h4>
      <p className="text-gray-600">₹ {item.price.toFixed(2)}</p>
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

// Cup Size Selector Component
const CupSizeSelector = ({ selectedSize, onSizeSelect }) => (
  <div className="mt-4">
    <h3 className="text-lg font-semibold">Select Cup Size:</h3>
    <div className="flex space-x-4 mt-2">
      {["Small", "Medium", "Large"].map((size) => (
        <button
          key={size}
          className={`border rounded py-1 px-2 transition duration-300 ${selectedSize === size ? "bg-secondary text-primary-foreground font-semibold" : "bg-gray-200 hover:bg-gray-300"}`}
          onClick={() => onSizeSelect(size)}
        >
          {size}
        </button>
      ))}
    </div>
  </div>
);

export default ItemDetail;
