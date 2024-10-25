// src/components/Pages/RevenuePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; // Import Bar chart
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { API_URL } from '../../config'; // Adjust the path based on your config location

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenuePage = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({});

    // Function to fetch revenue data
    const fetchRevenueData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/revenue`);
            console.log("Revenue API Response:", response.data); // Log the full response

            if (response.data && response.data.status === 'success') {
                const data = response.data.data; // Accessing data correctly

                // Set total revenue
                setTotalRevenue(data.totalRevenue || 0);

                // Prepare the bar chart data
                const labels = data.revenueData?.map(item => item.month) || [];
                const revenueAmounts = data.revenueData?.map(item => item.totalSales) || [];

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

    // Enhanced Skeleton Loader
    const SkeletonLoader = () => (
        <div className="animate-pulse space-y-4">
            {/* Total Revenue Skeleton */}
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>

            {/* Bar Chart Skeleton */}
            <div className="h-48 bg-gray-300 rounded mt-6"></div>
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

    return (
        <div className="rounded-lg p-6 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
            <h1 className="text-2xl font-bold mb-6">Revenue Page</h1>
            <h2 className="text-xl font-semibold mb-4">Total Revenue: ₹{totalRevenue}</h2>

            {/* Bar Chart Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Revenue Over Time</h2>
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
                                text: 'Revenue Over Time',
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default RevenuePage;
