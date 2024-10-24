import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../config';

const AdminEdit = () => {
    const [admins, setAdmins] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobno, setMobno] = useState('');
    const [editingAdminId, setEditingAdminId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/admin/list`);
                setAdmins(response.data.admins);
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        };

        fetchAdmins();
    }, []);

    const handleEdit = (admin) => {
        setEditingAdminId(admin._id);
        setUsername(admin.username);
        setEmail(admin.email);
        setMobno(admin.mobno);
        setPassword(''); // Clear password for editing
    };

    const handleDelete = async (adminId) => {
        try {
            await axios.delete(`${API_URL}/api/admin/delete/${adminId}`);
            setAdmins(prevAdmins => prevAdmins.filter(admin => admin._id !== adminId));
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.msg || "Error deleting admin");
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            if (editingAdminId) {
                await axios.put(`${API_URL}/api/admin/edit/${editingAdminId}`, {
                    username,
                    email,
                    mobno,
                    password,
                });
                setEditingAdminId(null); // Reset editing state
            } else {
                await axios.post(`${API_URL}/api/admin/add`, {
                    username,
                    password,
                    mobno,
                    email,
                });
            }
            // Reset fields
            setUsername('');
            setEmail('');
            setMobno('');
            setPassword('');
            // Optionally fetch updated admin list
            const response = await axios.get(`${API_URL}/api/admin/list`);
            setAdmins(response.data.admins);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.msg || "Error saving admin");
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="rounded-lg p-6 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
            <div className="rounded-lg p-6 w-full bg-white shadow-md mt-6">
                <h2 className="text-xl font-semibold mb-4">{editingAdminId ? 'Edit Admin' : 'Add New Admin'}</h2>
                <form onSubmit={handleSave} className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="border border-gray-300 rounded-lg p-2"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="border border-gray-300 rounded-lg p-2"
                        />
                        <input
                            type="text"
                            value={mobno}
                            onChange={(e) => setMobno(e.target.value)}
                            placeholder="Mobile No."
                            required
                            className="border border-gray-300 rounded-lg p-2"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password (leave blank to keep unchanged)"
                            className="border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-4 ${loading ? 'bg-gray-400' : 'bg-secondary'} text-white rounded-lg py-2 px-4 hover:brightness-150 transition duration-300 flex items-center`}
                    >
                        {loading ? <div className="loader">Loading...</div> : <FontAwesomeIcon icon={faPlus} className="mr-2" />}
                        {editingAdminId ? 'Save Changes' : 'Add Admin'}
                    </button>
                </form>
                <h2 className="text-xl font-semibold mb-4">Admin List</h2>
                {admins.length === 0 ? (
                    <p>No admins found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {admins.map((admin) => (
                            <div key={admin._id} className="border p-4 rounded-lg shadow-lg bg-gray-50 hover:bg-gray-100 transition duration-300">
                                <h3 className="font-bold">{admin.username}</h3>
                                <p className="text-gray-600">{admin.email}</p>
                                <p className="text-gray-600">{admin.mobno}</p>
                                <div className="flex space-x-2 mt-2">
                                    <button
                                        className="bg-secondary text-white rounded-lg py-1 px-2 hover:brightness-150 transition duration-300"
                                        onClick={() => handleEdit(admin)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-600 text-white rounded-lg py-1 px-2 hover:bg-red-700 transition duration-300"
                                        onClick={() => handleDelete(admin._id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="mr-1" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminEdit;
