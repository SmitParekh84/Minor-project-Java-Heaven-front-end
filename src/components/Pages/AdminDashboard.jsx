import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUsers, faDollarSign, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Bar, Pie } from 'react-chartjs-2';
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
                    const data = response.data.data;

                    setTotalOrders(data.totalOrders || 0);
                    setTotalUsers(data.totalUsers || 0);
                    setTotalSales(data.totalSales || 0);
                    setBestSellingItems(data.bestSellingItems || []);

                    console.log('Setting State:', {
                        totalOrders: data.totalOrders,
                        totalUsers: data.totalUsers,
                        totalSales: data.totalSales,
                        bestSellingItems: data.bestSellingItems,
                    });

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

                    setChartData({
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                        datasets: [
                            {
                                label: 'Total Orders',
                                data: [65, 59, 80, 81, 56, 55, 40],
                                backgroundColor: 'rgba(75, 192, 192, 1)',
                            },
                            {
                                label: 'Total Users',
                                data: [30, 40, 45, 35, 50, 70, 80],
                                backgroundColor: 'rgba(153, 102, 255, 1)',
                            },
                            {
                                label: 'Total Sales',
                                data: [2000, 1900, 2200, 2100, 2400, 3000, 2800],
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

    const SkeletonLoader = () => (
        <div className="rounded-lg p-6 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
            <h1 className="text-2xl font-bold mb-6 h-8 bg-gray-300 rounded w-1/4 animate-pulse"></h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="border p-4 rounded-lg shadow-lg bg-white flex items-center animate-pulse">
                        <div className="h-16 w-16 bg-gray-300 rounded-full mr-4"></div>
                        <div className="flex flex-col justify-between w-full">
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="h-8 bg-gray-300 rounded w-full"></div>
                        </div>
                    </div>
                ))}
            </div>
    
            {/* Bar Chart Skeleton */}
            <div className="mt-6 animate-pulse">
                <h2 className="text-xl font-semibold mb-4 h-6 bg-gray-300 rounded w-1/3"></h2>
                <div className="h-60 bg-gray-300 rounded"></div>
            </div>
    
            {/* Pie Chart Skeleton */}
            <div className="mt-6 animate-pulse">
                <h2 className="text-xl font-semibold mb-4 h-6 bg-gray-300 rounded w-1/3"></h2>
                <div className="h-60 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
    

    
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen flex-col">
                <div
                    className="animate-spin h-12 w-12 border-4 border-brown-500 border-t-transparent rounded-full"
                    style={{ borderColor: '#8B4513', borderTopColor: 'transparent' }} // Set the desired brown color
                ></div>
                <span className="mt-4 text-lg">Loading...</span>
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
                            maintainAspectRatio: false,
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
