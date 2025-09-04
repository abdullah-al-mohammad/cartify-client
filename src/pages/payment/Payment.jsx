import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Payment logic here (COD / card)
    navigate("placeorder");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Payment Method</h2>

      <form onSubmit={handlePaymentSubmit} className="space-y-4">
        <div>
          <label className="flex items-center space-x-2">
            <input type="radio" name="payment" value="cod" defaultChecked />
            <span>Cash on Delivery</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input type="radio" name="payment" value="card" />
            <span>Credit/Debit Card</span>
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Place Order
        </button>
      </form>
    </div>
  );
}
