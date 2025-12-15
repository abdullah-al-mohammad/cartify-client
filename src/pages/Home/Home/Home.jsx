import { useRef } from 'react';
import ProductHeading from '../../products/ProductHeading';
import Banner from '../Banner/Banner';

const Home = () => {
  const productRef = useRef(null);
  const scrollToProduct = () => {
    productRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Banner ordernow={scrollToProduct}></Banner>
      <div className="max-w-screen-xl mx-auto" ref={productRef}>
        <ProductHeading />
      </div>
    </>
  );
};

export default Home;
