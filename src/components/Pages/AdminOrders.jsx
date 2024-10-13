import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faUser, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/admin/orders');
                setOrders(response.data.orders);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [refreshing]);

    const handleStatusChange = async (orderId, newStatus) => {
        const order = orders.find(order => order._id === orderId);
        if (order.status === 'Delivered' && newStatus === 'Pending') {
            alert("Cannot change status back to 'Pending' after it has been delivered.");
            return;
        }

        try {
            await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus });
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRefresh = () => {
        setRefreshing(prev => !prev);
    };

    // Filter and sort orders
    const filteredOrders = orders.filter(order => {
        if (activeTab === 'pending') return order.status === 'Pending';
        if (activeTab === 'delivered') return order.status === 'Delivered';
        return true; // For 'all' tab
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 text-center font-bold">{`Error: ${error}`}</div>
        );
    }

    return (
        <div className="rounded-lg p-8 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
            <h1 className="text-2xl font-bold mb-6 flex justify-between items-center">
                Admin Dashboard - Orders
                <button onClick={handleRefresh} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-700">
                    <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
                    Refresh
                </button>
            </h1>

            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-4">
                {['pending', 'delivered', 'all'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-md transition duration-300 ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                    <div key={order._id} className="border p-6 mb-6 rounded-lg shadow-lg bg-white transition transform hover:shadow-2xl">
                        <h2 className="text-xl font-semibold mb-2">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Name: {order.userId}
                        </h2>
                        <p className="text-gray-600">Order ID: <span className="font-medium">{order._id}</span></p>
                        <p className="text-gray-600">Status: <span className={`font-medium ${order.status === 'Delivered' ? 'text-green-500' : order.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`}>{order.status}</span></p>
                        <p className="text-gray-600">Total Amount: <span className="font-medium">₹{order.totalAmount}</span></p>
                        <p className="text-gray-600">Order Date: <span className="font-medium">{new Date(order.createdAt).toLocaleString()}</span></p>

                        {/* Dropdown to change status */}
                        <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="mt-2 border rounded-md p-1 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Pending" disabled={order.status === 'Delivered'}>Pending</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>

                        <h3 className="text-lg font-bold mt-4">
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                            Items:
                        </h3>
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
    );
};

export default AdminOrders;
