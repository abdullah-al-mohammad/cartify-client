import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AdminDashboard() {

  // Function to determine if the link is active
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>

        <nav className="space-y-2">
          <Link 
            to="/" 
            className={`block p-2 rounded ${isActive('/') ? 'text-green-600' : 'hover:bg-gray-700'}`}
          >
            Home
          </Link>

          <Link 
            to="users" 
            className={`block p-2 rounded ${isActive('users') ? 'text-green-600' : 'hover:bg-gray-700'}`}
          >
            Manage Users
          </Link>

          <Link 
            to="add-product" 
            className={`block p-2 rounded ${isActive('add-product') ? 'text-green-600' : 'hover:bg-gray-700'}`}
          >
            Add Products
          </Link>

          <Link 
            to="manage-products" 
            className={`block p-2 rounded ${isActive('manage-products') ? 'text-green-600' : 'hover:bg-gray-700'}`}
          >
            Manage Products
          </Link>

          <Link 
            to="orders" 
            className={`block p-2 rounded ${isActive('orders') ? 'text-green-600' : 'hover:bg-gray-700'}`}
          >
            Manage Orders
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Nested routes will render here */}
        <Outlet /> 
      </main>
    </div>
  );
}
