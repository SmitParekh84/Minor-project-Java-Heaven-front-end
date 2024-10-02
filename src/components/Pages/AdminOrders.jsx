// src/AdminOrders.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false); // State for refresh indicator

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true); // Set loading to true on fetch
            try {
                const response = await axios.get('http://localhost:5000/api/admin/orders'); // Fetch all orders
                setOrders(response.data.orders);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [refreshing]); // Re-fetch orders whenever refreshing changes

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus });
            // Optimistically update the local state
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRefresh = () => {
        setRefreshing((prev) => !prev); // Toggle refreshing state to re-fetch orders
    };

    if (loading) {
        return <div className="text-center">Loading orders...</div>; // Improved loading message
    }

    if (error) {
        return <div className="text-red-500 text-center">Error: {error}</div>; // Error styling
    }

    return (
        <div className="rounded-lg p-8 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
            <div className="h-screen w-full  p-6 overflow-y-auto">
                <div className="container mx-auto max-w-7xl">
                    <h1 className="text-2xl font-bold mb-6 flex justify-between items-center">
                        Admin Dashboard - Orders
                        <button onClick={handleRefresh} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            Refresh
                        </button>
                    </h1>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order._id} className="border p-6 mb-6 rounded-lg shadow-lg bg-white">
                                <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
                                <p className="text-gray-600">Status: <span className="font-medium">{order.status}</span></p>
                                <p className="text-gray-600">Total Amount: <span className="font-medium">₹{order.totalAmount}</span></p>
                                <p className="text-gray-600">Order Date: <span className="font-medium">{new Date(order.createdAt).toLocaleString()}</span></p>

                                {/* Dropdown to change status */}
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    className="mt-2 border rounded-md p-1 bg-white"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>

                                <h3 className="text-lg font-bold mt-4">Items:</h3>
                                <ul className="list-disc pl-6">
                                    {order.items.map((item) => (
                                        <li key={item.productId} className="text-gray-700">
                                            {item.name} ({item.size}) - ₹{item.price} x {item.quantity} = ₹{item.subtotal}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-600 text-center">No orders found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
