import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/cartify.png';
import shopping from '../../../assets/shoppingcart.png';
import useAuth from '../../../hooks/useAuth';
import { useCart } from '../../../Router/provider/CartProvider';
import { useTheme } from '../../../Router/provider/ThemeProvider';
import CartModal from '../../cartModal/CartModal';
// ..
AOS.init();

const Navbar = () => {
  const { theme, switchTheme } = useTheme();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  console.log(theme);

  useEffect(() => {
    const handleScroll = () => {
      const bannerHeight = document.getElementById('banner')?.offsetHeight || 0;
      const triggerpoint = bannerHeight - 65;

      setScrolled(window.scrollY > triggerpoint);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleLogout = () => {
    logout().then(result => {
      const res = result.user;
    });
  };
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/">About</NavLink>
      </li>
      <li className="indicator mr-5">
        <button onClick={() => setIsCartOpen(true)}>
          <div className="indicator">
            <img className="max-w-5 mr-2" src={shopping} alt="" />
            <span className="text-red-500 font-bold">{cart.length}</span>
          </div>
        </button>
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}></CartModal>
      </li>
      {user ? (
        ' '
      ) : (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
    </>
  );
  return (
    <div
      className={`navbar fixed z-50 transition-all duration-700 ${
        scrolled ? 'shadow-md opacity-100 bg-base-100 dark:bg-black' : 'bg-transparent opacity-100'
      }`}
      // style={{
      //   background: scrolled ? 'black' : 'transparent',
      // }}
    >
      <div className="container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="btn bg-transparent border-none shadow-none text-xl text-white">
            <img className="w-10 h-10" src={logo} alt="" />
            <h5>Cartify</h5>
          </Link>
        </div>
        <div className="navbar-end text-white">
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  checked={theme === 'dark'}
                  onChange={() => switchTheme(theme === 'light' ? 'dark' : 'light')}
                  className="theme-controller"
                  value="synthwave"
                />

                {/* sun icon */}
                <svg
                  className="swap-off h-5 w-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on h-5 w-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
              {navLinks}
            </ul>
          </div>
          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                <img className="w-8 h-8 rounded-full inline" src={user?.photoURL} alt="" />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-black rounded-b z-1 mt-4 w-52 p-2 shadow-sm"
              >
                <li>
                  <NavLink to={'users'}>Dashboard</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} type="button">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Navbar;
