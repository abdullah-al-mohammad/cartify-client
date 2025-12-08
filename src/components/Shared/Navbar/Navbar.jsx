import { useEffect, useState, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import logo from '../../../assets/cartify.png';
import shopping from '../../../assets/shoppingcart.png';

import useAuth from '../../../hooks/useAuth';
import { useCart } from '../../../provider/CartProvider';
import CartModal from '../../cartModal/CartModal';
import ThemeToggle from '../../theme/ThemeToggle';

AOS.init();

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const { cart } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Handle logout
  const handleLogout = useCallback(() => {
    logout().catch(err => console.error(err));
  }, [logout]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const bannerHeight = document.getElementById('banner')?.offsetHeight || 0;
      setScrolled(window.scrollY > bannerHeight - 65);
    };

    handleScroll(); // initialize on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navbar links
  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-green-500 transition-colors">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about" className="hover:text-green-500 transition-colors">About</NavLink>
      </li>
      <li className="indicator">
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative focus:outline-none"
        >
          <img src={shopping} alt="cart" className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full px-1 text-xs font-bold">
              {cart.length}
            </span>
          )}
        </button>
      </li>
      {!loading && !user && (
        <li>
          <NavLink to="/login" className="hover:text-green-500 transition-colors ml-3">
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-black/80 shadow-md text-white dark:bg-white/80 dark:text-black'
          : 'bg-transparent text-white dark:text-white'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Cartify Logo" className="w-10 h-10" />
          <h1 className="font-bold text-lg">Cartify</h1>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-4 ml-auto">
          <li><ThemeToggle /></li>
          {navLinks}
        </ul>

        {/* Mobile Dropdown */}
        <div className="lg:hidden dropdown">
          <label tabIndex={0} className="btn btn-ghost p-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 w-52 p-2 shadow bg-white text-black dark:bg-gray-900 dark:text-white rounded-box"
          >
            {navLinks}
          </ul>
        </div>

        {/* User Avatar */}
        {user && (
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="cursor-pointer">
              <img
                src={user.photoURL}
                alt="user avatar"
                className="w-8 h-8 rounded-full"
              />
            </label>
            <ul className="menu dropdown-content mt-4 w-52 p-2 shadow bg-white text-black dark:bg-black dark:text-white rounded-b">
              <li>
                <NavLink to="/users">Dashboard</NavLink>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;
