import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setUser }) { // Accept setUser as a prop
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/login", credentials);
            const sessionId = response.data.sessionId; // Assume your backend returns a session ID
            const userInfo = response.data.user; // Assuming your response contains user info

            // Store session ID and current timestamp
            localStorage.setItem("sessionId", sessionId);
            localStorage.setItem("sessionStartTime", Date.now());
            localStorage.setItem("userInfo", JSON.stringify(userInfo)); // Store user info

            // Set user state to the response user info
            setUser(userInfo); // Set the user information in the state
            console.log("User Info:", userInfo); // Log user info

            // Redirect to the profile page
            navigate("/");
        } catch (err) {
            // More robust error handling
            setError(err.response?.data?.msg || "Login failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="bg-secondary rounded-lg shadow-lg m-5 p-11 max-w-sm w-full">
                <h2 className="text-2xl text-center font-bold text-primary-foreground mb-6">
                    Login
                </h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-muted-foreground" htmlFor="username">
                            USERNAME
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter Email ID or Mobile Number *"
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
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Password *"
                            className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring focus:ring-ring"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <p className="mb-4 text-muted-foreground">
                        Don't have an account?{" "}
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
    );
}