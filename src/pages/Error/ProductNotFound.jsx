import { Link } from "react-router-dom";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/search-not-found-illustration-download-in-svg-png-gif-file-formats--under-construction-website-devolopement-pack-design-illustrations-4588345.png"
        className="w-80"
        alt=""
      />

      <h2 className="text-3xl font-semibold text-gray-800 mt-4">
        Product Not Found
      </h2>
      <p className="text-gray-500 mt-2 text-center">
        The product you're looking for doesn't exist or has been removed.
      </p>
      <p className="text-gray-500 mt-2 text-center">
       {error.message}
      </p>

      <Link
        to="/products"
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
      >
        Browse Products
      </Link>
    </div>
  );
}
