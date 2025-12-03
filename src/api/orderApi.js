import useAxiosSecure from '../hooks/useAxiosSecure';
const axiosSecure = useAxiosSecure();

// Place Order
export const placeOrder = async orderData => {
  const res = await axiosSecure.post('/orders', orderData);
  return res.data;
};

// Get all orders of a user
export const getUserOrders = async userId => {
  const res = await axiosSecure.get(`/orders/user/${userId}`);
  return res.data;
};

// Get a specific order
export const getSingleOrder = async orderId => {
  const res = await axiosSecure.get(`/orders/${orderId}`);
  return res.data;
};

// Update order status (Admin)
export const updateOrderStatus = async (orderId, status) => {
  const res = await axiosSecure.patch(`/orders/${orderId}`, { status });
  return res.data;
};
