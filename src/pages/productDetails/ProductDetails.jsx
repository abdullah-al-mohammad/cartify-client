import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../Router/provider/CartProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CartModal from "../cartModal/CartModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";


export default function ProductDetails({ p }) {
  const axiosSecure = useAxiosSecure()
  const { cart, addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { _id, } = p
  const inCart = cart.find((item) => item._id === _id);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axiosSecure.get(`/products/${_id}`);
      setProduct(res.data);
      setQty(inCart?.qty || 1);
    };
    fetchProduct();
  }, [_id, inCart]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    addToCart({ ...product, qty });
  };

  return (
    <div>
      <div className="text-center">
        <img
          src={product.photos[0]}
          alt={product.name}
          className="w-full h-64"
        />
        <div className="card-body">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="mt-2">{product.description}</p>
          <p className="mt-4 text-xl font-semibold">
            ${product.finalPrice ?? product.price}{" "}
            {product.discount > 0 && (
              <span className="line-through text-gray-500 ml-2">
                ${product.price}
              </span>
            )}
          </p>

          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              className="btn btn-sm"
              onClick={() => setQty(Math.max(1, qty - 1))}
              disabled={qty <= 1}
            >
              -
            </button>
            <input
              type="number"
              value={qty}
              readOnly
              className="w-12 text-center border rounded"
            />
            <button
              className="btn btn-sm"
              onClick={() => setQty(Math.min(qty + 1, product.stock))}
              disabled={qty >= product.stock}
            >
              +
            </button>
          </div>

          <button
            className={`btn mt-4 ${inCart ? "btn-outline" : "btn-primary"}`}
            onClick={() => {
              if (inCart) setIsCartOpen(true);
              else handleAddToCart();
            }}
          >
            {inCart ? "View Cart" : "Add to Cart"}
          </button>
        </div>
      </div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
