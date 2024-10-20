// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext"; // Ensure this path is correct

const ProtectedRoute = ({ children, adminOnly }) => {
    const { user } = useUser();

    // Check if the user is authenticated based on user properties
    const isAuthenticated = user.username !== ""; // Check if username is set
    const isAdmin = user.role === "admin"; // Check if the user is an admin

    if (!isAuthenticated) {
        // User is not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin) {
        // User is not an admin, redirect to another page or an error page
        return <Navigate to="/" replace />; // Redirect to homepage or an appropriate page
    }

    // If authenticated (and admin check passes if required), render children
    return children;
};
export default ProtectedRoute;
