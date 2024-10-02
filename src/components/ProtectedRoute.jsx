import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext"; // Adjust the path as needed

const ProtectedRoute = ({ element, ...rest }) => {
    const { user } = useUser(); // Access user state from UserContext

    return (
        <Route
            {...rest}
            element={user ? element : <Navigate to="/admin/login" replace />}
        />
    );
};

export default ProtectedRoute;
