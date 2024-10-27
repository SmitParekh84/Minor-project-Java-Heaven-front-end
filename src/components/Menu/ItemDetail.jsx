import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";
import { API_URL } from "../../config";
import Slider from "react-slick"; // Import Slider from react-slick
import "slick-carousel/slick/slick.css"; // Import slick carousel styles
import "slick-carousel/slick/slick-theme.css"; // Import slick theme styles
import ItemCard from './ItemCard'; // Adjust the import path based on your project structure
import LoadingIndicator from './LoadingIndicator';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const ItemDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const { user } = useUser();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false); // Loading state for button
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
      }
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a cup size");
      return;
    }
    if (!user.username) {
      toast.error("Please log in to add items to your cart");
      navigate("/login");
      return;
    }

    setLoading(true); // Set loading to true when adding to cart

    try {
      await addToCart({ ...item, id: item._id, size: selectedSize });
      toast.success("Item added to cart successfully!");
    } catch (err) {
      toast.error("Failed to add item to cart.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Loading, error, or item not found states
  if (!item) return <LoadingIndicator />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="rounded-lg p-8 w-full container mx-auto max-w-7xl pt-0 sm:py-18 lg:pt-0">
      <div className="rounded-lg  w-full p-8 md:p-10 flex flex-col md:flex-row items-start ">
        <div className="flex-shrink-0">
          <ImageCarousel images={item.images || [item.imageUrl]} />
        </div>

        <div className="flex flex-col justify-between w-full md:ml-6 mt-6 md:mt-0">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 hover:text-gray-700 transition duration-300">{item.name}</h2>
            <p className="text-gray-700 mt-2 text-lg">{item.description}</p>
            <p className="text-2xl font-semibold mt-4 text-gray-900">Price: ₹ {item.price.toFixed(2)}</p>
          </div>


          <div className="flex items-center mt-6 justify-between">
            <CupSizeSelector selectedSize={selectedSize} onSizeSelect={setSelectedSize} />
            <button
              className={`bg-secondary text-white py-3 px-5 rounded-lg shadow transition duration-300 ${!selectedSize ? "opacity-50 cursor-not-allowed" : "hover:bg-secondary-dark hover:shadow-lg"}`}
              disabled={!selectedSize || loading} // Disable button if loading or no size selected
              onClick={handleAddToCart}
            >
              {loading ? "Adding... " : " Add to Cart "} {/* Change button text when loading */}
              <FontAwesomeIcon icon={faCartPlus} className="ml-2 sm:ml-3" />
            </button>
          </div>
        </div>
      </div>


      {/* Similar Items Section */}
      <div className="mt-10 w-full">
        <h3 className="text-3xl font-semibold mb-6 text-gray-900 hover:text-gray-800 transition duration-300">Similar Items</h3>
        <Slider
          slidesToShow={3} // Show 3 items at a time
          slidesToScroll={3} // Scroll 1 item at a time
          autoplay={true} // Enable autoplay if needed
          autoplaySpeed={3000} // Autoplay speed
          dots={true} // Show dots for pagination
          className="relative"
          responsive={[
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1, // Show 2 items on small screens
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2, // Show 3 items on medium and larger screens
                slidesToScroll: 2,
              },
            },
          ]}
        >
          {similarItems.map((similarItem) => (
            <div key={similarItem.id} className="p-2"> {/* Add padding around each item */}
              <ItemCard item={similarItem} className="border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" />
            </div>
          ))}
        </Slider>
      </div>

    </div>
  );
};

// Image Carousel Component
const ImageCarousel = ({ images }) => (
  <div className="flex overflow-x-auto">
    {images.map((image, index) => (
      <img key={index} src={image} alt={`Item image ${index + 1}`} className="w-48 h-48 object-cover rounded-md mx-2" />
    ))}
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
