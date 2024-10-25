import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext'; // Import User Context
import toast from 'react-hot-toast';

const adminNavigation = [
  { name: 'Dashboard', href: '/admin-dashboard' },
  { name: 'Orders', href: '/admin/orders' },
  { name: 'Admin Edit', href: '/admin/edit' },
  { name: 'Revenue', href: '/revenue' },
  { name: 'Add Menu Item', href: '/admin/add-menu-item' },
  { name: 'Best Selling Item', href: '/admin/best-selling' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, setUser } = useUser(); // Get user from UserContext
  const [isLoggedIn, setIsLoggedIn] = useState(!!user); // Update based on context
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const totalItemsInCart = useMemo(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems]);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]); // Watch for changes in user context

  const handleLogout = useCallback(() => {
    setUser(null); // Clear user in context
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    localStorage.removeItem('userInfo');
    toast.success("Logout Successfully");
    setMobileMenuOpen(false);
    navigate('/');
  }, [setUser, navigate]);

  const isAdmin = user?.role === 'admin';

  const handleLinkClick = useCallback((path) => {
    setMobileMenuOpen(false);
    navigate(path);
  }, [navigate]);

  const renderUserInfo = () => (
    <div className="relative">
      <button
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-secondary"
        aria-haspopup="true"
        aria-expanded={showProfileMenu}
      >
        <UserIcon className="h-5 w-5 mr-1" aria-hidden="true" />
        {user?.username}
      </button>
      {showProfileMenu && (
        <div className="absolute right-0 mt-2 w-auto bg-white border border-gray-300 rounded-md shadow-lg z-50">
          <div className="px-4 py-2 text-gray-800">{user?.email}</div>
          <div className="border-t border-gray-300"></div>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-10">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Java Heaven</span>
            <img alt="Company-Logo" src="/images/logo-3.png" className="h-16 w-auto" />
          </Link>
        </div>

        <div className="flex items-center lg:hidden">
          {isLoggedIn && !isAdmin && (
            <Link to="/cart" className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-secondary mr-4">
              <ShoppingCartIcon className="h-5 w-5 mr-1" aria-hidden="true" />
              {totalItemsInCart}
            </Link>
          )}

          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12 lg:items-center">
          {isLoggedIn && isAdmin ? (
            <>
              {adminNavigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleLinkClick(item.href)}
                  className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary"
                >
                  {item.name}
                </button>
              ))}
            </>
          ) : (
            <>
              <Link to="/menu" className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary">
                Menu
              </Link>
              <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary">
                About
              </Link>
              <Link to="/" className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary">
                Home
              </Link>
            </>
          )}
          {isLoggedIn && !isAdmin && (
            <Link to="/cart" className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-secondary">
             <ShoppingCartIcon className="h-5 w-5 mr-1" aria-hidden="true" />
             Cart ({totalItemsInCart})
            </Link>
          )}

          {isLoggedIn ? (
            renderUserInfo()
          ) : (
            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary">
              Sign in
            </Link>
          )}
        </div>
      </nav>

      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <DialogPanel focus="true" className="fixed inset-0 z-50 overflow-y-auto bg-white p-6 lg:hidden">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Java Heaven</span>
              <img alt="Company-Logo" src="/images/logo-3.png" className="h-16 w-auto" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="space-y-2">
            {isLoggedIn && isAdmin ? (
              <>
                {adminNavigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleLinkClick(item.href)}
                    className="block w-full text-left py-2 px-3 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    {item.name}
                  </button>
                ))}
              </>
            ) : (
              <>
                <Link to="/menu" className="block py-2 px-3 text-sm font-semibold text-gray-900 hover:bg-gray-100">
                  Menu
                </Link>
                <Link to="/about" className="block py-2 px-3 text-sm font-semibold text-gray-900 hover:bg-gray-100">
                  About
                </Link>
                <Link to="/" className="block py-2 px-3 text-sm font-semibold text-gray-900 hover:bg-gray-100">
                  Home
                </Link>
              </>
            )}
            {isLoggedIn && !isAdmin && (
              <Link to="/cart" className="block py-2 px-3 text-sm font-semibold text-gray-900 hover:bg-gray-100">
                Cart ({totalItemsInCart})
              </Link>
            )}
          </div>
          {isLoggedIn ? (
            <div className="border-t border-gray-300 py-6">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-sm font-semibold text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="border-t border-gray-300 py-6">
              <Link
                to="/login"
                className="block w-full text-left px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
              >
                Sign in
              </Link>
            </div>
          )}
        </DialogPanel>
      </Dialog>
    </header>
  );
}
