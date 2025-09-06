import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/cartify.png";
import useAuth from "../../../hooks/useAuth";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import CartModal from "../../cartModal/CartModal";
import { useCart } from "../../../Router/provider/CartProvider";
// ..
AOS.init();

const Navbar = () => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false)
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const bannerHeight = document.getElementById('banner')?.offsetHeight || 0;
      setScrolled(window.scrollY > bannerHeight)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const handleLogout = () => {
    logout()
      .then((result) => {
        const res = result.user
        console.log(res);

      })
  }
  const navLinks = (
    <>
      <li>
        <NavLink to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/">About</NavLink>
      </li>
      {user ? <li className="indicator mr-5">
        {/* <span className="indicator-item badge badge-secondary">12</span> */}
        <button
          onClick={() => setIsCartOpen(true)}
        >
          Cart
          {cart.length > 0 && (
            <span className="indicator-item badge badge-secondary absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cart.length}
            </span>
          )}
        </button>
      </li> :
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>}
    </>
  );
  return (
    <div className={`navbar fixed z-50 text-white transition-all duration-700 ${scrolled ? "shadow-md opacity-100" : "opacity-70"}`} style={{
      background: scrolled
        ? 'black'
        : 'transparent',
    }}>
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
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link to='/' className="btn bg-transparent border-none shadow-none text-xl">
            <img className="w-10 h-10" src={logo} alt="" />
            <h5>Cartify</h5>
          </Link>
        </div>
        <div className="navbar-end">
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navLinks}</ul>
          </div>
          {user && <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
            >
              <img className="w-8 h-8 rounded-full inline" src={user?.photoURL} alt="" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-200 rounded-box text-black z-1 mt-4 w-52 p-2 shadow-sm"
            >
              <li>
                <NavLink to={'users'}>Dashboard</NavLink>
              </li>
              <li>
                <button onClick={handleLogout} type="button">Logout</button>
              </li>
            </ul>
          </div>}
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Navbar;