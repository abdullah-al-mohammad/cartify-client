import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { getAllProducts } from '../../../api/productApi';
import ProductGridSkeleton from '../../home/skeleton/productSkeleton';
import Product from '../Product';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch products using react-query
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  // Extract unique categories from products
  const categories = useMemo(() => {
    const allCategories = products
      .map(p => (Array.isArray(p.categories) ? p.categories : []))
      .flat()
      .map(c => c.toLowerCase());
    const uniqueCategories = [...new Set(allCategories)];
    return ['All', ...uniqueCategories.map(c => c.charAt(0).toUpperCase() + c.slice(1))];
  }, [products]);

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(product =>
      Array.isArray(product.categories)
        ? product.categories.some(
            c => c.toLowerCase() === selectedCategory.toLowerCase()
          )
        : false
    );
  }, [products, selectedCategory]);

  return (
    <section id="product-section" className="py-20">
      {/* Section Header */}
      <div className="text-center mb-5">
        <h1 className="text-5xl mb-4 font-bold">Top Tech Deals</h1>
        <p className="text-gray-600">
          Upgrade your lifestyle with the latest gadgets at unbeatable prices.
        </p>
      </div>

      {/* Category Filter Buttons */}
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

      {/* Products Grid or Skeleton */}
      {isLoading ? (
        <ProductGridSkeleton count={10} />
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : ( 
        <p className="text-center text-gray-500">No products available.</p>
      )}
    </section>
  );
}
