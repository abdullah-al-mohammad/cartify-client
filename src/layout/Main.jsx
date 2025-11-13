import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import shopping from '../assets/shoppingcart.png';
import CartModal from '../pages/cartModal/CartModal';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';
import { useCart } from '../Router/provider/CartProvider';

const Main = () => {
  const { cart } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';
  console.log(hideHeaderFooter);

  return (
    <>
      {hideHeaderFooter || <Navbar />}
      <div className="min-h-screen">
        <Outlet />
      </div>
      {hideHeaderFooter || <Footer />}

      {/* cart icon  */}
      {hideHeaderFooter || (
        <>
          <button onClick={() => setIsCartOpen(true)}>
            <div className="float-right indicator fixed right-7 bottom-40 bg-slate-100 p-2 rounded-full">
              <img className="max-w-5" src={shopping} alt="" />
              <span className="indicator-item badge bg-red-600">{cart.length}</span>
            </div>
          </button>
          <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}></CartModal>
        </>
      )}
    </>
  );
};

export default Main;
