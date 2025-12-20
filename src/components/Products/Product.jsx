import { useState } from 'react';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useCart } from '../../provider/CartProvider';
import CartModal from '../CartModal/CartModal';

const Product = ({ product }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, addToCart, removeFromCart } = useCart();

  if (!product) {
    return <p className="text-center text-gray-500 col-span-8">Product Not Available...</p>;
  }
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
    <>
      <div className="card shadow-md dark:bg-gray-600">
        <div>
          <div className="h-48 bg-slate-400 relative group">
            <img
              loading="lazy"
              src={product.photos[0]}
              alt={product.name}
              className="object-contain w-full h-full group-hover:bg-black group-hover:opacity-75 transition-all ease-in-out duration-1000"
            />
            <Link
              to={`products/${_id}`}
              className="absolute top-20 right-40 py-2 px-3 rounded text-white bg-black opacity-80 invisible group-hover:visible transition-all ease-in-out duration-100"
            >
              View
            </Link>
          </div>
          <div className="card-body">
            <h2 className="text-2xl font-bold line-clamp-1 min-h-6 text-ellipsis">
              {product.name}
            </h2>
            <p className="line-clamp-2 min-h-14 leading-loose text-ellipsis">
              {product.description}
            </p>
            <p className="mt-4 text-xl font-semibold">
              ${product.finalPrice ?? product.price}{' '}
              {product.discount > 0 && (
                <span className="line-through text-gray-500 ml-2">${product.price}</span>
              )}
            </p>

            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                className={`btn btn-sm bg-green-600 ${
                  currentQty <= 0 ? 'opacity-45 cursor-not-allowed' : ''
                }`}
                onClick={() => handleQtyChange(currentQty - 1)}
              >
                -
              </button>
              <input
                value={currentQty}
                readOnly
                className="w-12 h-8 text-center border rounded bg-white dark:text-black"
              />
              <button
                className={`btn btn-sm bg-green-600 ${
                  currentQty >= product.stockStatus ? 'opacity-45 cursor-not-allowed' : ''
                }`}
                onClick={() => handleQtyChange(currentQty + 1)}
              >
                +
              </button>
            </div>
            <button
              disabled={product.stockStatus <= 0}
              className={`btn mt-4 ${
                product.stockStatus <= 0
                  ? 'btn-disabled text-error cursor-not-allowed opacity-70'
                  : 'bg-green-600'
              }`}
              onClick={handleAddToCart}
            >
              {/* Add to Cart */}
              <span className={`flex gap-2`}>
                <BsFillCartCheckFill
                  className={`text-lg transform transition-all duration-500 ease-in-out text-success
                     ${inCart ? 'translate-x-0 visible' : '-translate-x-[100px] invisible'}`}
                />
                {product.stockStatus <= 0 ? 'Out of Stock' : inCart ? 'View cart' : 'Add to Cart'}
              </span>
            </button>
          </div>
        </div>

        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </>
  );
};

export default Product;
