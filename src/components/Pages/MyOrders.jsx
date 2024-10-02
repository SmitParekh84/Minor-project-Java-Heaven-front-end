import { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loggedInUser = localStorage.getItem('userInfo'); // Use the correct key
    useEffect(() => {
        // Check if user is logged in by using localStorage or authentication state
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            fetchOrders(foundUser?.username ?? '')
        }
    }, [loggedInUser]);

    const fetchOrders = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/orders/${userId}`);
            setOrders(response.data.orders);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex flex-col items-center justify-center h-screen">
            <div className="rounded-lg p-6 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
                <div className="p-8 text-center text-gray-700">
                    <h2 className="text-2xl font-semibold">Please login First</h2>
                    <p className="mt-2">
                        Browse our products and add items to your cart!
                    </p>
                </div>
            </div>
        </div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (orders?.length === 0) {
        return <div>No orders found.</div>;
    }

    return (


        <div className="rounded-lg p-6 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">My Orders</h1>
                {Array.isArray(orders) && orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order._id} className="border p-6 mb-6 rounded-lg shadow-lg bg-white">
                            <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
                            <p className="text-gray-600">Status: <span className="font-medium">{order.status}</span></p>
                            <p className="text-gray-600">Total Amount: <span className="font-medium">₹{order.totalAmount}</span></p>
                            <p className="text-gray-600">Order Date: <span className="font-medium">{new Date(order.createdAt).toLocaleString()}</span></p>

                            <h3 className="text-lg font-bold mt-4">Items:</h3>
                            <ul className="list-disc pl-6">
                                {order.items.map((item) => (
                                    <li key={item._id} className="text-gray-700">
                                        {item.name} ({item.size}) - ₹{item.price} x {item.quantity} = ₹{item.subtotal}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <div>No orders found.</div>
                )}
            </div>
        </div>

    );
};

export default MyOrders;
