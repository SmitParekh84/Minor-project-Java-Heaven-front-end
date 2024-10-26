// src/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement, // For pie chart
    Tooltip,
    Legend,
} from 'chart.js';
import { API_URL } from '../../config';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const BestSellingItem = () => {
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [bestSellingItems, setBestSellingItems] = useState([]); // Initialize as empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pieChartData, setPieChartData] = useState({});

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/dashboard`);
                const data = response.data.data; // Assuming your response has a `data` property
                setTotalOrders(data.totalOrders || 0);
                setTotalUsers(data.totalUsers || 0);
                setTotalSales(data.totalSales || 0);
                setBestSellingItems(data.bestSellingItems || []); // Ensure it's an array

                // Pie chart data for best-selling items
                const labels = data.bestSellingItems?.map(item => item.name) || []; // Use optional chaining
                const soldData = data.bestSellingItems?.map(item => item.totalSold) || [];
                setPieChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Sold Quantity',
                            data: soldData,
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
        return <div>Error: {error}</div>;
    }

    return (
        <div className="rounded-lg p-6 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
            <h1 className="text-2xl font-bold mb-6">Top 5  Selling Items</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border p-4 rounded-lg shadow-lg bg-white flex items-center">
                    <FontAwesomeIcon icon={faChartLine} className="text-4xl mr-4 text-purple-500" />
                    <div>
                        <h2 className="text-xl font-semibold">Top 5  Selling Items</h2>
                        <ul className="list-disc pl-4">
                            {bestSellingItems.length > 0 ? (
                                bestSellingItems.map((item) => (
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

            {/* Pie Chart Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Top 5  Selling Items Chart</h2>
                <div style={{ position: 'relative', width: '100%', height: '400px' }}>
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

export default BestSellingItem;
