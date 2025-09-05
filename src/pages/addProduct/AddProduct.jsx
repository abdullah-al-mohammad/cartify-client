import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";


export default function AddProduct() {
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure()
  const [form, setForm] = useState({
    name: "",
    slug: "",
    photos: "",
    description: "",
    price: "",
    discount: 0,
    stockStatus: true,
    status: "active",
    categories: "",
  });

  // Fetch all products
  const fetchProducts = async () => {
    const res = await axiosSecure.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      ...form,
      photos: form.photos.split(","), // multiple photos as array
      categories: form.categories.split(","),
      price: Number(form.price),
      discount: Number(form.discount),
      stockStatus: form.stockStatus === "true",
    };
    await axiosSecure.post('/products', newProduct);

    fetchProducts();
    setForm({
      name: "",
      slug: "",
      photos: "",
      description: "",
      price: "",
      discount: 0,
      stockStatus: true,
      status: "active",
      categories: "",
    });
  };

  // Delete product
  const handleDelete = async (id) => {
    await axiosSecure.delete(`/products/${id}`);
    fetchProducts();
  };

  // Update Product status/stock
  const handleUpdate = async (id, field, value) => {
    // Update state immediately
    setProducts(prev =>
      prev.map(p =>
        p._id === id
          ? { ...p, [field]: field === "stockStatus" ? value === true || value === "true" : value }
          : p
      )
    );
    // Send patch to backend
    await axiosSecure.patch(`/products/${id}`, { [field]: value });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Product Management</h2>

      {/* Add Product Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input input-bordered" />
        <input name="slug" value={form.slug} onChange={handleChange} placeholder="Slug" className="input input-bordered" />
        <input name="photos" value={form.photos} onChange={handleChange} placeholder="Photos (comma separated URLs)" className="input input-bordered col-span-2" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="textarea textarea-bordered col-span-2"></textarea>
        <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="Price" className="input input-bordered" />
        <input name="discount" value={form.discount} onChange={handleChange} type="number" placeholder="Discount" className="input input-bordered" />
        <select name="stockStatus" value={form.stockStatus} onChange={handleChange} className="select select-bordered">
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange} className="select select-bordered">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <input name="categories" value={form.categories} onChange={handleChange} placeholder="Categories (comma separated)" className="input input-bordered col-span-2" />
        <button type="submit" className="btn btn-primary col-span-2">Add Product</button>
      </form>

      {/* Product List Table */}
      <table className="table w-full border">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Categories</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td>{p.name}</td>
                <td>
                  <select
                    value={p.status}
                    onChange={(e) => handleUpdate(p._id, "status", e.target.value)}
                    className="select select-bordered select-sm"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
                <td><select
                  value={p.stockStatus ? "true" : "false"}
                  onChange={(e) => handleUpdate(p._id, "stockStatus", e.target.value === "true")}
                  className="select select-bordered select-sm"
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select></td>
                <td>
                  ${p.price}
                  {p.discount > 0 && (
                    <span className="text-green-600 ml-2">
                      (After {p.discount}%: ${p.finalPrice})
                    </span>
                  )}
                </td>
                <td>{p.discount}%</td>
                <td>{p.categories.join(", ")}</td>
                <td>
                  <button className="btn btn-error btn-sm" onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="8" className="text-center">No products found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
