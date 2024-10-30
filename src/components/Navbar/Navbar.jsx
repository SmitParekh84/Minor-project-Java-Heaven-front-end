import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_URL } from "../../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
const adminNavigation = [
  { name: 'Dashboard', href: '/admin-dashboard' },
  { name: 'Orders', href: 'admin/orders' },
  { name: 'Admin Edit', href: '/admin/edit' },
  { name: 'Revenue', href: '/revenue' },
  { name: 'Add Menu Item', href: '/admin/add-menu-item' },
  { name: 'Best Selling Item', href: 'admin/best-selling' },
];

export default function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const totalItemsInCart = useMemo(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems]);
  const loggedInUser = localStorage.getItem('userInfo');
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
  useEffect(() => {
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser);
      setUser(foundUser);
      setIsLoggedIn(true);
    }
  }, [loggedInUser]);


  const handleLogout = async () => {

    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem('token');
      let userId = null;

      if (token) {
        // Decode the token to get the userId or relevant data
        const decodedToken = parseJwt(token);
        userId = decodedToken ? decodedToken.userId : null; // Assuming your token contains userId
      }

      const response = await axios.post(`${API_URL}/api/logout`, { userId }, {
        withCredentials: true // Send cookies, if needed
      });

      // Clear sessionStorage and localStorage
      sessionStorage.clear();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userInfo');
      setMobileMenuOpen(false); // Close the mobile menu

      navigate('/');

      toast.success("Logout Successfully");

    } catch (error) {
      console.error("Error during logout:", error);
      setMobileMenuOpen(false);
      toast.error("Failed to logout. Please try again.");
    }
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };



  const isAdmin = user?.role === 'admin'; // Check if the logged-in user is an admin
  console.log(isAdmin);

  const handleLinkClick = (path) => {
    setMobileMenuOpen(false); // Close the mobile menu
    navigate(path); // Navigate to the specified path
  };

  return (
    <header className="inset-x-0 top-0 ">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-10">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Java Heaven</span>
            <img alt="Company-Logo" src="/images/logo-3.png" className="h-16 w-auto" />
          </Link>
        </div>

        <div className="flex items-center lg:hidden">
          {isLoggedIn && !isAdmin && ( // Show cart link only if user is logged in and not an admin
            <Link to="/cart" className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-secondary mr-4">
              <ShoppingCartIcon className="h-5 w-5 mr-1" aria-hidden="true" />
              Cart {totalItemsInCart > 0 && `(${totalItemsInCart})`}
            </Link>
          )}

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-secondary mr-4"
                aria-haspopup="true"
                aria-expanded={showProfileMenu}
              >
                <UserIcon className="h-5 w-5 mr-1" aria-hidden="true" />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-auto bg-white border border-gray-300 rounded-md shadow-lg z-100">

                  <div className="px-4 py-2 flex items-center text-gray-800">
                    <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-600" />
                    <Link to="/profile" className="hover:text-blue-500 font-semibold">
                      {user.username ? user.username : "Guest"}
                    </Link>
                  </div>
                  <div className="px-4 py-2 flex items-center text-gray-800">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-600" />
                    <span>{user.email ? user.email : "Guest"}</span>
                  </div>
                  <div className="border-t border-gray-300"></div>
                  <button
                    onClick={handleLogout}

                    className="flex items-center justify-center block w-full text-center px-4 py-2 text-sm text-red-600 hover:bg-gray-200"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-sm bg-secondary rounded-full py-2 px-8 font-semibold leading-6 text-primary shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {(!isLoggedIn || (isLoggedIn && !isAdmin)) && (
            <>
              <Link key="home" to="/" className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary">
                Home
              </Link>
              <Link key="about" to="/about" className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary">
                About
              </Link>
              <Link key="menu" to="/menu" className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary">
                Menu
              </Link>
            </>
          )}


          {isLoggedIn && !isAdmin && ( // Show My Orders and Cart only if user is logged in and not an admin
            <>

              <Link key="my-orders" to="/my-orders" className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary">
                My Orders
              </Link>
              <Link to="/cart" className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-secondary mr-4">
                <ShoppingCartIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                Cart {totalItemsInCart > 0 && `(${totalItemsInCart})`}
              </Link>
            </>
          )}

          {isLoggedIn && isAdmin && adminNavigation.map((item) => (
            <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary">
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-secondary"
                aria-haspopup="true"
                aria-expanded={showProfileMenu}
              >
                <UserIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                {user.username ? user.username : "Guest"}

              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-auto bg-white border border-gray-300 rounded-md shadow-lg z-50">

                  <div className="px-4 py-2 text-gray-800">{user.email ? user.email : "Guest"}</div>
                  <div className="border-t border-gray-300"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-center text-sm text-red-600 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-sm bg-secondary rounded-full py-2 px-8 font-semibold leading-6 text-primary shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-primary-foreground  px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between ">
            <Link to="/" onClick={() => handleLinkClick('/')} className="-m-1.5 p-1.5">
              <span className="sr-only">Java Heaven</span>
              <img alt="" src="/images/logo-3.png" className="h-16 w-auto" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 flow-root ">
            <div className="-my-6 divide-y  divide-gray-500 text-center">
              <div className="space-y-2 py-6">
                {(!isLoggedIn || (isLoggedIn && !isAdmin)) && (
                  <>
                    <Link
                      key="home"
                      to="/"
                      onClick={() => handleLinkClick('/')}
                      className="-mx-3 block rounded-lg py-1.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-200"
                    >
                      Home
                    </Link>
                    <Link
                      key="menu"
                      to="/menu"
                      onClick={() => handleLinkClick('/menu')}
                      className="-mx-3 block rounded-lg py-1.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-200"
                    >
                      Menu
                    </Link>
                    <Link
                      key="about"
                      to="/about"
                      onClick={() => handleLinkClick('/about')}
                      className="-mx-3 block rounded-lg py-1.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-200"
                    >
                      About
                    </Link>
                  </>
                )}

                {/* Display Admin Navigation Links Only Once */}
                {isLoggedIn && (isAdmin ? adminNavigation : []).map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className="-mx-3 block rounded-lg py-1.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-200"
                  >
                    {item.name}
                  </Link>
                ))}

                {isLoggedIn && !isAdmin && (
                  <>
                    <Link
                      key="my-orders"
                      to="/my-orders"
                      onClick={() => handleLinkClick('/my-orders')}
                      className="-mx-3 block rounded-lg py-1.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-200"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => handleLinkClick('/cart')}
                      className="-mx-3 block rounded-lg py-1.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-200"
                    >
                      Cart {totalItemsInCart > 0 && `(${totalItemsInCart})`}
                    </Link>
                  </>
                )}
              </div>

              <div className="py-6 flex justify-around">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="-mx-3 block w-full rounded-lg py-1.5 px-3 text-base font-semibold leading-6 text-red-600 hover:bg-muted-foreground"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => handleLinkClick('/login')}
                    className="-mx-3 block rounded-lg py-1.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-200"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>

    </header>
  );
}
