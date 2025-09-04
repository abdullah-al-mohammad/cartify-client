import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import ProductDetails from "../../productDetails/ProductDetails";

export default function ProductList() {
  const axiosPublic = useAxiosPublic();


  const { data: products = [] } = useQuery({
    queryKey: 'products',
    queryFn: async () => {
      const res = await axiosPublic.get('/products')
      return res.data
    }
  })

  return (
    <div id="product-section" className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
      {products.map((p) => (
        <div key={p._id} className="card bg-base-100 w-96 shadow-sm">
          {/* <img src={p.photos?.[0]} alt={p.name} className="h-40 w-full object-cover rounded" />
          <h3 className="text-lg font-bold mt-2">{p.name}</h3>
          <p className="text-gray-600">${p.finalPrice ?? p.price}</p>
          <Link to={`/products/${p._id}`}>
            <button className="btn btn-sm btn-primary mt-2">View Details</button>
          </Link> */}
          <ProductDetails p={p}></ProductDetails>
        </div>
      ))}
    </div>
  );
}
