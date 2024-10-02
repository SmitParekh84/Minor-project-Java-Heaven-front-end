import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditMenuItem = () => {
    const { id } = useParams(); // Get the item ID from the URL parameters
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [isBestseller, setIsBestseller] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch the item details when the component mounts
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/items/${id}`);
                const item = response.data;
                setName(item.name);
                setDescription(item.description);
                setPrice(item.price);
                setCategory(item.category);
                setIsBestseller(item.isBestseller);
                setImageUrl(item.imageUrl);
            } catch (err) {
                setError('Error fetching item details');
            }
        };

        fetchItem();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        try {
            const response = await axios.put(`http://localhost:5000/api/items/${id}`, {
                name,
                description,
                price,
                category,
                isBestseller,
                imageUrl,
            });
            setSuccessMessage('Item updated successfully!');
        } catch (err) {
            setError(err.response?.data?.errors?.[0]?.msg || 'Error updating item');
        }
    };

    return (
        <div className="rounded-lg p-6 w-full bg-white shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4">Edit Menu Item</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Item Name"
                        required
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        required
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                        required
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Category"
                        required
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Image URL"
                        required
                        className="border border-gray-300 rounded-lg p-2"
                    />
                    <div className="col-span-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isBestseller}
                                onChange={(e) => setIsBestseller(e.target.checked)}
                                className="mr-2"
                            />
                            Is Bestseller
                        </label>
                    </div>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                <button
                    type="submit"
                    className="mt-4 bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition duration-300"
                >
                    Update Item
                </button>
            </form>
        </div>
    );
};

export default EditMenuItem;
