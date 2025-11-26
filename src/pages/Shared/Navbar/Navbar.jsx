import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/cartify.png';
import shopping from '../../../assets/shoppingcart.png';
import useAuth from '../../../hooks/useAuth';
import { useCart } from '../../../Router/provider/CartProvider';
import CartModal from '../../cartModal/CartModal';
import ThemeToggle from '../../components/theme/ThemeToggle';
// ..
AOS.init();

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

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
      className={`navbar fixed z-50 transition-all duration-700 text-white ${
        scrolled
          ? 'shadow-md opacity-100 bg-black/80 text-white dark:bg-white/80 dark:text-black'
          : 'bg-transparent opacity-100'
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
              className="menu menu-sm dropdown-content bg-white text-black dark:bg-base-100 dark:text-white rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="btn bg-transparent border-none shadow-none text-xl">
            <img className="w-10 h-10" src={logo} alt="" />
            <h5 className="text-white dark:text-black">Cartify</h5>
          </Link>
        </div>
        <div className="navbar-end">
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <ThemeToggle />
              </li>
              {navLinks}
            </ul>
          </div>
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                <img className="w-8 h-8 rounded-full inline" src={user?.photoURL} alt="" />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-white text-black dark:bg-black dark:text-white rounded-b z-1 mt-4 w-52 p-2 shadow-sm"
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
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Navbar;
