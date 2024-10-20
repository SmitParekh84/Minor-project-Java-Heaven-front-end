import { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('myOrders'); // State to track active tab
    const loggedInUser = localStorage.getItem('userInfo'); // Use the correct key
    const [items, setItems] = useState([]);


    const fetchItems = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/items`);

            // Check if the response is an array directly
            if (Array.isArray(response.data)) {
                setItems(response.data); // Set the items directly
            } else {
                console.error('Items not found in response:', response.data);
            }
        } catch (err) {
            setError('Failed to fetch item images.');
            console.error('Error fetching items:', err); // Log the error for debugging
        }
    };
    useEffect(() => {
        // Check if user is logged in by using localStorage or authentication state
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            fetchOrders(foundUser?.username ?? '');
            fetchItems();// Fetch items on mount
            // Set up polling to refresh orders every 5 seconds
            const interval = setInterval(() => {
                fetchOrders(foundUser?.username ?? '');
            }, 5000); // 5000 milliseconds = 5 seconds

            // Clean up the interval on component unmount
            return () => clearInterval(interval);
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
    const getItemImageUrl = (itemName) => {
        if (!items || items.length === 0) return '';


        const item = items.find(i => i.name.toLowerCase() === itemName.toLowerCase());



        return item ? item.imageUrl : '';
    };



    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="rounded-lg p-6 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
                    <div className="p-8 text-center text-gray-700">
                        <h2 className="text-2xl font-semibold">Please login First</h2>
                        <p className="mt-2">Browse our products and add items to your cart!</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Filter orders based on the active tab
    const filteredOrders = orders.filter(order => {
        if (activeTab === 'pending') return order.status === 'Pending';
        if (activeTab === 'delivered') return order.status === 'Delivered';
        if (activeTab === 'cancelled') return order.status === 'Cancelled';

        return true; // For 'myOrders' tab
    });

    // Sort orders by creation date (newest first)
    filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));




    return (
        <div className="rounded-lg w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-8">My Orders</h1>

                {/* Tab Navigation */}
                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={() => setActiveTab('myOrders')}
                        className={`px-4 py-2 rounded-md ${activeTab === 'myOrders' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        My Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`px-4 py-2 rounded-md ${activeTab === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setActiveTab('delivered')}
                        className={`px-4 py-2 rounded-md ${activeTab === 'delivered' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Delivered
                    </button>
                    <button
                        onClick={() => setActiveTab('cancelled')}
                        className={`px-4 py-2 rounded-md ${activeTab === 'delivered' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Cancelled
                    </button>
                </div>

                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <div key={order._id} className="border border-gray-200 shadow-md p-8 mb-8 rounded-xl bg-white hover:shadow-lg transition-shadow duration-300">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Total Amount: ₹{order.totalAmount}</h2>
                                <span className={`text-sm font-medium py-1 px-3 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-gray-500 mb-1">Order Date:
                                <span className="font-semibold text-gray-800">
                                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })} at {new Date(order.createdAt).toLocaleTimeString('en-IN', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </p>
                            <div className="mt-4">
                                <h3 className="text-lg font-bold mb-3 text-gray-800">Items:</h3>
                                <ul className="list-inside space-y-4">
                                    {order.items.map((item) => {
                                        // Get the image URL for the current item using its name
                                        const imageUrl = getItemImageUrl(item.name);

                                        return (
                                            <li key={item._id} className="flex items-center space-x-4">
                                                <img
                                                    src={imageUrl} // Use the imageUrl fetched from getItemImageUrl
                                                    alt={item.name}
                                                    className="w-16 h-16 rounded-md object-cover"
                                                />
                                                <div>
                                                    <p className="text-gray-600">{item.name} ({item.size})</p>
                                                    <p className="text-sm text-gray-500">₹{item.price} x {item.quantity} =
                                                        <span className="font-semibold text-gray-800"> ₹{item.subtotal}</span>
                                                    </p>
                                                </div>
                                            </li>
                                        );
                                    })}
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
