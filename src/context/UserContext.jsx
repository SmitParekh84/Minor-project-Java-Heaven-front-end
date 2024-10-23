import React, { createContext, useContext, useEffect, useState } from "react";

// Create the UserContext
const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
    // Initialize user state with properties for username, email, and userId
    const [user, setUser] = useState(() => {
        // Retrieve user data from local storage if available
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : { username: "", email: "", id: "", mobno: "" };
    });

    // Effect to update local storage whenever the user state changes
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

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


// Inside your component where logout functionality is used:
const NavBar = () => {
    const { user, setUser } = useUser();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setIsLoggedIn(!!user.username); // Check if the user is logged in based on username
        }
    }, [user]);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser((prevUser) => ({
            ...prevUser,
            username: "", // Clear only username
            email: ""     // Clear only email
        }));
        localStorage.removeItem('userRole'); // Optionally clear specific local storage items
        toast.success("Logout Successfully");
        navigate('/'); // Redirect to home or login page
    };

    return (
        <nav>
            {/* Your navigation bar content */}
            {isLoggedIn && (
                <>
                    <span>{user.username || "Guest"}</span>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
};
