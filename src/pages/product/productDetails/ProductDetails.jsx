import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import CartModal from '../../../components/cartModal/CartModal';
import { useCart } from '../../../provider/CartProvider';
import { getSingleProduct } from '../../../api/productApi';

const ProductDetails = () => {
  const { id } = useParams();

  const { data: product = {} } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
    enabled: !!id, // prevents calling API before id is available
  });

  const { cart, addToCart, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { _id } = product;

  const inCart = cart.find(item => item._id === _id);
  const currentQty = inCart?.qty || 0;

  const handleQtyChange = newQty => {
    // Remove item if quantity is 0 or less
    if (newQty <= 0) {
      removeFromCart(_id);
      return;
    }
    if (newQty > product.stockStatus) {
      alert(`only ${product.stockStatus} item available in stock`);
      return;
    }
    // Update cart with new quantity
    addToCart({ ...product, qty: newQty, stock: product.stockStatus || 5 });
  };

  const handleAddToCart = () => {
    if (!inCart) {
      handleQtyChange(1);
    } else {
      setIsCartOpen(true);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="py-40 flex items-center gap-x-10 card">
        <div className="bg-slate-400 w-40">
          <img
            loading="lazy"
            src={product.photos}
            alt={product.name}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="card-body">
          <h2 className="text-2xl font-bold line-clamp-1">{product.name}</h2>
          <p className="line-clamp-4">{product.description}</p>
          <p className="mt-4 text-xl font-semibold">
            ${product.finalPrice ?? product.price}{' '}
            {product.discount > 0 && (
              <span className="line-through text-gray-500 ml-2">${product.price}</span>
            )}
            <span className="ml-2 bg-red-600 py-1 px-3 rounded-xl text-xs text-white">
              {product.discount}% OFF
            </span>
          </p>
          <p>
            status:
            <span className="text-success ml-2">
              {product.stockStatus === "true"
                ? product.status
                : 'Inactive'}
            </span>

          </p>

          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              className={`btn btn-sm bg-green-600 ${currentQty <= 0 ? 'opacity-45 cursor-not-allowed' : ''
                }`}
              onClick={() => handleQtyChange(currentQty - 1)}
            >
              -
            </button>
            <input
              type=""
              value={currentQty}
              readOnly
              className="w-12 h-8 text-center border rounded bg-white dark:text-black"
            />
            <button
              className={`btn btn-sm bg-green-600 ${currentQty >= product.stockStatus ? 'opacity-45 cursor-not-allowed' : ''
                }`}
              onClick={() => handleQtyChange(currentQty + 1)}
            >
              +
            </button>
          </div>

          {product.stockStatus ? (
            <button
              className={`relative btn mt-4 overflow-hidden transition-all duration-300 ${inCart ? 'btn-outline' : 'bg-green-600'
                }`}
              onClick={handleAddToCart}
            >
              {/* Add to Cart */}
              <span className={`flex gap-2`}>
                <BsFillCartCheckFill
                  className={`text-lg transform transition-all duration-500 ease-in-out text-success ${inCart ? 'translate-x-0 visible' : '-translate-x-[100px] invisible'
                    }`}
                />
                {inCart ? 'View cart' : 'Add to Cart'}
              </span>
            </button>
          ) : (
            <button className="btn mt-4 btn-disabled text-error cursor-not-allowed opacity-70">
              Out of Stock
            </button>
          )}
        </div>
      </div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default ProductDetails;
