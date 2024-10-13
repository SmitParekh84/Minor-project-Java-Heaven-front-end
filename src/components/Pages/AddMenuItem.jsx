import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faCheck, faCoffee } from '@fortawesome/free-solid-svg-icons';

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

    // Replace with your categories
    const categories = ['Drinks', 'Food', 'Coffee At Home'];

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

    // Handle deletion of an item
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/items/${id}`);
            toast.success('Item deleted successfully!');
            fetchItems(); // Fetch items again to get the updated list
        } catch (err) {
            toast.error('Error deleting item');
        }
    };

    // Calculate total amount of all items
    const totalAmount = items.reduce((total, item) => total + Number(item.price), 0).toFixed(2);

    return (
        <div className="rounded-lg p-8 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
            <div className="rounded-lg p-6 w-full bg-white shadow-lg mt-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">{editId ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <FontAwesomeIcon icon={faCoffee} className="ml-3" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Item Name"
                                required
                                className="flex-grow p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200 rounded-lg"
                            />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <FontAwesomeIcon icon={faCheck} className="ml-3" />
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                required
                                className="flex-grow p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200 rounded-lg"
                            />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <FontAwesomeIcon icon={faCheck} className="ml-3" />
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price"
                                required
                                className="flex-grow p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200 rounded-lg"
                            />
                        </div>
                        {/* Category dropdown */}
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200"
                        >
                            <option value="" disabled>Select Category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <FontAwesomeIcon icon={faCheck} className="ml-3" />
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="Image URL"
                                className="flex-grow p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200 rounded-lg"
                            />
                        </div>
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
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="bg-secondary hover:bg-secondary/90 text-white rounded-lg py-2 px-4 transition duration-300 flex items-center"
                                >
                                    <FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 px-4 transition duration-300 flex items-center"
                                >
                                    <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Display total amount */}
                <h4 className="mt-4 text-lg font-semibold text-gray-800">Total Amount: {totalAmount} ₹</h4>
            </div>
        </div>
    );
};

export default AddMenuItem;
