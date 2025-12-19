import { useRef } from 'react';
import Banner from '../../components/Banner/Banner';
import Products from '../../components/Products/Products';

const Home = () => {
  const productRef = useRef(null);
  const scrollToProduct = () => {
    productRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Banner ordernow={scrollToProduct} />
      <Products ref={productRef} />
    </>
  );
};

export default Home;
