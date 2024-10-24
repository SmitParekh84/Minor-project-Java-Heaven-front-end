import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext"; // Adjust the import path
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../config";

export default function AdminLogin() {
    const navigate = useNavigate();
    const { setUser } = useUser(); // Access setUser from UserContext
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/api/admin/login`, credentials);
            const userInfo = response.data.admin; // Admin information
            const sessionId = response.data.sessionId; // Ensure this is correctly accessed

            // Ensure userInfo and sessionId are not undefined
            if (userInfo && sessionId) {
                toast.success(response.data.msg ?? 'Admin login successful.');

                localStorage.setItem("sessionId", sessionId); // Store sessionId
                localStorage.setItem("userInfo", JSON.stringify(userInfo)); // Store user info
                localStorage.setItem("userRole", userInfo.role ?? ""); // Store user role safely

                setUser(userInfo); // Set user information in context

                navigate("/admin-dashboard"); // Redirect to admin dashboard
            } else {
                setError("Login failed. Please try again."); // Set error for UI
                toast.error("Login failed. Please try again.");
            }
        } catch (err) {
            console.error("Login error:", err); // Log the error for debugging
            setError(err.response?.data?.msg || "Admin login failed. Please try again."); // Set error for UI
            toast.error(error); // Show toast with error message
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="bg-secondary rounded-lg shadow-lg m-5 p-11 max-w-sm w-full">
                <h2 className="text-2xl text-center font-bold text-primary-foreground mb-6">
                    Admin Login
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-muted-foreground" htmlFor="username">
                            ADMIN USERNAME
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter Admin Username *"
                            className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring focus:ring-ring"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-muted-foreground" htmlFor="password">
                            PASSWORD
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"} // Toggle password visibility
                                id="password"
                                name="password"
                                placeholder="Enter Password *"
                                className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring focus:ring-ring"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)} // Toggle password visibility
                                className="absolute right-2 top-2 text-gray-500 focus:outline-none"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
                    <button
                        type="submit"
                        className="w-full bg-primary-foreground text-secondary hover:bg-primary-foreground/80 py-2 rounded-full font-semibold"
                    >
                        Admin Login
                    </button>
                </form>
            </div>
        </div>
    );
}
