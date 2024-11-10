import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../../context/CartContext";
import axios from "axios";
import { API_URL } from "../../config";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const OrderSuccess = () => {
    const [loading, setLoading] = useState(true);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const { search } = useLocation();
    const sessionId = new URLSearchParams(search).get("session_id");

    // Ref to prevent multiple order placement
    const hasPlacedOrderRef = useRef(false);

    useEffect(() => {
        const placeOrder = async () => {
            // If there's no sessionId or the order has already been placed, do nothing
            if (!sessionId || hasPlacedOrderRef.current) return;

            try {
                // Verify the session with Stripe
                const sessionResponse = await axios.get(`${API_URL}/api/verify-payment-session?session_id=${sessionId}`);
                const session = sessionResponse.data;

                // If payment was successful
                if (session.payment_status === "paid") {
                    // Mark that the order has been placed to prevent re-runs
                    hasPlacedOrderRef.current = true;

                    // Place the order in your backend
                    await axios.post(`${API_URL}/api/orders`, {
                        userId: session.metadata.userId,
                        cartItems: JSON.parse(session.metadata.cartItems),
                        deliveryOption: session.metadata.deliveryOption,
                        address: session.metadata.address,
                    });

                    clearCart();
                    setOrderPlaced(true);
                    toast.success("Order placed successfully!");
                } else {
                    toast.error("Payment was not completed.");
                }
            } catch (error) {
                console.error("Error verifying payment:", error);
                toast.error("Order could not be placed. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        // Only call placeOrder if sessionId is available and the order has not been placed already
        if (sessionId && !hasPlacedOrderRef.current) {
            placeOrder();
        }

    }, [sessionId, clearCart]); // `clearCart` added to dependencies to ensure consistency.

    // If loading, show loading spinner
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-700">Verifying your payment...</p>
            </div>
        );
    }

    // If order is not placed, show failure message
    if (!orderPlaced) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-semibold text-red-600">Order placement failed.</h1>
                <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    Return to Home
                </button>
            </div>
        );
    }

    // If order is successfully placed, show success message
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-green-600">Order Placed Successfully!</h1>
            <p className="text-lg text-gray-700 mt-2">Thank you for your purchase.</p>
            <button onClick={() => navigate("/")} className="mt-6 px-6 py-2 bg-blue-500 text-white rounded">
                Continue Shopping
            </button>
        </div>
    );
};

export default OrderSuccess;
