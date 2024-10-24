import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios"; // Import axios for API requests
import { API_URL } from "../../config";

export default function SignUp() {
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    username: "",
    mobno: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Optional: Basic mobile number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.mobno)) {
      setError("Invalid mobile number");
      return;
    }

    setLoading(true); // Start loading
    try {
      await axios.post(`${API_URL}/api/signup`, formData); // Adjust API endpoint as necessary
      navigate("/login"); // Redirect to login page
    } catch (err) {
      setError(err.response?.data.msg || "Registration failed");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="rounded-lg p-6 w-full container mx-auto max-w-lg pt-20 sm:py-18 lg:pt-16">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-secondary rounded-lg shadow-xl m-5 p-8 max-w-sm w-full transition-transform transform ">
          <h2 className="text-3xl text-center font-bold text-primary-foreground mb-6">Sign Up</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>} {/* Display error message */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-muted-foreground font-semibold mb-1" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username" // Set name for form handling
                placeholder="Enter your username *"
                className="mt-1 block w-full border border-border rounded-md p-3 focus:outline-none focus:ring focus:ring-primary-foreground transition-all duration-200"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-muted-foreground font-semibold mb-1" htmlFor="mobno">
                Mobile Number
              </label>
              <input
                type="tel" // Change input type for better mobile keyboard
                id="mobno"
                name="mobno"
                placeholder="Enter your mobile number *"
                className="mt-1 block w-full border border-border rounded-md p-3 focus:outline-none focus:ring focus:ring-primary-foreground transition-all duration-200"
                value={formData.mobno}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-muted-foreground font-semibold mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email ID *"
                className="mt-1 block w-full border border-border rounded-md p-3 focus:outline-none focus:ring focus:ring-primary-foreground transition-all duration-200"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-muted-foreground font-semibold mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password *"
                className="mt-1 block w-full border border-border rounded-md p-3 focus:outline-none focus:ring focus:ring-primary-foreground transition-all duration-200"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-muted-foreground font-semibold mb-1" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword" // Change name to match state
                placeholder="Confirm Password *"
                className="mt-1 block w-full border border-border rounded-md p-3 focus:outline-none focus:ring focus:ring-primary-foreground transition-all duration-200"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <p className="mb-4 text-muted-foreground text-center">
              Already have an account?{" "}
              <a href="/login" className="text-primary-foreground font-semibold">
                Login
              </a>
            </p>
            <button
              type="submit"
              className="w-full bg-primary-foreground text-secondary hover:bg-primary-foreground/80 py-2 rounded-full font-semibold transition-all duration-200"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-4 text-muted-foreground text-center">
            Need assistance?{" "}
            <a href="/get-help" className="text-primary-foreground font-semibold">
              Get Help
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
