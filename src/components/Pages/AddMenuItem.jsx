import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faCoffee, faDollar, faImage } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../config';

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
    const [imageError, setImageError] = useState(null); // New state for image validation error

    // Fetch existing items from the API
    const fetchItems = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/items`);
            setItems(response.data);
            const uniqueCategories = [...new Set(response.data.map(item => item.category))];
            setCategories(uniqueCategories);
        } catch (err) {
            console.error('Error fetching items:', err);
            toast.error('Error fetching items');
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const validateImageUrl = (url) => {
        // Basic regex to check for common image formats
        const pattern = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
        return pattern.test(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setImageError(null); // Reset image error

        if (price < 0) {
            setError('Price cannot be negative');
            return;
        }

        if (imageUrl && !validateImageUrl(imageUrl)) {
            setImageError('Invalid image URL. Please enter a valid URL ending with .jpg, .jpeg, .png, .gif, .bmp, or .webp');
            return;
        }

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
        setImageError(null); // Reset image error on form reset
    };

    const handleEdit = (item) => {
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price);
        setCategory(item.category);
        setIsBestseller(item.isBestseller);
        setImageUrl(item.imageUrl);
        setEditId(item._id);
        setImageError(null); // Reset image error when editing an item
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/items/${id}`);
            toast.success('Item deleted successfully!');
            fetchItems();
        } catch (err) {
            toast.error('Error deleting item');
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
                        {imageError && <p className="text-red-500 mt-2">{imageError}</p>} {/* Display image error */}
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
                                className="mr-3 rounded-lg"
                            />
                            <label className="text-gray-700">Is Bestseller</label>
                        </div>
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <button
                        type="submit"
                        className="mt-6 bg-secondary text-white rounded-lg py-3 px-6 hover:bg-secondary/90 transition duration-300 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faPlus} className="ml-1" />
                        {editId ? ' Save Changes' : ' Add Item'}
                    </button>
                </form>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Current Menu Items</h3>
                <ul className="list-none">
                    {items.map((item) => (
                        <li key={item._id} className="flex justify-between items-center py-2 border-b border-gray-300">
                            <div>
                                <h4 className="text-lg font-semibold">{item.name}</h4>
                                <p>{item.description}</p>
                                <p>₹{item.price.toFixed(2)}</p> {/* Change to display in rupees */}
                                <p>Category: {item.category}</p>
                                {item.isBestseller && <span className="text-green-500">Bestseller</span>}
                            </div>
                            <div>
                                <button onClick={() => handleEdit(item)} className="mr-2 text-blue-600 hover:underline">Edit</button>
                                <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:underline">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <h4 className="mt-4 font-semibold">Total Amount: ₹{totalAmount}</h4> {/* Change to display in rupees */}
            </div>
            <div className="bg-gray-100 p-6 rounded-lg mt-6">
                <h3 className="text-xl font-semibold mb-4">Add New Category</h3>
                <form onSubmit={handleAddCategory}>
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New Category Name"
                        className="border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200"
                    />
                    <button type="submit" className="ml-3 bg-secondary text-white rounded-lg py-3 px-4 hover:bg-secondary/90 transition duration-300">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddMenuItem;
