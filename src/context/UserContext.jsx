import React, { createContext, useContext, useState } from "react";

// Create the UserContext
const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
    // Initialize user state with properties for username, email, and userId
    const [user, setUser] = useState({
        username: "", // Initialize username
        email: "",    // Initialize email
        id: "",       // Initialize user ID
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Create a custom hook for easier access to the UserContext
export const useUser = () => {
    const context = useContext(UserContext);

    // Throw an error if the context is used outside of a UserProvider
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
};
