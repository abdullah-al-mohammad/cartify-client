import { Outlet } from 'react-router-dom';
import Button from '../components/Shared/CartButton/Button';
import DiscountPopUp from '../components/Shared/DiscountPopUp';
import Footer from '../components/Shared/Footer/Footer';
import Navbar from '../components/Shared/Navbar/Navbar';

const Public = () => {
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
