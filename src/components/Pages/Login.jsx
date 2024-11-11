import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext"; // Adjust the import path
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../config";
import { useCart } from "../../context/CartContext";

export default function Login() {
    const navigate = useNavigate();
    const { setCartItems } = useCart(); // Access setCartItems from CartContext
    const { setUser } = useUser(); // Access setUser from UserContext
    const [loading, setLoading] = useState(false); // New loading state

    const [credentials, setCredentials] = useState({
        identifier: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const [sessionConflict, setSessionConflict] = useState(false); // State to check if session conflict exists
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };
    const parseJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join(''));
            return JSON.parse(jsonPayload);
        } catch (error) {
            return null;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when submitting
        try {
            const response = await axios.post(`${API_URL}/api/login`, credentials);

            const { token, sessionId, userId, user, conflict } = response.data;
            if (conflict) {
                // If conflict exists, show the modal to the user
                setSessionConflict(true);
                setShowModal(true);
                return;
            }

            // Log values before storing them
            console.log('Login response:', response.data);

            // Save necessary data in sessionStorage and localStorage
            localStorage.setItem('token', token);
            sessionStorage.setItem('sessionId', sessionId);
            sessionStorage.setItem('userId', userId);
            localStorage.setItem("userInfo", token);
            // console.log("User Info:", user);
            // const storedUserInfo = localStorage.getItem("userInfo");
            // const parsedUserInfo = JSON.parse(storedUserInfo);
            // const uId = parsedUserInfo._id;
            // setUser(user);
            // new code
            const userInfoString = JSON.stringify(user);
            // const storedUserInfo = localStorage.getItem("userInfo");
            // Parse the string to access the properties
            const parsedUserInfo = JSON.parse(userInfoString);
            // const decodedToken = parseJwt(storedUserInfo);
            // const userInfoString = JSON.stringify(decodedToken);
            // console.log("User userInfoString:", userInfoString);

            // // console.log("User userInfoString:", userInfoString);
            // const parsedUserInfo = JSON.parse(userInfoString);
            // console.log("Parsed User Info:", parsedUserInfo);
            const uId = parsedUserInfo._id;
            setUser(user);
            // console.log("Parsed User Info:", parsedUserInfo);


            // console.log("User ID:", uId);

            const cartResponse = await fetch(`${API_URL}/api/users/cart/${uId}`);
            const cartData = await cartResponse.json(); // Parse the response to JSON
            // console.log('Cart data:', cartData);
            setCartItems(cartData?.cart)
            // Create and store the cart token
            const cartToken = btoa(JSON.stringify(cartData)); // Generate the cart token
            localStorage.setItem('carttoken', cartToken); // Store it in localStorage

            toast.success(response.data.msg ?? 'Login successful.');

            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.msg || "Login failed. Please try again.");
        } finally {
            setLoading(false); // Set loading to false after request completes
        }
    };
    // // Function to create a cart token by encoding the cart items to a base64 string
    // const createCartToken = (items) => {
    //     return btoa(JSON.stringify({ cartItems: items })); // Convert items to JSON and then to Base64
    // };
    const handleLogoutOtherSessions = async () => {
        try {
            // Get the userId from session storage
            const response1 = await axios.post(`${API_URL}/api/login`, credentials);
            const { userId } = response1.data;

            // const { userId } = response1.data;
            if (!userId) {
                toast.error("User ID is not available. Please log in again.");
                return; // Exit if userId is not found
            }

            // Send request to logout other sessions
            const response = await axios.post(`${API_URL}/api/logout-other-sessions`, { userId });

            // Handle response
            if (response.data.success) {
                setShowModal(false); // Close any modal if applicable
                toast.success("Logged out from other sessions. Please log in again.");
                // If necessary, you can call a function to refresh the session or redirect
                navigate("/login"); // Or wherever you want to redirect after logging out
            } else {
                toast.error("Failed to log out from other sessions. Please try again.");
            }
        } catch (err) {
            // Log error for debugging purposes
            console.error("Error logging out from other sessions:", err);
            toast.error("An error occurred. Please try again.");
        }
    };



    const handleCancel = () => {
        setShowModal(false);
        toast("Cancelled login.");
    };

    return (
        <div className="container mx-auto max-w-7xl pt-6 sm:py-18 lg:pt-6 min-h-screen ">
            <div className="flex items-center justify-center bg-background">
                <div className="bg-secondary rounded-lg shadow-lg m-5 p-11 max-w-sm w-full">
                    <h2 className="text-2xl text-center font-bold text-primary-foreground mb-6">
                        Login
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-muted-foreground" htmlFor="username">
                                Email
                            </label>
                            <input
                                type="text"
                                id="identifier"
                                name="identifier"
                                placeholder="Enter Email ID or Mobile Number *"
                                className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring focus:ring-ring"
                                value={credentials.identifier}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4 relative"> {/* Added relative positioning */}
                            <label className="block text-muted-foreground" htmlFor="password">
                                Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"} // Toggle input type
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
                                className="absolute right-2 top-9 text-secondary hover:brightness-150"
                                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                        <p className="mb-4 text-muted-foreground">
                            Don&apos;t have an account?{" "}
                            <a href="/sign-up" className="text-primary-foreground">
                                Sign Up
                            </a>
                        </p>
                        <button
                            type="submit"
                            className={`w-full bg-primary-foreground text-secondary hover:bg-primary-foreground/80 py-2 rounded-full font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading} // Disable button based on loading state
                        >
                            {loading ? "Logging in..." : "Login"} {/* Conditional button text */}
                        </button>
                    </form>

                    <p className="mt-2 text-muted-foreground">
                        Facing trouble logging in?{" "}
                        <a href="/get-help" className="text-primary-foreground">
                            Get Help
                        </a>
                    </p>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Session Conflict</h2>
                        <p className="mb-6">
                            You are already logged in from another device or session. Would
                            you like to log out from the other session and continue?
                        </p>
                        <div className="flex justify-between">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                                onClick={handleLogoutOtherSessions}
                            >
                                Log Out Other Session
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
