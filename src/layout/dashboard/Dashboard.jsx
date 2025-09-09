import { Link, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="space-y-2">
          <Link to="users" className="block hover:bg-gray-700 p-2 rounded">
            Manage Users
          </Link>
          <Link to="product" className="block hover:bg-gray-700 p-2 rounded">
            Manage Products
          </Link>
          <Link to="orders" className="block hover:bg-gray-700 p-2 rounded">
            Manage Orders
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet /> {/* Nested pages will render here */}
      </main>
    </div>
  );
}
