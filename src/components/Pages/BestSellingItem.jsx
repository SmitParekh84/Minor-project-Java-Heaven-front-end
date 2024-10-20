// src/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUsers, faDollarSign, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement, // For pie chart
} from 'chart.js';
import { API_URL } from '../../config';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);


const BestSellingItem = () => {
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
                setTotalOrders(response.data.totalOrders);
                setTotalUsers(response.data.totalUsers);
                setTotalSales(response.data.totalSales);
                setBestSellingItems(response.data.bestSellingItems);

                // Line chart data
                setChartData({
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Example labels
                    datasets: [
                        {
                            label: 'Total Orders',
                            data: [65, 59, 80, 81, 56, 55, 40], // Example data points
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true,
                            tension: 0.4,
                        },
                        {
                            label: 'Total Users',
                            data: [30, 40, 45, 35, 50, 70, 80], // Example data points
                            borderColor: 'rgba(153, 102, 255, 1)',
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            fill: true,
                            tension: 0.4,
                        },
                        {
                            label: 'Total Sales',
                            data: [2000, 1900, 2200, 2100, 2400, 3000, 2800], // Example data points
                            borderColor: 'rgba(255, 159, 64, 1)',
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                });

                // Pie chart data for best-selling items
                const labels = response.data.bestSellingItems.map(item => item.name);
                const data = response.data.bestSellingItems.map(item => item.totalSold);
                setPieChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Best Selling Items',
                            data: data,
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
            <h1 className="text-2xl font-bold mb-6">Best Selling Item
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

                <div className="border p-4 rounded-lg shadow-lg bg-white flex items-center">
                    <FontAwesomeIcon icon={faChartLine} className="text-4xl mr-4 text-purple-500" />
                    <div>
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


            {/* Pie Chart Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Best Selling Items Chart</h2>
                <Pie data={pieChartData} options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Best Selling Items Distribution',
                        },
                    },
                }} />
            </div>
        </div>
    );
};

export default BestSellingItem;
