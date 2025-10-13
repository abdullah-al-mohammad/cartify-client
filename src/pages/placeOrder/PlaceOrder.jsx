import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Router/provider/CartProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

export default function PlaceOrderPage() {
  const { cart, removeFromCart } = useCart();
  console.log(cart);

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const info = localStorage.getItem('shippingInfo');
    if (info) setShippingInfo(JSON.parse(info));
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + (item.finalPrice ?? item.price) * item.qty, 0);
  const shipping = cart.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    if (!shippingInfo || cart.length === 0) return alert('No cart or shipping info!');

    const orderData = {
      items: cart,
      shippingInfo,
      paymentMethod,
      subtotal,
      shipping,
      total,
      status: 'pending',
      createdAt: new Date(),
    };

    setLoading(true);
    try {
      const res = await axiosSecure.post('/orders', orderData);
      const savedOrder = {
        ...orderData,
        id: res.data.insertedId,
      };
      localStorage.setItem('order', JSON.stringify(savedOrder));
      removeFromCart();
      localStorage.removeItem('shippingInfo');
      navigate('success');
    } catch (err) {
      console.error(err);
      alert('Order failed. Try again!');
    } finally {
      setLoading(false);
    }
  };

  if (!shippingInfo) return <p className="p-6">Loading shipping info...</p>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>

      {/* Shipping Info */}
      <div className="mb-4 border p-3 rounded">
        <h3 className="font-semibold mb-2">Shipping Information</h3>
        <p>{shippingInfo.fullName}</p>
        <p>
          {shippingInfo.address}, {shippingInfo.city}
        </p>
        <p>
          {shippingInfo.postalCode}, {shippingInfo.country}
        </p>
      </div>

      {/* Payment Method */}
      <div className="mb-4 border p-3 rounded">
        <h3 className="font-semibold mb-2">Payment Method</h3>
        <select
          className="input input-bordered w-full"
          value={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
        >
          <option value="cod">Cash on Delivery</option>
          <option value="card">Credit / Debit Card</option>
        </select>
      </div>

      {/* Order Summary */}
      <div className="mb-4 border p-3 rounded">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <p>Items: ${subtotal.toFixed(2)}</p>
        <p>Shipping: ${shipping.toFixed(2)}</p>
        <p className="font-bold mt-2">Total: ${total.toFixed(2)}</p>
      </div>

      <button
        onClick={handlePlaceOrder}
        className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
        disabled={loading}
      >
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
}
