import React from "react"
import { useCart } from "../../context/CartContext" // Adjust path if necessary

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

  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center text-gray-700">
        <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>
        <p className="mt-2">Browse our products and add items to your cart!</p>
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
            <button className="ml-4 bg-green-500 text-white py-2 px-6 rounded-lg mt-4 hover:bg-green-600 transition">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
