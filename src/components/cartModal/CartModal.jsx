import { LuTrash } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import empty from '../../assets/empty.png';
import useAuth from '../../hooks/useAuth';
import { useCart } from '../../provider/CartProvider';

const CartModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cart, increment, decrement, removeFromCart } = useCart();

  if (!isOpen) return null;

  //Subtotal
  const subtotal = cart.reduce((acc, item) => acc + (item.finalPrice ?? item.price) * item.qty, 0);

  //Shipping charge
  const shipping = cart.length > 0 ? 10 : 0;

  // Grand Total
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (user) {
      navigate('/shipping');
    } else {
      navigate('/login', { state: { from: '/shipping' } });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">
      {/* MODAL BOX */}
      <div className="dark:bg-black dark:text-white bg-white text-black w-auto max-w-md p-6 rounded-xl shadow-lg max-h-[80vh] overflow-hidden">
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button className="btn text-error" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* EMPTY CART */}
        {cart.length === 0 ? (
          <>
            <img className="w-20 h-20 mx-auto mb-4" src={empty} alt="" />
            <p className="text-gray-500 text-center">You have not placed any order yet</p>
          </>
        ) : (
          <>
            {/* CART ITEMS WITH SCROLL */}
            <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {cart.map((item, index) => (
                <li
                  key={item._id}
                  className={`flex justify-between items-center gap-x-5 py-4 
                 ${index !== cart.length - 1 ? 'border-b' : ''}`}
                >
                  <img className="w-12" src={item.photos} alt="" />

                  <p className="text-sm flex-1">{item.name}</p>

                  {/* Quantity Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      className="btn btn-xs"
                      onClick={() => decrement(item._id)}
                      disabled={item.qty <= 0}
                    >
                      -
                    </button>

                    <input
                      value={item.qty}
                      readOnly
                      className="w-10 h-6 text-center border rounded bg-transparent"
                    />

                    <button
                      className="btn btn-xs"
                      onClick={() => increment(item._id, item.stock)}
                      disabled={item.qty >= item.stock}
                    >
                      +
                    </button>
                  </div>

                  <p className="text-lg text-gray-500 font-semibold">
                    ${(item.finalPrice ?? item.price) * item.qty}
                  </p>

                  <button className="text-error text-xl" onClick={() => removeFromCart(item._id)}>
                    <LuTrash />
                  </button>
                </li>
              ))}
            </ul>

            {/* SUMMARY */}
            <div className="p-4 my-4 border rounded-md">
              <h1 className="font-bold pb-3">Order Summary</h1>

              <p className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </p>

              <p className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </p>

              <p className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </p>
            </div>
          </>
        )}

        {/* BOTTOM BUTTON */}
        <div className="border-t pt-4">
          {cart.length > 0 ? (
            <button className="btn bg-green-600 w-full" onClick={handleCheckout}>
              Checkout
            </button>
          ) : (
            <Link to="/products" onClick={() => onClose()} className="btn btn-outline w-full">
              Shop now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
