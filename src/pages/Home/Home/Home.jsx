import { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import Banner from '../Banner/Banner';
import Products from '../products/Products';

const Home = () => {
  const productRef = useRef(null);
  const scrollToProduct = () => {
    productRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const showPopup = () => {
      Swal.fire({
        toast: true,
        position: 'bottom-end', // bottom-right corner
        title: '20% Discount',
        text: 'on our headphone',
        imageUrl:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww',
        imageWidth: 80,
        imageHeight: 50,
        imageAlt: 'Custom image',
        showConfirmButton: false,
        timer: 4000,
      });
    };

    // show immediately
    showPopup();

    // repeat every 10 seconds
    const interval = setInterval(showPopup, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Banner ordernow={scrollToProduct}></Banner>
      <div className="max-w-screen-xl mx-auto" ref={productRef}>
        <Products></Products>
      </div>
    </>
  );
};

export default Home;
