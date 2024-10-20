import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faCheck, faCoffee, faDollar, faRupee, faImage } from '@fortawesome/free-solid-svg-icons';
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
    const [categories, setCategories] = useState([]); // Initially set to an empty array
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch existing items from the API
    const fetchItems = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/items`);
            setItems(response.data);
            // Extract unique categories from the fetched items
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
                await axios.post(`${API_URL}/api/items`, {
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

    // Handle category submission
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
                            <FontAwesomeIcon icon={faImage} className="ml-3" />
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="Image URL"
                                className="flex-grow p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200 rounded-lg"
                            />
                        </div>

                        {/* Image Preview Section */}
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
                    {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                    <button
                        type="submit"
                        className="mt-6 bg-secondary text-white rounded-lg py-3 px-6 hover:bg-secondary/90 transition duration-300 focus:outline-none"
                    ><FontAwesomeIcon icon={faPlus} className="ml-1" />
                        {editId ? ' Save Changes' : ' Add Item'}
                    </button>
                </form>

                {/* Category Addition Form */}
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Category</h3>
                <form onSubmit={handleAddCategory} className="mb-6">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="New Category Name"
                            required
                            className="flex-grow p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200 rounded-lg"
                        />
                        <button
                            type="submit"
                            className="ml-3 bg-secondary text-white rounded-lg py-2 px-4 hover:bg-secondary/90 transition duration-300 flex items-center"
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-1" /> Add
                        </button>
                    </div>
                </form>

                <h3 className="text-xl font-semibold mb-4 text-gray-800">Existing Menu Items</h3>
                <ul className="list-disc pl-5 space-y-3">
                    {items.map((item) => (
                        <li key={item._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                            <div className="flex items-center">
                                {/* Display the image if it exists */}
                                {item.imageUrl && (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg mr-4"
                                    />
                                )}
                                <div>
                                    <h4 className="font-bold">{item.name}</h4>
                                    <p>{item.description}</p>
                                    <p className="text-gray-600">Price: ${item.price}</p>
                                    <p className="text-gray-600">Category: {item.category}</p>
                                    <p className="text-gray-600">{item.isBestseller ? 'Bestseller' : ''}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="text-blue-500 hover:underline"
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="text-red-500 hover:underline"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>


                <div className="mt-6">
                    <h4 className="font-semibold">Total Amount: ${totalAmount}</h4>
                </div>
            </div>
        </div>

    );
};

export default AddMenuItem;
