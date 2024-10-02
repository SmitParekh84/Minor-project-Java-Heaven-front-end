import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
const AddMenuItem = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [isBestseller, setIsBestseller] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [items, setItems] = useState([]);
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch existing items from the API
    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/items');
            setItems(response.data);
        } catch (err) {
            console.error('Error fetching items:', err);
            toast.error('Error fetching items');
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // Handle form submission for adding or editing items
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        try {
            if (editId) {
                // Edit existing item
                await axios.put(`http://localhost:5000/api/items/${editId}`, {
                    name,
                    description,
                    price,
                    category,
                    isBestseller,
                    imageUrl,
                });
                toast.success('Item updated successfully!');
            } else {
                // Add new item
                await axios.post('http://localhost:5000/api/items', {
                    name,
                    description,
                    price,
                    category,
                    isBestseller,
                    imageUrl,
                });
                toast.success('Item added successfully!');
            }

            // Clear form fields and fetch updated items
            resetForm();
            fetchItems(); // Fetch items again to get the updated list
        } catch (err) {
            setError(err.response?.data?.errors?.[0]?.msg || 'Error saving item');
        }
    };

    // Function to reset form fields
    const resetForm = () => {
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setIsBestseller(false);
        setImageUrl('');
        setEditId(null);
    };

    // Set form fields for editing an existing item
    const handleEdit = (item) => {
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price);
        setCategory(item.category);
        setIsBestseller(item.isBestseller);
        setImageUrl(item.imageUrl);
        setEditId(item._id);
    };

    return (
        <div className="rounded-lg p-8 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
            <div className="rounded-lg p-6 w-full bg-white shadow-lg mt-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">{editId ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Item Name"
                            required
                            className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200"
                        />
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            required
                            className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200"
                        />
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            required
                            className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200"
                        />
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Category"
                            required
                            className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200"
                        />
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Image URL"
                            className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200"
                        />
                        <div className="col-span-2 flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={isBestseller}
                                onChange={(e) => setIsBestseller(e.target.checked)}
                                className="mr-3 rounded-lg"
                            />
                            <label className="text-gray-700">Is Bestseller</label>
                        </div>
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                    <button
                        type="submit"
                        className="mt-6 bg-secondary text-white rounded-lg py-3 px-6 hover:bg-secondary/90 transition duration-300 focus:outline-none"
                    >
                        {editId ? 'Save Changes' : 'Add Item'}
                    </button>
                </form>

                <h3 className="text-xl font-semibold mb-4 text-gray-800">Existing Menu Items</h3>
                <ul className="list-disc pl-5 space-y-3">
                    {items.map((item) => (
                        <li key={item._id} className="flex justify-between items-center border-b pb-2">
                            <div className="flex items-center">
                                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                                <span className="text-gray-700">{item.name} - {item.price} ₹</span>
                            </div>
                            <button
                                onClick={() => handleEdit(item)}
                                className="bg-secondary hover:bg-secondary/90 text-white rounded-lg py-2 px-4 transition duration-300"
                            >
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default AddMenuItem;
