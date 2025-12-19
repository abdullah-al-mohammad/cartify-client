import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Swal from 'sweetalert2';
import getAllProducts, { deleteProduct, updateProduct } from '../../api/productApi';
import ProductNotFound from '../../pages/NotFound/ProductNotFound';
import Pagination from '../Shared/Pagination';

const ProductManage = () => {
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  const itemsPerPage = 10;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = products.slice(indexOfFirst, indexOfLast);

  const updateMutation = useMutation({
    mutationFn: async ({ id, field, value }) => {
      const updateValue = field === 'stockStatus' ? Number(value) : value;
      await updateProduct(id, { [field]: updateValue });
    },
    onSuccess: () => {
      refetch();
      Swal.fire('Updated!', 'Product updated successfully', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update product', 'error');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async id => {
      setDeletingId(id);
      await deleteProduct(id);
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

  const handleUpdate = async (id, field, value) => {
    updateMutation.mutate({ id, field, value });
  };

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

  if (isLoading) {
    return <p className="text-gray-500 col-span-8">Loading products...</p>;
  }

  if (isError) {
    return <ProductNotFound />;
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-500 col-span-8">No Product avilable..</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Product Management</h1>
      <div className="flex flex-col h-screen overflow-auto">
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
            {currentItems.map((p, index) => (
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
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalItems={products.length}
          itemsPerPage={itemsPerPage}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default ProductManage;
