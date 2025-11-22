import { LuTrash } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useCart } from '../../Router/provider/CartProvider';

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
      //if logged in  shipping send to shipping
      navigate('/shipping');
    } else {
      // if dont  logged in then send to login page
      navigate('/login', { state: { from: '/shipping' } });
    }
    onClose(); // modal
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="dark:bg-black dark:text-white bg-white text-black w-auto p-6 rounded-xl shadow-lg">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold mb-4">Your Cart</h2>
          <button className="btn btn-error" onClick={onClose}>
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          <>
            <ul className="space-y-3">
              {cart.map((item, index) => (
                <li
                  key={item._id}
                  className={`flex justify-between items-center gap-x-5 py-5 ${
                    index !== cart.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <img className="w-12" src={item.photos} alt="" />
                  <p className="text-sm">{item.name}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-1 space-x-2">
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
                  <p className="text-xl text-gray-500 font-semibold">
                    ${(item.finalPrice ?? item.price) * item.qty}
                  </p>
                  <button className="text-error text-xl" onClick={() => removeFromCart(item._id)}>
                    <LuTrash></LuTrash>
                  </button>
                </li>
              ))}
            </ul>

            {/*Cart Summary */}
            <div className="p-4 my-4 bg-slate-50 text-black border border-gray-200 rounded-md">
              <h1 className="font-bold pb-3">Order Summary</h1>
              <div className="mb-2">
                <p className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </p>
                <p className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </p>
              </div>
              <p className="flex justify-between font-bold text-lg border-t">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </p>
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="flex justify-between border-t pt-4">
          <button className="btn" onClick={onClose}>
            Close
          </button>
          {cart.length > 0 && (
            <button className="btn bg-green-600" onClick={handleCheckout}>
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
