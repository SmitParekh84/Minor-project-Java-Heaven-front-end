import React, { useState, useEffect } from 'react'; import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Adjust the path based on your folder structure
import toast from 'react-hot-toast';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/order' },
  { name: 'My Orders', href: '/my-orders' },

];


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart(); // Use the Cart Context to get cart items
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [user, setUser] = useState(null); // User state to hold user information
  const [showProfileMenu, setShowProfileMenu] = useState(false); // State to toggle profile menu
  const navigate = useNavigate(); // Hook for navigation

  // Calculate total quantity of items in the cart
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  const loggedInUser = localStorage.getItem('userInfo'); // Use the correct key
  useEffect(() => {
    // Check if user is logged in by using localStorage or authentication state
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setIsLoggedIn(true);
    }
  }, [loggedInUser]);

  const handleLogout = () => {
    setIsLoggedIn(false); // Log out the user
    setUser(null); // Clear user data
    setShowProfileMenu(false); // Hide profile dropdown
    localStorage.removeItem('userInfo'); // Remove user info from localStorage
    toast.success("Logout Successfully")
    navigate('/'); // Redirect to home page after logout
  };
  console.log(localStorage.getItem('userInfo'));


  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-10">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt="Company-Logo"
              src="images/logo-3.png"
              className="h-16 w-auto"
            />
          </Link>
        </div>
        {/* Cart Link for Mobile View */}
        <div className="flex items-center lg:hidden">
          {/* Cart Link for Mobile View */}
          {isLoggedIn && ( // Only show the cart if the user is logged in
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
              >
                <UserIcon className="h-5 w-5 mr-1" aria-hidden="true" />

              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-auto bg-white border border-gray-300 rounded-md shadow-lg z-50">
                  <div className="px-4 py-2 text-gray-800">{user.email}</div>
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
        {/* Cart Link for pc View */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary">
              {item.name}
            </Link>
          ))}
          {/* Add Cart Link */}
          {isLoggedIn ? (
            <div className="relative flex items-center">
              <Link to="/cart" className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-secondary mr-4">
                <ShoppingCartIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                Cart {totalItemsInCart > 0 && `(${totalItemsInCart})`}
              </Link>



            </div>
          ) : (""

          )}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <div className="relative ">

              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-secondary"
              >{user.username}
                <UserIcon className="h-5 w-5 mr-1" aria-hidden="true" />


              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-auto bg-white border border-gray-300 rounded-md shadow-lg z-50">
                  <div className="px-4 py-2 text-gray-800">{user.email}</div>
                  <div className="border-t border-gray-300"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-center text-sm text-red-600 hover:bg-gray-200"
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

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />

        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-primary-foreground px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Coffee Havean</span>
              <img
                alt=""
                src="../../../public/images/logo-3.png"
                className="h-16 w-auto"
              />
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

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {isLoggedIn ?
                  <>
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex mx-3  rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    >
                      <UserIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                      {user.username}
                    </button>
                    {showProfileMenu && (
                      <div className="absolute left-0 mt-2 w-auto bg-white border border-gray-300 rounded-md shadow-lg z-50">
                        <div className="px-4 py-2 text-gray-800">{user.email}</div>
                        <div className="border-t border-gray-300"></div>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-200"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </> : ""}
                {/* Add Cart Link in mobile menu */}
                {isLoggedIn ? (

                  <Link to="/cart" className="flex mx-3  rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50">
                    <ShoppingCartIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                    Cart {totalItemsInCart > 0 && `(${totalItemsInCart})`}
                  </Link>




                ) : (""

                )}
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}

              </div>
              <div className="py-6">
                {isLoggedIn ? "" : (
                  <Link to="/login" className="text-sm bg-secondary rounded-full py-2 px-8 font-semibold leading-6 text-primary shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
                    Log in <span aria-hidden="true">&rarr;</span>
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
