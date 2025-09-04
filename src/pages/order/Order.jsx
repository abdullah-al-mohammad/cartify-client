import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState({ startDate: "", endDate: "" });
  const axiosSecure = useAxiosSecure()

  const fetchOrders = async () => {
    let query = "";
    if (filter.startDate || filter.endDate) {
      query = `?startDate=${filter.startDate}&endDate=${filter.endDate}`;
    }
    const res = await axiosSecure.get(`orders${query}`);
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await axiosSecure.patch(`orders/${id}/status`, { status: newStatus });
    fetchOrders(); // Refresh list
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const applyFilter = () => {
    fetchOrders();
  };

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
          className="input input-bordered"
        />
        <input
          type="date"
          name="endDate"
          value={filter.endDate}
          onChange={handleFilterChange}
          className="input input-bordered"
        />
        <button className="btn btn-primary" onClick={applyFilter}>
          Filter
        </button>
      </div>

      {/* Orders Table */}
      <table className="table w-full border">
        <thead>
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
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.customerName}</td>
                <td>${order.totalPrice}</td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="select select-bordered"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
