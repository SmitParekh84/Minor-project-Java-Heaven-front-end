import React, { useState } from "react"; // Import React and useState

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import { UserProvider } from "./context/UserContext"; // Import UserProvider
import Hero from "./components/Hero/Hero";
import GetHelp from "./components/Pages/GetHelp";
import ItemList from "./components/Menu/ItemList";
import Login from "./components/Pages/Login";
import ItemDetail from "./components/Menu/ItemDetail";
import Navbar from "./components/Navbar/Navbar"; // Adjust the path based on your file structure
import Cart from "./components/Menu/Cart"; // Import the Cart component
import SignUp from "./components/Pages/SignUp";
import Profile from "./components/Pages/Profile"; // Import your Profile component

export default function App() {
  const [user, setUser] = useState(null); // State to manage user information

  return (
    <CartProvider>

      <UserProvider> {/* Wrap your application with UserProvider */}
        <Router>
          <Navbar user={user} setUser={setUser} /> {/* Include the Navbar */}
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/order" element={<ItemList />} />
            <Route path="/get-help" element={<GetHelp />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/profile"
              element={user ? <Profile user={user} /> : <Login setUser={setUser} />}
            />

          </Routes>
        </Router>
      </UserProvider>

    </CartProvider>
  );
}
