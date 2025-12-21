import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Button from '../components/Shared/CartButton/Button';
import DiscountPopUp from '../components/Shared/DiscountPopUp';
import Footer from '../components/Shared/Footer/Footer';
import Navbar from '../components/Shared/Navbar/Navbar';
import { useCart } from '../provider/CartProvider';

const Public = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Button />
      <DiscountPopUp />
      <Footer />
    </>
  );
};

export default Public;
