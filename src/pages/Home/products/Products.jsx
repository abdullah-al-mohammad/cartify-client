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

  // Extract unique categories dynamically
  // const categories = useMemo(() => {
  //   const allCategories = products.map(p => p.categories);
  //   const uniqueCategories = [...new Set(allCategories)];
  //   return ['All', ...uniqueCategories];
  // }, [products]);
  const categories = useMemo(() => {
    const allCategories = products
      .map(p => {
        const cat = p.categories; // get categories

        // handle different types
        if (!cat) return ''; // null/undefined → ignore
        if (typeof cat === 'string') return cat.toLowerCase();
        if (Array.isArray(cat)) return cat.map(String).join(',').toLowerCase(); // array → join
        if (typeof cat === 'object') return JSON.stringify(cat).toLowerCase(); // object → stringify
        return String(cat).toLowerCase(); // number/boolean → string
      })
      .filter(Boolean); // remove empty strings

    const uniqueCategories = [...new Set(allCategories)]; // remove duplicates

    // capitalize first letter for display
    const formattedCategories = uniqueCategories.map(c => c.charAt(0).toUpperCase() + c.slice(1));

    return ['All', ...formattedCategories];
  }, [products]);

  //Filter products based on selected category
  // const filteredProducts =
  //   selectedCategory === 'All' ? products : products.filter(p => p.categories === selectedCategory);
  // console.log(filteredProducts);
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(p => {
          const cat = p.categories;
          let normCat;

          if (!cat) normCat = '';
          else if (typeof cat === 'string') normCat = cat.toLowerCase();
          else if (Array.isArray(cat)) normCat = cat.map(String).join(',').toLowerCase();
          else if (typeof cat === 'object') normCat = JSON.stringify(cat).toLowerCase();
          else normCat = String(cat).toLowerCase();

          return normCat === selectedCategory.toLowerCase();
        });

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
                selectedCategory === cat ? 'bg-primary text-white' : 'bg-gray-200 text-black'
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
            {filteredProducts.map(product => (
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
