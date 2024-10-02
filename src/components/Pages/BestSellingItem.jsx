import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BestSellingItem = () => {
    const [bestSellingItems, setBestSellingItems] = useState([]); // Change to an array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBestSellingItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/best-selling');
                setBestSellingItems(response.data); // Expecting an array now
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBestSellingItems();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="rounded-lg p-8 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
            <h1 className="text-2xl font-bold mb-6">Best Selling Items</h1>
            {bestSellingItems.length > 0 ? (
                bestSellingItems.map(item => (
                    <div key={item._id} className="border p-6 mb-6 rounded-lg shadow-lg bg-white">
                        <h2 className="text-xl font-semibold mb-2">Product Name: {item.name}</h2>
                        <p className="text-gray-600">Quantity Sold: <span className="font-medium">{item.totalSold}</span></p>
                    </div>
                ))
            ) : (
                <div className="text-gray-600">No best-selling items found.</div>
            )}
        </div>
    );
};

export default BestSellingItem;
