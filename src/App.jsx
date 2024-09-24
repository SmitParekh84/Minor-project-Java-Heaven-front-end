import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import Hero from './components/Hero/Hero';
import GetHelp from './components/Pages/GetHelp';
import Order from './components/Menu/ItemList';
import Login from './components/Pages/Login';
import ItemDetail from './components/Menu/ItemDetail';
import Navbar from './components/Navbar/Navbar'; // Adjust the path based on your file structure
import Cart from './components/Menu/Cart'; // Import the Cart component

export default function App() {
  return (
    <CartProvider> {/* Wrap the Router with CartProvider */}
      <Router>
        <Navbar /> {/* Include the Navbar */}
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/order" element={<Order />} />
          <Route path="/get-help" element={<GetHelp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/item/:id" element={<ItemDetail />} /> {/* New route for ItemDetail */}
          <Route path="/cart" element={<Cart />} /> {/* Add Cart route */}
        </Routes>
        {/* Hero could also be part of a specific page if needed */}
      </Router>
    </CartProvider>
  );
}
