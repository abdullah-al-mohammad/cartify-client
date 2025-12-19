import { useRef } from 'react';
import Banner from '../../components/Banner/Banner';
import ProductHeading from '../products/ProductHeading';

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
