import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Product from "../../product/Product";

export default function Products() {
  const axiosPublic = useAxiosPublic();

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosPublic.get('/products')
      return res.data
    }
  })

  return (
    <div id="product-section" className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
      {products.map((product) => (
        <Product key={product._id} product={product}></Product>
      ))}
    </div>
  );
}
