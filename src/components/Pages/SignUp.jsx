import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    mobno: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indication

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Set loading to true while processing

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false); // Reset loading on error
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/signup", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false); // Reset loading after processing
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="rounded-lg p-6 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="bg-secondary rounded-lg shadow-lg m-5 p-11 max-w-sm w-full">
            <h2 className="text-2xl text-center font-bold text-primary-foreground mb-6">
              Sign Up
            </h2>
            {error && <p className="text-red-500 mb-4" aria-live="polite">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-muted-foreground" htmlFor="username">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username *"
                  className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring focus:ring-ring"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-muted-foreground" htmlFor="mobno">
                  MOBILE NUMBER
                </label>
                <input
                  type="tel" // Changed to 'tel' for numeric input
                  id="mobno"
                  name="mobno"
                  placeholder="Enter your mobile number *"
                  className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring focus:ring-ring"
                  value={formData.mobno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-muted-foreground" htmlFor="email">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email ID *"
                  className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring focus:ring-ring"
                  value={formData.email}
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
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-muted-foreground" htmlFor="confirm-password">
                  CONFIRM PASSWORD
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  placeholder="Confirm Password *"
                  className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring focus:ring-ring"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <p className="mb-4 text-muted-foreground">
                Already have an account?{" "}
                <a href="/login" className="text-primary-foreground">
                  Login
                </a>
              </p>
              <button
                type="submit"
                className={`w-full bg-primary-foreground text-secondary hover:bg-primary-foreground/80 py-2 rounded-full font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
            <p className="mt-2 text-muted-foreground">
              Need assistance?{" "}
              <a href="/get-help" className="text-primary-foreground">
                Get Help
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
