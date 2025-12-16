import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import getAllProducts from '../../api/productApi';
import ProductGridSkeleton from '../home/skeleton/productSkeleton';
import Product from './Product';

const ProductHeading = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  const categories = useMemo(() => {
    const allCategories = products
      .map(p => (Array.isArray(p.categories) ? p.categories : []))
      .flat()
      .map(c => c.toLowerCase());

    const uniqueCategories = [...new Set(allCategories)];
    return ['All', ...uniqueCategories.map(c => c.charAt(0).toLowerCase() + c.slice(1))];
  }, [products]);

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(product => product.categories?.includes(selectedCategory));

  if (isLoading) {
    return <ProductGridSkeleton count={10} />;
  }

  if (!filteredProducts) {
    <p className="text-center text-gray-500">No products available.</p>;
    return;
  }

  return (
    <section id="product-section" className="py-20">
      <div className="text-center mb-5">
        <h1 className="text-4xl mb-4">Top Tech Deals</h1>
        <p className="text-gray-600">
          Upgrade your lifestyle with the latest gadgets at unbeatable prices.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded transition-colors duration-300 ${
              selectedCategory === category
                ? 'bg-green-600 border border-black text-white'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductHeading;
