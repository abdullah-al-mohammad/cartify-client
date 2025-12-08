import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { addProduct } from "../../api/productApi";

export default function AddProduct() {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  // ENV KEYS
  const BG_REMOVE_API = import.meta.env.VITE_BGREMOVE_API_KEY;
  const IMAGE_UPLOAD_API = import.meta.env.VITE_IMAGE_API_KEY;

  const REMOVE_BG_URL = "https://api.remove.bg/v1.0/removebg";
  const IMAGE_UPLOAD_URL = `https://api.imgbb.com/1/upload?key=${IMAGE_UPLOAD_API}`;

  // Form state
  const defaultForm = {
    name: "",
    slug: "",
    photos: null,
    description: "",
    price: "",
    discount: 0,
    stockStatus: true,
    status: "active",
    categories: "",
  };

  const [form, setForm] = useState(defaultForm);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setForm({ ...form, photos: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Remove image background
  const removeBackground = async (file) => {
    const data = new FormData();
    data.append("size", "auto");
    data.append("image_file", file);

    const res = await fetch(REMOVE_BG_URL, {
      method: "POST",
      headers: { "X-Api-Key": BG_REMOVE_API },
      body: data,
    });

    if (!res.ok) throw new Error("Background removal failed");
    return res.blob();
  };

  // Upload image to imgbb
  const uploadImage = async (blob) => {
    const formData = new FormData();
    formData.append("image", blob);

    const res = await fetch(IMAGE_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!data.success) throw new Error("Image upload failed");

    return data.data.display_url;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.photos) return alert("Please select an image");

    try {
      setLoading(true);

      // STEP 1 → Remove BG
      const cleanedImage = await removeBackground(form.photos);

      // STEP 2 → Upload cleaned image
      const imageUrl = await uploadImage(cleanedImage);

      // STEP 3 → Prepare final product object
      const newProduct = {
        ...form,
        photos: [imageUrl],
        categories: form.categories.split(",").map((c) => c.trim()),
        price: Number(form.price),
        discount: Number(form.discount),
        stockStatus: Number(form.stockStatus),
      };

      await addProduct(newProduct);
      setForm(defaultForm);

      alert("Product added successfully!");

    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

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
          className="input input-bordered border border-slate-300 bg-transparent"
        />

        <input
          name="photos"
          type="file"
          onChange={handleChange}
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
          placeholder="Price"
          className="input input-bordered border border-slate-300 bg-transparent"
        />

        <input
          name="discount"
          value={form.discount}
          onChange={handleChange}
          placeholder="Discount"
          className="input input-bordered border border-slate-300 bg-transparent"
        />

        <select
          name="stockStatus"
          value={form.stockStatus}
          onChange={handleChange}
          className="select select-bordered border border-slate-300 bg-white/70 dark:bg-gray-800/60"
        >
          {Array.from({ length: 21 }, (_, i) => (
            <option key={i} value={i}>
              {i === 0 ? "Out of Stock" : `${i} in Stock`}
            </option>
          ))}
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="select select-bordered border border-slate-300 bg-white/70 dark:bg-gray-800/60"
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

        <button
          type="submit"
          className="btn btn-primary col-span-2"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>

      </form>
    </div>
  );
}
