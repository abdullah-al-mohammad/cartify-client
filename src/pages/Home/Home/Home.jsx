import { useRef } from 'react';
import Banner from '../Banner/Banner';
import Products from '../products/Products';

const Home = () => {
  const productRef = useRef(null);
  const scrollToProduct = () => {
    productRef.current.scrollIntoView({ behavior: 'smooth' });
  };

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
