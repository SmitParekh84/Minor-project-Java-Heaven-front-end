// src/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [bestSellingItems, setBestSellingItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dashboard');
                setTotalOrders(response.data.totalOrders);
                setTotalUsers(response.data.totalUsers);
                setTotalSales(response.data.totalSales);
                setBestSellingItems(response.data.bestSellingItems);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="rounded-lg p-6 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border p-4 rounded-lg shadow-lg bg-white">
                    <h2 className="text-xl font-semibold">Total Orders</h2>
                    <p className="text-3xl font-bold">{totalOrders}</p>
                </div>
                <div className="border p-4 rounded-lg shadow-lg bg-white">
                    <h2 className="text-xl font-semibold">Total Users</h2>
                    <p className="text-3xl font-bold">{totalUsers}</p>
                </div>
                <div className="border p-4 rounded-lg shadow-lg bg-white">
                    <h2 className="text-xl font-semibold">Total Sales</h2>
                    <p className="text-3xl font-bold">₹{totalSales}</p>
                </div>
                <div className="border p-4 rounded-lg shadow-lg bg-white">
                    <h2 className="text-xl font-semibold">Best Selling Items</h2>
                    <ul className="list-disc pl-4">
                        {bestSellingItems.map((item) => (
                            <li key={item.name} className="text-gray-700">
                                {item.name} - Sold: {item.totalSold}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
