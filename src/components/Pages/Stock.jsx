import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL } from '../../config';

// Spinner component with a better design
const Spinner = ({ message }) => (
    <div className="flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full"></div>
        <p className="text-lg text-gray-600">{message}</p>
    </div>
);

const StockManagement = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newStock, setNewStock] = useState('');
    const [editId, setEditId] = useState(null);

    // Fetch existing items from the API
    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/items`);
            setItems(response.data);
        } catch (err) {
            console.error('Error fetching items:', err);
            toast.error('Error fetching items');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleUpdateStock = async (e, id) => {
        e.preventDefault();
        setError(null);

        if (newStock <= 0 || isNaN(newStock)) {
            setError('Stock must be a positive number');
            return;
        }

        setLoading(true);
        try {
            await axios.put(`${API_URL}/api/stock/update-stock/${id}`, { stock: newStock });
            toast.success('Stock updated successfully!');
            fetchItems();
            resetForm();
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating stock');
            toast.error('Error updating stock');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setNewStock('');
        setEditId(null);
    };

    const handleEdit = (item) => {
        setNewStock(item.stock);
        setEditId(item._id);
    };

    return (
        <div className="rounded-lg p-8 w-full mt-10 container mx-auto max-w-7xl pt-0 sm:py-18 lg:pt-0">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Stock Management</h1>

            {loading ? (
                <Spinner message="Loading items..." />
            ) : (
                <div>
                    <table className="table-auto w-full border-collapse mb-6">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="border px-6 py-3 text-left">Item Image</th>
                                <th className="border px-6 py-3 text-left">Item Name</th>
                                <th className="border px-6 py-3 text-left">Stock</th>
                                <th className="border px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50 transition-all">
                                    <td className="border px-6 py-4">
                                        <img
                                            src={item.imageUrl} // Assuming imageUrl is part of your item object
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="border px-6 py-4">{item.name}</td>
                                    <td className="border px-6 py-4">
                                        {editId === item._id ? (
                                            <input
                                                type="number"
                                                value={newStock}
                                                onChange={(e) => setNewStock(e.target.value)}
                                                className="border border-gray-300 rounded-lg p-2 w-full"
                                            />
                                        ) : (
                                            item.stock
                                        )}
                                    </td>
                                    <td className="border px-6 py-4 space-x-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="bg-secondary text-white p-2 px-6 rounded-full hover:bg-secondary-light transition-colors duration-200 ease-in-out flex items-center justify-center"
                                        >
                                            {editId === item._id ? (
                                                // Save button with distinct appearance
                                                <button
                                                    onClick={(e) => handleUpdateStock(e, item._id)}
                                                    className=" text-primary-foreground p-2 px-6  rounded-full font-semibold hover:bg-secondary-light transition-colors duration-200 ease-in-out"
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                // Edit button with a more subtle design
                                                'Edit'
                                            )}
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default StockManagement;
