import { useState } from 'react';
import { FaCheck, FaShoppingCart } from 'react-icons/fa';
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
      <div className="card bg-base-100 shadow-sm">
        <div className="text-center">
          <div className="h-48 bg-base-200">
            <img
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
                className="btn btn-sm"
                onClick={() => handleQtyChange(currentQty - 1)}
                disabled={currentQty <= 0}
              >
                -
              </button>
              <input
                type=""
                value={currentQty}
                readOnly
                className="w-12 h-8 text-center border rounded"
              />
              <button
                className="btn btn-sm"
                onClick={() => handleQtyChange(currentQty + 1)}
                disabled={currentQty >= product.stockStatus}
              >
                +
              </button>
            </div>

            {product.stockStatus ? (
              <button
                className={`relative btn mt-4 overflow-hidden transition-all duration-300 ${
                  inCart ? 'btn-outline' : 'btn-primary'
                } ${isAnimating ? 'animating' : ''}`}
                onClick={handleAddToCart}
              >
                {/* Cart Icon */}
                <span className="cart-icon absolute left-3 transition-transform duration-500">
                  <FaShoppingCart />
                </span>

                {/* Text */}
                <span className="btn-text transition-opacity duration-300">
                  {currentQty ? 'View Cart' : 'Add to Cart'}
                </span>

                {/* Tick Icon */}
                <span className="tick-icon absolute opacity-0 transition-all duration-500 text-success">
                  <FaCheck />
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
