import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useCart } from "../../Router/provider/CartProvider";


const CartModal = ({ isOpen, onClose }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { cart, increment, decrement, removeFromCart } = useCart();

  if (!isOpen) return null;

  // 🧮 Subtotal হিসাব
  const subtotal = cart.reduce(
    (acc, item) => acc + (item.finalPrice ?? item.price) * item.qty,
    0
  );

  // 🚚 Shipping charge (ধরো ফিক্সড $10, চাইলে কন্ডিশন বসাতে পারো)
  const shipping = cart.length > 0 ? 10 : 0;

  // 💰 Grand Total
  const total = subtotal + shipping;

  const handleCheckout = () => {

    if (user) {
      // ✅ logged in হলে shipping এ নিয়ে যাবে
      navigate("shipping");
    } else {
      // 🔒 logged in না থাকলে login পেজে নিয়ে যাবে
      navigate("/login?redirect=/checkout/shipping");
    }
    onClose(); // modal বন্ধ করে দেবে
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-bold mb-4">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          <>
            <ul className="space-y-3">
              {cart.map((item) => (
                <li key={item._id} className="flex justify-between items-center border-b py-2">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ${(item.finalPrice ?? item.price) * item.qty}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center mt-1 space-x-2">
                      <button
                        className="btn btn-xs"
                        onClick={() => decrement(item._id)}
                        disabled={item.qty <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.qty}
                        readOnly
                        className="w-12 text-center border rounded"
                      />
                      <button
                        className="btn btn-xs"
                        onClick={() => increment(item._id, item.stock)}
                        disabled={item.qty >= item.stock}
                      >
                        +
                      </button>
                    </div>

                    {item.qty >= item.stock && (
                      <p className="text-red-500 text-xs mt-1">Stock Out</p>
                    )}
                  </div>

                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => removeFromCart(item._id)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            {/* 🧾 Cart Summary */}
            <div className="mt-6 border-t pt-4">
              <p className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </p>
              <p className="flex justify-between font-bold text-lg mt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </p>
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="mt-4 flex justify-between">
          <button className="btn" onClick={onClose}>
            Close
          </button>
          {cart.length > 0 && <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
