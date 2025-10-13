import { useState } from 'react';
import { useCart } from '../../Router/provider/CartProvider';
import CartModal from '../cartModal/CartModal';

export default function Product({ product }) {
  const { cart, addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { _id } = product;

  const inCart = cart.find(item => item._id === _id);
  const currentQty = inCart?.qty || 1;

  const handleQtyChange = newQty => {
    if (newQty < 1 || newQty > product.stock) return;
    addToCart({ ...product, qty: newQty });
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
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="mt-2 line-clamp-2">{product.description}</p>
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
                disabled={currentQty <= 1}
              >
                -
              </button>
              <input
                type=""
                value={currentQty}
                readOnly
                className="w-12 h-7 text-center border rounded"
              />
              <button
                className="btn btn-sm"
                onClick={() => handleQtyChange(currentQty + 1)}
                disabled={currentQty >= product.stock}
              >
                +
              </button>
            </div>

            <button
              className={`btn mt-4 ${inCart ? 'btn-outline' : 'btn-primary'}`}
              onClick={() => {
                if (inCart) setIsCartOpen(true);
                else handleQtyChange(1);
              }}
            >
              {inCart ? 'View Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>

        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </>
  );
}
