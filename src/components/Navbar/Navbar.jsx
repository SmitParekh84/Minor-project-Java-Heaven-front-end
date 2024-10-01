import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Adjust the path based on your folder structure

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Order', href: '/order' },
  { name: 'Pay', href: '/pay' },
  { name: 'Store', href: '/store' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart(); // Use the Cart Context to get cart items

  // Calculate total quantity of items in the cart
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

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

        <div className="flex items-center lg:hidden">
          {/* Cart Link for Mobile View */}
          <Link to="/cart" className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-secondary mr-4">
            <ShoppingCartIcon className="h-5 w-5 mr-1" aria-hidden="true" />
            Cart {totalItemsInCart > 0 && `(${totalItemsInCart})`}
          </Link>
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
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-gray-900 hover:text-secondary">
              {item.name}
            </Link>
          ))}
          {/* Add Cart Link */}
          <Link to="/cart" className="flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-secondary">
            <ShoppingCartIcon className="h-5 w-5 mr-1" aria-hidden="true" />
            Cart {totalItemsInCart > 0 && `(${totalItemsInCart})`} {/* Show number of items in cart */}
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/profile" className="text-sm bg-secondary rounded-full py-2 px-8 font-semibold leading-6 text-primary shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-primary-foreground px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Coffee Haven</span>
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
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
                {/* Add Cart Link in mobile menu */}
                <Link
                  to="/cart"
                  className="flex items-center -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                  Cart {totalItemsInCart > 0 && `(${totalItemsInCart})`}
                </Link>
              </div>
              <div className="py-6">
                <Link
                  to="/profile" // Change this link to point to the profile page
                  className="-mx-3 block px-3 py-2.5 text-base font-semibold leading-7 bg-secondary rounded-full text-center text-primary hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
