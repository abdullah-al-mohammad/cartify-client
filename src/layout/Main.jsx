import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import shopping from '../assets/shoppingcart.png';
import CartModal from '../components/cartModal/CartModal';
import DiscountPopUp from '../components/DiscountPopUp';
import Footer from '../components/Shared/Footer/Footer';
import Navbar from '../components/Shared/Navbar/Navbar';
import { useCart } from '../provider/CartProvider';

const Main = () => {
  const { cart } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {hideHeaderFooter || <Navbar />}
      {hideHeaderFooter || <DiscountPopUp />}
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
