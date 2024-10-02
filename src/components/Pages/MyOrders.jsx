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


        <div className="rounded-lg w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-8">My Orders</h1>
                {Array.isArray(orders) && orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order._id} className="border border-gray-200 shadow-md p-8 mb-8 rounded-xl bg-white hover:shadow-lg transition-shadow duration-300">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
                                <span className={`text-sm font-medium py-1 px-3 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-gray-500 mb-1">Total Amount: <span className="font-semibold text-gray-800">₹{order.totalAmount}</span></p>
                            <p className="text-gray-500 mb-1">Order Date: <span className="font-semibold text-gray-800">{new Date(order.createdAt).toLocaleString()}</span></p>

                            <div className="mt-4">
                                <h3 className="text-lg font-bold mb-3 text-gray-800">Items:</h3>
                                <ul className="list-inside list-disc space-y-2">
                                    {order.items.map((item) => (
                                        <li key={item._id} className="text-gray-600">
                                            {item.name} ({item.size}) - ₹{item.price} x {item.quantity} = <span className="font-semibold text-gray-800">₹{item.subtotal}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 py-20">No orders found.</div>
                )}
            </div>
        </div>


    );
};

export default MyOrders;
