// src/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUsers, faDollarSign, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Bar, Pie } from 'react-chartjs-2'; // Change Line to Bar
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { API_URL } from '../../config';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [bestSellingItems, setBestSellingItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({});
    const [pieChartData, setPieChartData] = useState({});

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/dashboard`);
                console.log("API Response:", response.data); // Log the full response

                if (response.data && response.data.status === 'success') {
                    const data = response.data.data; // Accessing data correctly

                    // Update state with the correct data
                    setTotalOrders(data.totalOrders || 0);
                    setTotalUsers(data.totalUsers || 0);
                    setTotalSales(data.totalSales || 0);
                    setBestSellingItems(data.bestSellingItems || []); // Ensure it's an array

                    // Log state updates
                    console.log('Setting State:', {
                        totalOrders: data.totalOrders,
                        totalUsers: data.totalUsers,
                        totalSales: data.totalSales,
                        bestSellingItems: data.bestSellingItems,
                    });

                    // Prepare the pie chart data
                    const labels = data.bestSellingItems?.map(item => item.name) || [];
                    const pieData = data.bestSellingItems?.map(item => item.totalSold) || [];
                    setPieChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Best Selling Items',
                                data: pieData,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.6)',
                                    'rgba(54, 162, 235, 0.6)',
                                    'rgba(255, 206, 86, 0.6)',
                                    'rgba(75, 192, 192, 0.6)',
                                    'rgba(153, 102, 255, 0.6)',
                                ],
                            },
                        ],
                    });

                    // Prepare the bar chart data
                    setChartData({
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Example labels
                        datasets: [
                            {
                                label: 'Total Orders',
                                data: [65, 59, 80, 81, 56, 55, 40], // Example data points
                                backgroundColor: 'rgba(75, 192, 192, 1)',
                            },
                            {
                                label: 'Total Users',
                                data: [30, 40, 45, 35, 50, 70, 80], // Example data points
                                backgroundColor: 'rgba(153, 102, 255, 1)',
                            },
                            {
                                label: 'Total Sales',
                                data: [2000, 1900, 2200, 2100, 2400, 3000, 2800], // Example data points
                                backgroundColor: 'rgba(255, 159, 64, 1)',
                            },
                        ],
                    });
                }
            } catch (err) {
                setError(err.message);
                console.error("Error fetching dashboard data: ", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        fetchDashboardData(); // Retry fetching data
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 text-center font-bold">
                {`Error: ${error}`}
                <button onClick={handleRetry} className="ml-4 text-blue-600 underline">Retry</button>
            </div>
        );
    }

    // Log the rendering values
    console.log('Rendering:', {
        totalOrders,
        totalUsers,
        totalSales,
        bestSellingItems,
    });

    return (
        <div className="rounded-lg p-6 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border p-4 rounded-lg shadow-lg bg-white flex items-center">
                    <FontAwesomeIcon icon={faShoppingCart} className="text-4xl mr-4 text-blue-500" />
                    <div>
                        <h2 className="text-xl font-semibold">Total Orders</h2>
                        <p className="text-3xl font-bold">{totalOrders}</p>
                    </div>
                </div>
                <div className="border p-4 rounded-lg shadow-lg bg-white flex items-center">
                    <FontAwesomeIcon icon={faUsers} className="text-4xl mr-4 text-green-500" />
                    <div>
                        <h2 className="text-xl font-semibold">Total Users</h2>
                        <p className="text-3xl font-bold">{totalUsers}</p>
                    </div>
                </div>
                <div className="border p-4 rounded-lg shadow-lg bg-white flex items-center">
                    <FontAwesomeIcon icon={faDollarSign} className="text-4xl mr-4 text-yellow-500" />
                    <div>
                        <h2 className="text-xl font-semibold">Total Sales</h2>
                        <p className="text-3xl font-bold">₹{totalSales}</p>
                    </div>
                </div>
                <div className="border p-4 rounded-lg shadow-lg bg-white flex items-center">
                    <FontAwesomeIcon icon={faChartLine} className="text-4xl mr-4 text-purple-500" />
                    <div>
                        <h2 className="text-xl font-semibold">Best Selling Items</h2>
                        <ul className="list-disc pl-4">
                            {bestSellingItems.length > 0 ? (
                                bestSellingItems.map(item => (
                                    <li key={item.name} className="text-gray-700">
                                        {item.name} - Sold: {item.totalSold}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-700">No best selling items found.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bar Chart Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Overview</h2>
                <Bar 
                    data={chartData} 
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Total Overview',
                            },
                        },
                    }} 
                />
            </div>

            {/* Pie Chart Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Best Selling Items Chart</h2>
                <div className="relative" style={{ width: '100%', height: '400px' }}>
                    <Pie 
                        data={pieChartData} 
                        options={{
                            responsive: true,
                            maintainAspectRatio: false, // Allows the chart to resize based on parent dimensions
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Best Selling Items Distribution',
                                },
                            },
                        }} 
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
