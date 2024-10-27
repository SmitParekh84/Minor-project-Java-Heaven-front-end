import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    mobno: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" }); // Clear error message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validations
    let newErrors = {};
    if (formData.username.length < 3) newErrors.username = "Username must be at least 3 characters";
    if (formData.mobno.length !== 10 || !/^[0-9]+$/.test(formData.mobno)) newErrors.mobno = "Mobile number must be 10 digits";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email address";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    // Set any new errors
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/signup`, formData);
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 409) {
        setError({ server: "User already exists" });
      } else {
        setError({ server: err.response?.data.message || "Registration failed" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg p-6 w-full container mx-auto max-w-lg pt-20">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-secondary rounded-lg shadow-xl m-5 p-8 max-w-sm w-full">
          <h2 className="text-3xl text-center font-bold text-primary-foreground mb-6">Sign Up</h2>
          {error.server && <p className="text-red-500 mb-4 text-center">{error.server}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-muted-foreground font-semibold mb-1" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username *"
                className="mt-1 block w-full border border-border rounded-md p-3"
                value={formData.username}
                onChange={handleChange}
                required
              />
              {error.username && <p className="text-red-500 text-sm mt-1">{error.username}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-muted-foreground font-semibold mb-1" htmlFor="mobno">Mobile Number</label>
              <input
                type="tel"
                id="mobno"
                name="mobno"
                placeholder="Enter your mobile number *"
                className="mt-1 block w-full border border-border rounded-md p-3"
                value={formData.mobno}
                onChange={handleChange}
                required
              />
              {error.mobno && <p className="text-red-500 text-sm mt-1">{error.mobno}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-muted-foreground font-semibold mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email ID *"
                className="mt-1 block w-full border border-border rounded-md p-3"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
            </div>

            <div className="mb-6 relative">
              <label className="block text-muted-foreground font-semibold mb-1" htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter Password *"
                className="mt-1 block w-full border border-border rounded-md p-3"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-9 text-secondary hover:brightness-150"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
              {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
            </div>

            <div className="mb-6 relative">
              <label className="block text-muted-foreground font-semibold mb-1" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                name="confirmPassword"
                placeholder="Confirm Password *"
                className="mt-1 block w-full border border-border rounded-md p-3"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-9 text-secondary hover:brightness-150"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
              >
                <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
              {error.confirmPassword && <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-primary-foreground text-secondary hover:bg-primary-foreground/80 py-2 rounded-full font-semibold"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-4 text-muted-foreground text-center">
            Need assistance?{" "}
            <a href="/get-help" className="text-primary-foreground font-semibold">Get Help</a>
          </p>
        </div>
      </div>
    </div>
  );
}
