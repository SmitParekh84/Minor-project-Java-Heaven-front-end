import React from "react"; // Import React
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import { UserProvider, useUser } from "./context/UserContext"; // Import UserProvider and useUser hook
import Hero from "./components/Hero/Hero";
import GetHelp from "./components/Pages/GetHelp";
import ItemList from "./components/Menu/ItemList";
import Login from "./components/Pages/Login";
import ItemDetail from "./components/Menu/ItemDetail";
import Navbar from "./components/Navbar/Navbar"; // Adjust the path based on your file structure
import Cart from "./components/Menu/Cart"; // Import the Cart component
import SignUp from "./components/Pages/SignUp";
import Profile from "./components/Pages/Profile"; // Import your Profile component
import MyOrders from "./components/Pages/MyOrders";
import AdminDashboard from "./components/Pages/AdminDashboard"; // Import AdminDashboard component
import AdminLogin from "./components/Pages/AdminLogin";
import toast, { Toaster } from "react-hot-toast"; // Import Toaster from react-hot-toast
import Footer from "./components/Pages/Footer";
import AdminEdit from "./components/Pages/AdminEdit"; // Import AdminEdit component
import AddMenuItem from "./components/Pages/AddMenuItem"; // Import AddMenuItem component
import AdminOrders from "./components/Pages/AdminOrders";
import BestSellingItem from "./components/Pages/BestSellingItem";
// ProfileRoute component to handle user context for profile
const ProfileRoute = () => {
  const { user } = useUser(); // Access user from UserContext
  return user ? <Profile /> : <Login />; // Render Profile or Login based on user state
};

export default function App() {
  return (
    <>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <CartProvider>
        <UserProvider> {/* Wrap your application with UserProvider */}
          <Router>
            <Navbar /> {/* Include the Navbar, user prop is now handled in context */}
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/order" element={<ItemList />} />
              <Route path="/get-help" element={<GetHelp />} />
              <Route
                path="/login"
                element={<Login />} // No need to pass setUser here, handle it within Login
              />

              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/item/:id" element={<ItemDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/profile" element={<ProfileRoute />} /> {/* Use ProfileRoute to manage user context */}
              {/* New route for Admin Dashboard */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin/edit" element={<AdminEdit />} />
              <Route path="/admin/add-menu-item" element={<AddMenuItem />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/best-selling" element={<BestSellingItem />} />
            </Routes>
            <Footer />
          </Router>
        </UserProvider>
      </CartProvider>
    </>
  );
}
