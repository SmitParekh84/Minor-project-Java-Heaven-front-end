import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import LoadingIndicator from "../Menu/LoadingIndicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { user, setUser } = useUser();
    const [localUser, setLocalUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();
    useEffect(() => {
        const storedUserInfo = localStorage.getItem("userInfo");
        if (storedUserInfo) {
            try {
                const parsedUserInfo = JSON.parse(storedUserInfo);
                setLocalUser(parsedUserInfo);
                setUser(parsedUserInfo);
            } catch (error) {
                console.error("Failed to parse user info:", error);
                setLocalUser(null);
                setUser(null);
            }
        }
        setLoading(false); // Set loading to false after checking
    }, [setUser]);

    const handleLogout = () => {
        localStorage.removeItem("sessionId");
        localStorage.removeItem("sessionStartTime");
        localStorage.removeItem("userInfo");
        setUser(null);
        setLocalUser(null);
        toast.success("Logout Successfully");
        window.location.reload();
        navigate('/');
        // Optional: Add feedback for logout action, e.g., toast notification
    };


    if (loading) {
        return (
            <LoadingIndicator />
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="bg-secondary rounded-lg shadow-lg m-5 p-11 max-w-sm w-full">
                <h2 className="text-2xl text-center font-bold text-primary-foreground mb-6">Profile</h2>
                {localUser ? (
                    <>
                        <div className="mb-4">
                            <p className="text-muted-foreground">Username: {localUser.username || "N/A"}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-muted-foreground">Email: {localUser.email || "N/A"}</p>
                        </div>

                        <button
                            className="w-full bg-primary-foreground text-secondary hover:bg-primary-foreground/80 py-2 rounded-full font-semibold"
                            onClick={handleLogout}
                            aria-label="Logout" // Accessibility label
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <p className="text-muted-foreground">No user is logged in.</p>
                )}
            </div>
        </div>
    );
}
