// src/components/Pages/RevenuePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { API_URL } from '../../config';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenuePage = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({});

    // Function to fetch revenue data from dashboard endpoint
    const fetchRevenueData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/dashboard`);
            console.log("Dashboard API Response:", response.data); // Log the full response

            if (response.data && response.data.status === 'success') {
                const data = response.data.data;

                // Set total revenue from the dashboard
                setTotalRevenue(data.totalSales || 0);

                // Prepare the bar chart data based on monthly data
                const labels = data.monthlyData?.map(item => item.month) || [];
                const revenueAmounts = data.monthlyData?.map(item => item.totalSales) || [];

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Revenue Over Time',
                            data: revenueAmounts,
                            backgroundColor: 'rgba(75, 192, 192, 1)',
                        },
                    ],
                });
            }
        } catch (err) {
            setError(err.message);
            console.error("Error fetching revenue data: ", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRevenueData(); // Fetch data on component mount
    }, []);

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        fetchRevenueData(); // Retry fetching data
    };

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

    return (
        <div className="rounded-lg  p-8 w-full mt-10 container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16 ">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Revenue Page</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Total Revenue: <span className="text-green-600">₹{totalRevenue}</span></h2>

            {/* Bar Chart Section */}
            <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Revenue Over Time</h2>
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                    color: 'gray',
                                },
                            },
                            title: {
                                display: true,
                                text: 'Revenue Over Time',
                                color: 'gray',
                                font: {
                                    size: 20,
                                },
                            },
                        },
                        scales: {
                            x: {
                                grid: {
                                    color: '#e5e7eb', // Light gray for grid lines
                                },
                            },
                            y: {
                                grid: {
                                    color: '#e5e7eb', // Light gray for grid lines
                                },
                                ticks: {
                                    color: 'gray',
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>

    );
};

export default RevenuePage;
