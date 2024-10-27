import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext"; // Adjust the import path
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../config";

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useUser(); // Access setUser from UserContext
    const [credentials, setCredentials] = useState({
        identifier: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/api/login`, credentials);

            // Get the token and session ID from the response
            const token = response.data.token;
            const sessionId = response.data.sessionId;
            const userInfo = response.data.user;

            // Store JWT token and session ID in the respective storage
            localStorage.setItem('token', token); // Storing JWT token in localStorage
            sessionStorage.setItem('sessionId', sessionId); // Storing session ID in sessionStorage
            localStorage.setItem("sessionStartTime", Date.now()); // Store session start time
            localStorage.setItem("userInfo", JSON.stringify(userInfo)); // Store user info

            // Optionally, you can set token in headers for future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
           
            toast.success(response.data.msg ?? 'Login successful.');
            setUser(userInfo); // Set user information in context
            navigate("/"); // Redirect to home page
        } catch (err) {
            toast.error(err.response?.data?.msg || "Login failed. Please try again.");
        }
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
                            className="w-full bg-primary-foreground text-secondary hover:bg-primary-foreground/80 py-2 rounded-full font-semibold"
                        >
                            Login
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
        </div>
    );
}
