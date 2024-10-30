import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Create the UserContext
const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {

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


    // Initialize user state with properties for username, email, and userId

    const [user, setUser] = useState(() => {
        // Retrieve user data from local storage if available
        const savedUser = localStorage.getItem("token");
        return savedUser ? savedUser : null;
    });

    // Effect to update local storage whenever the user state changes
    useEffect(() => {

        localStorage.setItem("user", localStorage.getItem("token"));


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
