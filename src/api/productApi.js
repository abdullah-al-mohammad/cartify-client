import useAxiosSecure from '../hooks/useAxiosSecure';
const axiosSecure = useAxiosSecure();

const getAllProducts = async () => {
  const res = await axiosSecure.get('/products');
  return res.data;
};

export const getSingleProduct = async id => {
  const res = await axiosSecure.get(`/products/${id}`);
  return res.data;
};

export const addProduct = async productData => {
  const res = await axiosSecure.post('/products', productData);
  return res.data;
};

export const updateProduct = async (id, updateData) => {
  const res = await axiosSecure.patch(`/products/${id}`, updateData);
  return res.data;
};

export const deleteProduct = async id => {
  const res = await axiosSecure.delete(`/products/${id}`);
  return res.data;
};

export default getAllProducts;
