import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../Router/provider/CartProvider';
import CartModal from '../cartModal/CartModal';

export default function Product({ product }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1500); // reset animation after 1.5s
    } else {
      setIsCartOpen(true);
    }
  };

  return (
    <>
      <div className="card shadow-md">
        <div>
          <div className="h-48">
            <img
              loading="lazy"
              src={product.photos[0]}
              alt={product.name}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="card-body">
            <span className="tooltip tooltip-bottom" data-tip={product.name}>
              <h2 className="text-2xl font-bold line-clamp-1">{product.name}</h2>
            </span>
            <span className="mt-2 tooltip" data-tip={product.description}>
              <p className="line-clamp-2">{product.description}</p>
            </span>
            <p className="mt-4 text-xl font-semibold">
              ${product.finalPrice ?? product.price}{' '}
              {product.discount > 0 && (
                <span className="line-through text-gray-500 ml-2">${product.price}</span>
              )}
            </p>

            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                v
                className={`btn btn-sm btn-primary ${
                  currentQty <= 0 ? 'opacity-20 cursor-not-allowed' : ''
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
                className={`btn btn-sm btn-primary ${
                  currentQty >= product.stockStatus ? 'opacity-20 cursor-not-allowed' : ''
                }`}
                onClick={() => handleQtyChange(currentQty + 1)}
              >
                +
              </button>
            </div>

            {product.stockStatus ? (
              <button
                className={`relative btn mt-4 overflow-hidden transition-all duration-300 ${
                  inCart ? 'btn-outline text-success' : 'btn-primary'
                }`}
                onClick={handleAddToCart}
              >
                {/* Add to Cart */}
                {/* {!currentQty && ( */}
                <span className={`flex`}>
                  <FaShoppingCart
                    className={`text-lg transform transition-all duration-500 ease-in-out ${
                      inCart ? 'translate-x-0 visible' : '-translate-x-[100px] invisible'
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
    </>
  );
}
