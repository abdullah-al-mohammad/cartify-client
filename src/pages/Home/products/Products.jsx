import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Product from '../../product/Product';
import ProductGridSkeleton from '../skeleton/productSkeleton';

export default function Products() {
  const axiosPublic = useAxiosPublic();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosPublic.get('/products');
      return res.data;
    },
  });

  const categories = useMemo(() => {
    const categoriesArrays = products.map(p => (Array.isArray(p.categories) ? p.categories : []));
    const allCats = categoriesArrays.flat();
    const unique = [...new Set(allCats.map(c => c.toLowerCase()))];
    return ['All', ...unique.map(c => c.charAt(0).toUpperCase() + c.slice(1))];
  }, [products]);
  const filtered = useMemo(
    () =>
      selectedCategory === 'All'
        ? products
        : products.filter(p =>
            Array.isArray(p.categories)
              ? p.categories.some(c => c.toLowerCase() === selectedCategory.toLowerCase())
              : false
          ),
    [products, selectedCategory]
  );

  return (
    <>
      <div id="product-section" className="py-20">
        <div className="text-center mb-5">
          <h1 className="text-5xl mb-4">Top Tech Deals</h1>
          <p>Upgrade your lifestyle with the latest gadgets at unbeatable prices.</p>
        </div>
        {/*Dynamic Category Buttons */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded ${
                selectedCategory === cat
                  ? 'bg-green-600 border border-black text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {isLoading ? (
          <ProductGridSkeleton count={10} /> // skeleton grid
        ) : products.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products available.</p>
        )}
      </div>
      {/* <DiscountPopUp></DiscountPopUp> */}
    </>
  );
}
