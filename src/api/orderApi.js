import useAxiosSecure from '../hooks/useAxiosSecure';
const axiosSecure = useAxiosSecure();

export const placeOrder = async orderData => {
  const res = await axiosSecure.post('/orders', orderData);
  return res.data;
};

export const getAllOrders = async (query = "") => {
  const res = await axiosSecure.get(`/orders${query}`);
  return res.data;
};


export const getSingleOrder = async orderId => {
  const res = await axiosSecure.get(`/orders/${orderId}`);
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await axiosSecure.patch(`orders/${id}/status`, { status });
  return res.data;
};
