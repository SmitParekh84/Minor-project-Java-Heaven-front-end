import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Pages/Footer";
import ProtectedRoute from "./components/Pages/ProtectedRoute";

// Lazy load your components
const Hero = React.lazy(() => import("./components/Hero/Hero"));
const GetHelp = React.lazy(() => import("./components/Pages/GetHelp"));
const ItemList = React.lazy(() => import("./components/Menu/ItemList"));
const Login = React.lazy(() => import("./components/Pages/Login"));
const ItemDetail = React.lazy(() => import("./components/Menu/ItemDetail"));
const Cart = React.lazy(() => import("./components/Menu/Cart"));
const SignUp = React.lazy(() => import("./components/Pages/SignUp"));
const Profile = React.lazy(() => import("./components/Pages/Profile"));
const MyOrders = React.lazy(() => import("./components/Pages/MyOrders"));
const AdminDashboard = React.lazy(() => import("./components/Pages/AdminDashboard"));
const AdminLogin = React.lazy(() => import("./components/Pages/AdminLogin"));
const AdminEdit = React.lazy(() => import("./components/Pages/AdminEdit"));
const AddMenuItem = React.lazy(() => import("./components/Pages/AddMenuItem"));
const AdminOrders = React.lazy(() => import("./components/Pages/AdminOrders"));
const BestSellingItem = React.lazy(() => import("./components/Pages/BestSellingItem"));
const About = React.lazy(() => import("./components/Pages/About"));
const RevenuePage = React.lazy(() => import("./components/Pages/RevenuePage")); // Import RevenuePage

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <UserProvider>
        <CartProvider>
          <Router>
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/menu" element={<ItemList />} />
                <Route path="/get-help" element={<GetHelp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/item/:id" element={<ItemDetail />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/revenue" element={<RevenuePage />} /> {/* Add this line */}

                {/* Protect routes that require user authentication */}
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
                <Route path="/my-orders" element={
                  <ProtectedRoute>
                    <MyOrders />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />

                {/* Admin routes with protection */}
                <Route path="/admin-dashboard" element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/edit" element={
                  <ProtectedRoute adminOnly>
                    <AdminEdit />
                  </ProtectedRoute>
                } />
                <Route path="/admin/add-menu-item" element={
                  <ProtectedRoute adminOnly>
                    <AddMenuItem />
                  </ProtectedRoute>
                } />
                <Route path="/admin/orders" element={
                  <ProtectedRoute adminOnly>
                    <AdminOrders />
                  </ProtectedRoute>
                } />
                <Route path="/admin/best-selling" element={
                  <ProtectedRoute adminOnly>
                    <BestSellingItem />
                  </ProtectedRoute>
                } />
              </Routes>
            </Suspense>
            <Footer />
          </Router>
        </CartProvider>
      </UserProvider>
    </>
  );
}
