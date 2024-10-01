import React, { useState } from 'react';
import axios from 'axios';

export default function GetHelp() {
    const [username, setUsername] = useState("");
    const [dob, setDob] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        setSuccess(""); // Clear previous success messages

        try {
            // Replace with your API endpoint
            const response = await axios.post("http://localhost:5000/api/request-otp", { username, dob });
            setSuccess(response.data.message); // Assuming your API returns a success message
        } catch (err) {
            setError(err.response?.data?.msg || "An error occurred, please try again.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
            <div className="bg-card rounded-lg shadow-lg p-8 m-5 max-w-sm w-full">
                <h2 className="text-lg font-semibold text-primary-foreground">Get Help</h2>
                <p className="text-muted-foreground mb-4">
                    Please enter your registered details and we will send you an OTP to reset your password.
                </p>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm text-muted-foreground" htmlFor="username">USERNAME</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter Email ID or Mobile Number *"
                            className="mt-1 block w-full border border-border rounded-md p-2 focus:ring focus:ring-ring"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-muted-foreground" htmlFor="dob">DATE OF BIRTH</label>
                        <input
                            type="date"
                            id="dob"
                            className="mt-1 block w-full border border-border rounded-md p-2 focus:ring focus:ring-ring"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-primary-foreground text-secondary hover:bg-primary/80 w-full font-medium p-2 rounded-full"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}
