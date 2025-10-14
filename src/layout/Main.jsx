import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import shopping from '../assets/shoppingcart.png';
import CartModal from '../pages/cartModal/CartModal';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';
import { useCart } from '../Router/provider/CartProvider';

const Main = () => {
  const { cart } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <button onClick={() => setIsCartOpen(true)}>
        <div className="float-right indicator fixed right-16 bottom-40">
          <img className="max-w-10" src={shopping} alt="" />
          <span className="indicator-item badge badge-dash">{cart.length}</span>
        </div>
      </button>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}></CartModal>
    </>
  );
};

export default Main;
