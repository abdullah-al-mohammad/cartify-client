import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement payment logic (COD / Card)
    navigate("placeorder");
  };

  return (
    <div className="max-w-lg mx-auto py-40 px-6 md:px-20">
      <h2 className="text-2xl font-bold mb-6 text-center">Payment Method</h2>

      <form onSubmit={handlePaymentSubmit} className="space-y-6">
        {/* Payment Options */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold">Select Payment Method</legend>

          <label className="flex items-center space-x-3">
            <input type="radio" name="payment" value="cod" defaultChecked className="form-radio" />
            <span>Cash on Delivery</span>
          </label>

          <label className="flex items-center space-x-3">
            <input type="radio" name="payment" value="card" className="form-radio" />
            <span>Credit / Debit Card</span>
          </label>
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full py-2 text-lg font-semibold transition duration-300 hover:bg-green-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
