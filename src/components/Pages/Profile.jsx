// Profile.jsx
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext"; // Adjust the path based on your file structure

export default function Profile() {
    const { user, setUser } = useContext(UserContext); // Access user and setUser from context

    const handleLogout = () => {
        // Clear user session and state
        localStorage.removeItem("sessionId");
        localStorage.removeItem("sessionStartTime");
        localStorage.removeItem("userInfo");
        setUser(null); // Reset user state
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="bg-secondary rounded-lg shadow-lg m-5 p-11 max-w-sm w-full">
                <h2 className="text-2xl text-center font-bold text-primary-foreground mb-6">Profile</h2>
                <div className="mb-4">
                    <p className="text-muted-foreground">Username: {user.username}</p>
                </div>
                <div className="mb-4">
                    <p className="text-muted-foreground">Email: {user.email}</p>
                </div>
                <button
                    className="w-full bg-primary-foreground text-secondary hover:bg-primary-foreground/80 py-2 rounded-full font-semibold"
                    onClick={handleLogout} // Call the handleLogout function
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
