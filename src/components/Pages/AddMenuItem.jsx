import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faCoffee, faDollar, faImage } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../config';

// Spinner component
const Spinner = ({ message }) => (
    <div className="flex flex-col items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="mt-2 text-gray-600">{message}</p>
    </div>
);

const AddMenuItem = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [isBestseller, setIsBestseller] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);
    const [imageError, setImageError] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    // Fetch existing items from the API
    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/items`);
            setItems(response.data);
            const uniqueCategories = [...new Set(response.data.map(item => item.category))];
            setCategories(uniqueCategories);
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

    const validateImageUrl = (url) => {
        const pattern = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
        return pattern.test(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setImageError(null);

        if (price <= 0) {
            setError('Price must be a positive number');
            return;
        }

        if (imageUrl && !validateImageUrl(imageUrl)) {
            setImageError('Invalid image URL. Please enter a valid URL ending with .jpg, .jpeg, .png, .gif, .bmp, or .webp');
            return;
        }

        setLoading(true); // Start loading state
        try {
            if (editId) {
                await axios.put(`${API_URL}/api/items/${editId}`, { name, description, price, category, isBestseller, imageUrl });
                toast.success('Item updated successfully!');
            } else {
                await axios.post(`${API_URL}/api/items`, { name, description, price, category, isBestseller, imageUrl });
                toast.success('Item added successfully!');
            }
            resetForm();
            fetchItems();
        } catch (err) {
            setError(err.response?.data?.errors?.[0]?.msg || 'Error saving item');
            toast.error('Error saving item');
        } finally {
            setLoading(false); // End loading state
        }
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setIsBestseller(false);
        setImageUrl('');
        setEditId(null);
        setImageError(null);
    };

    const handleEdit = (item) => {
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price);
        setCategory(item.category);
        setIsBestseller(item.isBestseller);
        setImageUrl(item.imageUrl);
        setEditId(item._id);
        setImageError(null);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${API_URL}/api/items/${id}`);
            toast.success('Item deleted successfully!');
            fetchItems();
        } catch (err) {
            toast.error('Error deleting item');
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setNewCategory('');
            toast.success('Category added successfully!');
        } else {
            toast.error('Category already exists or is empty');
        }
    };

    const totalAmount = items.reduce((total, item) => total + Number(item.price), 0).toFixed(2);

    return (
        <div className="rounded-lg p-8 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
            <div className="rounded-lg p-6 w-full bg-white shadow-lg mt-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">{editId ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>

                {/* Loading Spinner and Text */}
                {loading ? (
                    <Spinner message="Please wait, loading..." />
                ) : (
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
                                <FontAwesomeIcon icon={faEdit} className="ml-3" />
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
                                <FontAwesomeIcon icon={faDollar} className="ml-3" />
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Price in ₹"
                                    required
                                    className="flex-grow p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200 rounded-lg"
                                />
                            </div>
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
                                <FontAwesomeIcon icon={faImage} className="ml-3" />
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="Image URL"
                                    className="flex-grow p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200 rounded-lg"
                                />
                            </div>
                            {imageError && <p className="text-red-500 mt-2">{imageError}</p>}
                            {imageUrl && (
                                <div className="col-span-2 mt-4 flex justify-center">
                                    <img
                                        src={imageUrl}
                                        alt="Preview"
                                        className="rounded-lg max-w-full h-auto"
                                    />
                                </div>
                            )}
                            <div className="col-span-2 flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    checked={isBestseller}
                                    onChange={(e) => setIsBestseller(e.target.checked)}
                                    className="mr-2"
                                />
                                <label className="text-gray-600">Bestseller</label>
                            </div>
                        </div>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        <div className="flex justify-between items-center">
                            <button
                                type="submit"
                                className="bg-secondary text-white p-3 rounded-lg flex items-center"
                            >
                                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                {editId ? 'Update Item' : 'Add Item'}
                            </button>
                            <div className="text-gray-600">Total Amount: ₹ {totalAmount}</div>
                        </div>
                    </form>
                )}
            </div>

            {/* Menu Items List */}
            <h2 className="text-2xl font-bold mb-4 text-gray-800 mt-10">Menu Items</h2>
            {loading ? (
                <Spinner message="Loading menu items..." />
            ) : (
                <ul className="space-y-4">
                    {items.map((item) => (
                        <li key={item._id} className="flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
                            <div className="flex items-center">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-16 h-16 rounded-lg mr-4"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                    <p className="text-gray-600">Price: ₹ {item.price}</p>
                                    <p className="text-gray-600">{item.isBestseller && 'Bestseller'}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => handleEdit(item)} className="text-blue-500">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(item._id)} className="text-red-500">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddMenuItem;
