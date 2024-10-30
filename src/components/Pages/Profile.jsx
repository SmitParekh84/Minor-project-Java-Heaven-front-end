import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import LoadingIndicator from "../Menu/LoadingIndicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import axios from "axios";

export default function Profile() {
    const { user, setUser } = useUser();
    const [localUser, setLocalUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();
    const parseJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            return null;
        }
    };
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

    const handleLogout = async () => {

        try {
            // Retrieve token from localStorage
            const token = localStorage.getItem('token');
            let userId = null;

            if (token) {
                // Decode the token to get the userId or relevant data
                const decodedToken = parseJwt(token);
                userId = decodedToken ? decodedToken.userId : null; // Assuming your token contains userId
            }

            const response = await axios.post(`${API_URL}/api/logout`, { userId }, {
                withCredentials: true // Send cookies, if needed
            });

            // Clear sessionStorage and localStorage
            sessionStorage.clear();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('userInfo');


            navigate('/');

            toast.success("Logout Successfully");

        } catch (error) {
            console.error("Error during logout:", error);

            toast.error("Failed to logout. Please try again.");
        }
        setTimeout(() => {
            window.location.reload();
        }, 500);
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
