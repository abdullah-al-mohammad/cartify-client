import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Product from '../../product/Product';
import ProductGridSkeleton from '../skeleton/productSkeleton';

export default function Products() {
  const axiosPublic = useAxiosPublic();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosPublic.get('/products');
      return res.data;
    },
  });

  return (
    <>
      <div id="product-section" className="py-20">
        <div className="text-center mb-5">
          <h1 className="text-5xl mb-4">Top Tech Deals</h1>
          <p>Upgrade your lifestyle with the latest gadgets at unbeatable prices.</p>
        </div>

        {isLoading ? (
          <ProductGridSkeleton count={10} /> // skeleton grid
        ) : products.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products available.</p>
        )}
      </div>
    </>
  );
}
