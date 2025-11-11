import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ProductManage = () => {
  const axiosSecure = useAxiosSecure();
  const [deletingId, setDeletingId] = useState(null);

  // Fetch Products Function
  const fetchProducts = async () => {
    const res = await axiosSecure.get('/products');
    return res.data;
  };

  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  // useMutation for update
  const updateMutation = useMutation({
    mutationFn: async ({ id, field, value }) => {
      const updateValue = field === 'stockStatus' ? Number(value) : value;
      await axiosSecure.patch(`/products/${id}`, { [field]: updateValue });
    },
    onSuccess: () => {
      refetch(); /// refresh list automatically
      Swal.fire('Updated!', 'Product updated successfully', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update product', 'error');
    },
  });
  // useMutation for delete
  const deleteMutation = useMutation({
    mutationFn: async id => {
      setDeletingId(id);
      await axiosSecure.delete(`/products/${id}`);
    },
    onSuccess: () => {
      setDeletingId(null);
      refetch();
      Swal.fire('Deleted!', 'Product deleted successfully', 'success');
    },
    onError: () => {
      setDeletingId(null);
      Swal.fire('Error', 'Failed to delete product', 'error');
    },
  });
  // Update Product status/stock
  const handleUpdate = async (id, field, value) => {
    updateMutation.mutate({ id, field, value });
  };

  // Delete product
  const handleDelete = async id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  return (
    <div>
      {isLoading && <p className="text-gray-500">Loading products...</p>}
      {isError && <p className="text-red-500">Error: {error.message}</p>}
      <h1 className="text-xl font-bold mb-4">Product Management</h1>
      {/* Product List Table */}
      {!isLoading && !isError && (
        <table className="table w-full border">
          <thead className="bg-black">
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
                      onChange={e => handleUpdate(p._id, 'status', e.target.value)}
                      className="select select-bordered select-sm border border-slate-300 bg-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={p.stockStatus}
                      onChange={e => handleUpdate(p._id, 'stockStatus', Number(e.target.value))}
                      className="select select-bordered select-sm border border-slate-300 bg-transparent"
                    >
                      {Array.from({ length: 21 }, (_, i) => (
                        <option key={i} value={i}>
                          {i === 0 ? 'Out of Stock' : `${i} in Stock`}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    ${p.price}
                    {p.discount > 0 && (
                      <span className="text-green-600 ml-2">
                        (After {p.discount}%: ${p.finalPrice})
                      </span>
                    )}
                  </td>
                  <td>{p.discount}%</td>
                  <td>{p.categories.join(', ')}</td>
                  <td>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDelete(p._id)}
                      disabled={deletingId === p._id}
                    >
                      {deletingId === p._id ? 'Deleting' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductManage;
// import useAxiosSecure from '../../hooks/useAxiosSecure';

// const ProducManage = () => {
//   const [products, setProducts] = useState([]);
//   const axiosSecure = useAxiosSecure();

//   // Fetch all products
//   const fetchProducts = async () => {
//     const res = await axiosSecure.get('/products');
//     setProducts(res.data);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Update Product status/stock
//   const handleUpdate = async (id, field, value) => {
//     // Convert stockStatus to number
//     const updatedValue = field === 'stockStatus' ? Number(value) : value;
//     // Update state immediately
//     setProducts(prev => prev.map(p => (p._id === id ? { ...p, [field]: updatedValue } : p)));
//     // Send patch to backend
//     await axiosSecure.patch(`/products/${id}`, { [field]: value });
//   };

//   // Delete product
//   const handleDelete = async id => {
//     await axiosSecure.delete(`/products/${id}`);
//     fetchProducts();
//   };

//   return (
//     <div>
//       {/* Product List Table */}
//       <table className="table w-full border">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Status</th>
//             <th>Stock</th>
//             <th>Price</th>
//             <th>Discount</th>
//             <th>Categories</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.length > 0 ? (
//             products.map((p, index) => (
//               <tr key={p._id}>
//                 <td>{index + 1}</td>
//                 <td>{p.name}</td>
//                 <td>
//                   <select
//                     value={p.status}
//                     onChange={e => handleUpdate(p._id, 'status', e.target.value)}
//                     className="select select-bordered select-sm"
//                   >
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </select>
//                 </td>
//                 <td>
//                   <select
//                     value={p.stockStatus}
//                     onChange={e => handleUpdate(p._id, 'stockStatus', Number(e.target.value))}
//                     className="select select-bordered select-sm"
//                   >
//                     {Array.from({ length: 21 }, (_, i) => (
//                       <option key={i} value={i}>
//                         {i === 0 ? 'Out of Stock' : `${i} in Stock`}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//                 <td>
//                   ${p.price}
//                   {p.discount > 0 && (
//                     <span className="text-green-600 ml-2">
//                       (After {p.discount}%: ${p.finalPrice})
//                     </span>
//                   )}
//                 </td>
//                 <td>{p.discount}%</td>
//                 <td>{p.categories.join(', ')}</td>
//                 <td>
//                   <button className="btn btn-error btn-sm" onClick={() => handleDelete(p._id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8" className="text-center">
//                 No products found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProducManage;
