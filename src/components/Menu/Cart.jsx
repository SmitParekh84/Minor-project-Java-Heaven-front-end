import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext"; // Adjust path if necessary
import axios from "axios"; // For API requests
import PropTypes from "prop-types"; // Import PropTypes
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const Cart = () => {
  const navigate = useNavigate()
  // State for user information
  const [userInfo, setUserInfo] = useState({
    username: "", // Autofill with username
    email: "",    // Autofill with email
    address: "",
  });

  const loggedInUser = localStorage.getItem('userInfo'); // Use the correct key
  useEffect(() => {
    // Check if user is logged in by using localStorage or authentication state
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserInfo((prev) => {
        return {
          ...prev,
          username: foundUser.username,
          email: foundUser.email,
        }
      })
    }
  }, [loggedInUser]);

  const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } = useCart();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleDecreaseQuantity = (id, size) => {
    const item = cartItems.find((item) => item.id === id && item.size === size);
    if (item.quantity > 1) {
      updateCartItemQuantity(id, size, item.quantity - 1);
    } else {
      removeFromCart(id, size);
    }
  };

  const handleIncreaseQuantity = (id, size) => {
    const item = cartItems.find((item) => item.id === id && item.size === size);
    updateCartItemQuantity(id, size, item.quantity + 1);
  };


  const [deliveryOption, setDeliveryOption] = useState("hand"); // State for delivery option


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleCheckout = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      if (!userInfo.username) {
        toast.error("User ID not found. Please log in.");
        return;
      }

      console.log("User ID:", userInfo.username);
      console.log("Cart Items:", cartItems);
      console.log("Delivery Option:", deliveryOption);

      const response = await axios.post("http://localhost:5000/api/orders", {
        userId: userInfo.username,
        cartItems, // Make sure this is structured correctly
        deliveryOption,
        address: deliveryOption === "home" ? userInfo.address : "", // Include address only for home delivery
      });

      console.log("Order response:", response.data);
      toast.success("Order placed successfully!"); // toast the user
      navigate("/my-orders"); // Redirect to home page
      clearCart(); // Clear the cart after successful order
    } catch (error) {
      console.error("Error during checkout:", error);
      toast("Checkout failed. Please try again. " + (error.response?.data?.message || ""));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="rounded-lg p-6 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
          <div className="p-8 text-center text-gray-700">
            <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>
            <p className="mt-2">
              Browse our products and add items to your cart!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg p-6 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Your Shopping Cart
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-4 bg-white shadow-lg rounded-lg"
            >
              <div>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-40 w-full object-cover mb-4 rounded-lg"
                />
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500 mt-1">
                  Price: ₹ {item.price.toFixed(2)}
                </p>
                <p className="text-gray-500 mt-1">Size: {item.size}</p>
                <p className="text-gray-700 mt-2 font-semibold">
                  Subtotal: ₹ {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecreaseQuantity(item.id, item.size)}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg"
                  >
                    -
                  </button>
                  <span className="mx-2 text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.id, item.size)}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-2xl font-bold">
            Total: ₹ {totalAmount.toFixed(2)}
          </h3>
          <button
            onClick={clearCart}
            className="bg-red-500 text-white py-2 px-6 rounded-lg mt-4 hover:bg-red-600 transition"
          >
            Clear Cart
          </button>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleCheckout} className="mt-8">
          <h3 className="text-xl font-bold mb-4">Checkout</h3>

          {/* Radio buttons for delivery option */}
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="hand"
              name="deliveryOption"
              value="hand"
              checked={deliveryOption === "hand"}
              onChange={() => setDeliveryOption("hand")}
              className="mr-2"
            />
            <label htmlFor="hand">Hand to Hand</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="home"
              name="deliveryOption"
              value="home"
              checked={deliveryOption === "home"}
              onChange={() => setDeliveryOption("home")}
              className="mr-2"
            />
            <label htmlFor="home">Home Delivery</label>
          </div>

          <input
            type="text"
            name="username"
            placeholder="Name"
            value={userInfo.username} // This should be filled with username
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full mb-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userInfo.email} // This should be filled with email
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full mb-4"
          />
          {deliveryOption === "home" && (
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={userInfo.address}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full mb-4"
            />
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

Cart.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default Cart;
