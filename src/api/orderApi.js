import useAxiosSecure from '../hooks/useAxiosSecure';
const axiosSecure = useAxiosSecure();

// Place Order
export const placeOrder = async orderData => {
  const res = await axiosSecure.post('/orders', orderData);
  return res.data;
};

// Get all orders of a user
export const getAllOrders = async (query = "") => {
  const res = await axiosSecure.get(`/orders${query}`);
  return res.data;
};


// Get a specific order
export const getSingleOrder = async orderId => {
  const res = await axiosSecure.get(`/orders/${orderId}`);
  return res.data;
};

// Update order status (Admin)
export const updateOrderStatus = async (id, status) => {
  const res = await axiosSecure.patch(`orders/${id}/status`, { status });
  return res.data;
};
