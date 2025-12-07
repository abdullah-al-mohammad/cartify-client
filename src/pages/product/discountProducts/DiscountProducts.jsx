import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../../api/productApi';

const DiscountProducts = () => {

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await getAllProducts();
      return res.data;
    },
  });

  const discountProducts = products.filter(p => p.discount);

  return (
    <div className="px-6 py-40 container mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">🔥 Discount Products</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {discountProducts.map(product => (
          <div key={product._id} className="border p-5 rounded-lg shadow">
            <div className="h-48 bg-slate-400">
              <img
                src={product.photos}
                loading="lazy"
                alt=""
                className="object-contain w-full h-full rounded"
              />
            </div>
            <h3 className="text-xl font-semibold mt-4">{product.name}</h3>

            <p className="mt-2 text-red-600 font-bold">Discount: {product.discount}%</p>

            <Link
              to={`/products/${product._id}`}
              className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountProducts;
