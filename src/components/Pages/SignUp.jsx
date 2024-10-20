import React, { useState } from "react"
import { useNavigate } from "react-router-dom" // Import useNavigate for redirection
import axios from "axios" // Import axios for API requests

export default function SignUp() {
  const navigate = useNavigate() // Hook for navigation
  const [formData, setFormData] = useState({
    username: "",
    mobno: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("") // State for error messages

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/signup`, formData) // Adjust API endpoint as necessary
      navigate("/login") // Redirect to login page
    } catch (err) {
      setError(err.response.data.msg || "Registration failed")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="rounded-lg p-6 w-full container mx-auto max-w-7xl pt-20 sm:py-18 lg:pt-16">
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="bg-secondary rounded-lg shadow-lg m-5 p-11 max-w-sm w-full">
            <h2 className="text-2xl text-center font-bold text-primary-foreground mb-6">
              Sign Up
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
            {/* Display error message */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-muted-foreground"
                  htmlFor="username"
                >
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  name="username" // Set name for form handling
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
                  type="text"
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
                <label
                  className="block text-muted-foreground"
                  htmlFor="password"
                >
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
                <label
                  className="block text-muted-foreground"
                  htmlFor="confirm-password"
                >
                  CONFIRM PASSWORD
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword" // Change name to match state
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
                className="w-full bg-primary-foreground text-secondary hover:bg-primary-foreground/80 py-2 rounded-full font-semibold"
              >
                Sign Up
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
  )
}
