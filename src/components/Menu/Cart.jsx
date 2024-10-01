import React, { useState } from "react" // Import useState for form handling
import { useCart } from "../../context/CartContext" // Adjust path if necessary
import axios from "axios" // For API requests

const Cart = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } =
    useCart()

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const handleDecreaseQuantity = (id, size) => {
    const item = cartItems.find((item) => item.id === id && item.size === size)
    if (item.quantity > 1) {
      updateCartItemQuantity(id, size, item.quantity - 1)
    } else {
      removeFromCart(id, size)
    }
  }

  const handleIncreaseQuantity = (id, size) => {
    const item = cartItems.find((item) => item.id === id && item.size === size)
    updateCartItemQuantity(id, size, item.quantity + 1)
  }

  // State for user information
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckout = async () => {
    try {
      const userId = "YOUR_USER_ID" // Ensure this is defined correctly
      console.log("User ID:", userId)
      console.log("Cart Items:", cartItems)

      const response = await axios.post("http://localhost:5000/api/orders", {
        userId,
        cartItems, // Make sure this is structured correctly
      })

      console.log("Order response:", response.data)
    } catch (error) {
      console.error("Error during checkout:", error)
      alert("Checkout failed. Please try again.")
    }
  }

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
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
                    src={item.image}
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
                    <span className="mx-2 text-lg font-semibold">
                      {item.quantity}
                    </span>
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
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={userInfo.name}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 mb-2 w-full rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 mb-2 w-full rounded"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={userInfo.address}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 mb-2 w-full rounded"
            />
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded-lg mt-4 hover:bg-green-600 transition"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Cart
