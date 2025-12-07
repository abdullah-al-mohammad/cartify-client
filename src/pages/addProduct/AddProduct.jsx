import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { addProduct } from '../../api/productApi';

export default function AddProduct() {
  const axiosSecure = useAxiosSecure();
  // image bg remove api
  const remove_bg_key = import.meta.env.VITE_BGREMOVE_API_KEY;
  const bg_hosting_api = `https://api.remove.bg/v1.0/removebg`;
  // image api key
  const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const defaultFrom = {
    name: '',
    slug: '',
    photos: null,
    description: '',
    price: '',
    discount: 0,
    stockStatus: true,
    status: 'active',
    categories: '',
  };

  const [form, setForm] = useState(defaultFrom);
  // const [preview, setPreview] = useState(null);

  // Handle form input change
  const handleChange = e => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setForm({ ...form, photos: file });
      // setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Add new product
  const handleSubmit = async e => {
    e.preventDefault();
    // step-1 remove bg
    const data = new FormData();
    data.append('size', 'auto');
    data.append('image_file', form.photos);
    const bgRes = await fetch(bg_hosting_api, {
      method: 'POST',
      headers: { 'X-Api-Key': remove_bg_key },
      body: data,
    });

    if (!bgRes.ok) throw new Error('Background removal failed');
    const blob = await bgRes.blob();

    // step-2 upload image to imgbb after remove bg
    const formdata = new FormData();

    formdata.append('image', blob);
    const imageRes = await fetch(image_hosting_api, {
      method: 'POST',
      body: formdata,
    });

    const imgData = await imageRes.json();
    if (!imgData.success) throw new Error('Image upload failed');
    const imgurl = imgData.data.display_url;

    const newProduct = {
      ...form,
      photos: [imgurl],
      categories: form.categories.split(','),
      price: Number(form.price),
      discount: Number(form.discount),
      stockStatus: form.stockStatus === 'true',
    };
    await addProduct( newProduct);

    // fetchProducts();
    setForm(defaultFrom);
  };
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      {/* Add Product Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="input input-bordered border border-slate-300 bg-transparent"
        />
        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Slug"
          className="input input-bordered  border border-slate-300 bg-transparent"
        />
        <input
          name="photos"
          onChange={handleChange}
          type="file"
          // accept="image/*"
          className="file-input input-bordered border border-slate-300 bg-transparent col-span-2"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered border border-slate-300 bg-transparent col-span-2"
        ></textarea>
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          type=""
          placeholder="Price"
          className="input input-bordered border border-slate-300 bg-transparent"
        />
        <input
          name="discount"
          value={form.discount}
          onChange={handleChange}
          type=""
          placeholder="Discount"
          className="input input-bordered border border-slate-300 bg-transparent"
        />
        <select
          name="stockStatus"
          value={form.stockStatus}
          onChange={handleChange}
          className="select select-bordered border border-slate-300 bg-white/70 dark:bg-gray-800/60 text-gray-900 dark:text-white"
        >
          {/* <option value="true">In Stock</option>
          <option value="false">Out of Stock</option> */}
          {Array.from(
            { length: 21 },
            (
              _,
              i // up to 20 stock for example
            ) => (
              <option key={i} value={i}>
                {i === 0 ? 'Out of Stock' : `${i} in Stock`}
              </option>
            )
          )}
        </select>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="select select-bordered border border-slate-300 bg-white/70 dark:bg-gray-800/60 text-gray-900 dark:text-white"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <input
          name="categories"
          value={form.categories}
          onChange={handleChange}
          placeholder="Categories (comma separated)"
          className="input input-bordered border border-slate-300 bg-transparent col-span-2"
        />
        <button type="submit" className="btn btn-primary col-span-2">
          Add Product
        </button>
      </form>
    </div>
  );
}
