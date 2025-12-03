import useAxiosSecure from '../hooks/useAxiosSecure';
const axiosSecure = useAxiosSecure();
// Get all products
export const getAllProducts = async () => {
  const res = await axiosSecure.get('/products');
  return res.data;
};

// Get single product
export const getSingleProduct = async id => {
  const res = await axiosSecure.get(`/products/${id}`);
  return res.data;
};

// Add new product (Admin)
export const addProduct = async productData => {
  const res = await axiosSecure.post('/products', productData);
  return res.data;
};

// Update product (Admin)
export const updateProduct = async (id, updateData) => {
  const res = await axiosSecure.patch(`/products/${id}`, updateData);
  return res.data;
};

// Delete product (Admin)
export const deleteProduct = async id => {
  const res = await axiosSecure.delete(`/products/${id}`);
  return res.data;
};
