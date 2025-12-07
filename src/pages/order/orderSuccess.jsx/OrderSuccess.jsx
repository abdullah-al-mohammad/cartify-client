import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("order");
    if (savedOrder) setOrder(JSON.parse(savedOrder));

    // Cleanup: component unmount হলে shipping info remove
    return () => {
      localStorage.removeItem("order");
    };
  }, []);

  if (!order) return <p className="p-6">Loading order details...</p>;

  return (
    <div className="max-w-lg mx-auto text-center py-40 px-20">
      <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
      <p className="mb-2">Order ID: <span className="font-semibold">{order.id}</span></p>
      <p className="mb-4">We’ve received your order and it’s being processed.</p>

      {/* Order Summary */}
      <div className="border p-4 rounded mb-4 text-left">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        {order.items.map((item) => (
          <div key={item._id} className="flex justify-between mb-1">
            <span>{item.name} x {item.qty}</span>
            <span>${(item.finalPrice ?? item.price) * item.qty}</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
}
