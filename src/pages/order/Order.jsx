import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Pagination from '../../components/Pagination';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

export default function Orders() {
  const [filter, setFilter] = useState({ startDate: '', endDate: '' });
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const fetchOrders = async () => {
    let query = '';
    if (filter.startDate || filter.endDate) {
      query = `?startDate=${filter.startDate}&endDate=${filter.endDate}`;
    }
    const res = await axiosSecure.get(`/orders/${query}`);
    return res.data;
  };

  // useQuery to fetch data
  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
  // Mutation for updating status
  const mutation = useMutation({
    mutationFn: ({ id, status }) => axiosSecure.patch(`orders/${id}/status`, { status }),
    onSuccess: () => {
      refetch();
    },
  });
  // Mutation for updating status
  const handleStatusChange = async (id, newStatus) => {
    mutation.mutate({ id, status: newStatus });
  };

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };
  // pagination page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentItems = orders.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Orders Management</h2>

      {/* Date Filter */}
      <div className="flex gap-2 mb-4">
        <input
          type="date"
          name="startDate"
          value={filter.startDate}
          onChange={handleFilterChange}
          className="input border border-slate-300 bg-transparent"
        />
        <input
          type="date"
          name="endDate"
          value={filter.endDate}
          onChange={handleFilterChange}
          className="input border border-slate-300 bg-transparent"
        />
        <button className="btn bg-green-600" onClick={() => refetch()}>
          Filter
        </button>
      </div>

      {/* Loading Skeleton */}
      {isLoading && <p>Loading orders...</p>}

      {/* Error State */}
      {isError && <p className="text-red-500">Failed to fetch orders</p>}

      {/* Orders Table */}
      {!isLoading && orders.length > 0 ? (
        <div className="flex-col overflow-auto h-screen">
          <table className="table w-full border">
            <thead className="bg-black">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{user.displayName}</td>
                  <td>${order.total}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order._id, e.target.value)}
                      className="select select-bordered border border-slate-300 bg-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && <p>order not found</p>
      )}
      <div>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={orders.length}
          onPageChange={page => setCurrentPage(page)}
        ></Pagination>
      </div>
    </div>
  );
}
