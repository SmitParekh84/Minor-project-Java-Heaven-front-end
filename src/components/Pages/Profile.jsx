// Profile.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Profile({ user, setUser }) {
    const navigate = useNavigate(); // Initialize navigate for redirection

    const handleLogout = () => {
        // Clear user session and state
        localStorage.removeItem("sessionId");
        localStorage.removeItem("sessionStartTime");
        localStorage.removeItem("userInfo");
        setUser(null); // Reset user state
        navigate("/login"); // Redirect to login page after logout
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="bg-secondary rounded-lg shadow-lg m-5 p-11 max-w-sm w-full">
                <h2 className="text-2xl text-center font-bold text-primary-foreground mb-6">Profile</h2>
                {user ? ( // Check if user data exists
                    <>
                        <div className="mb-4">
                            <p className="text-muted-foreground">Username: {user.username}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-muted-foreground">Email: {user.email}</p>
                        </div>
                    </>
                ) : (
                    <p className="text-muted-foreground">No user data available. Please log in.</p>
                )}
                <button
                    className="w-full bg-primary-foreground text-secondary hover:bg-primary-foreground/80 py-2 rounded-full font-semibold"
                    onClick={handleLogout} // Use the handleLogout function
                    aria-label="Logout" // Add an aria-label for accessibility
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
