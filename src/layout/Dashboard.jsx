import { LuHouse, LuLayoutDashboard, LuMonitor, LuShoppingCart, LuUser } from 'react-icons/lu';
import { NavLink, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const activeClass = ({ isActive }) =>
    `flex items-center gap-2 block p-2 rounded ${isActive ? 'text-green-600 bg-gray-700' : 'hover:bg-gray-700'
    }`;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>

        <nav className="space-y-2">
          <NavLink
            to="/"
            end
            className={activeClass}
          >
            <LuHouse />
            Home
          </NavLink>

          <NavLink
            to="users"
            className={activeClass}
          >
            <LuUser />
            Manage Users
          </NavLink>

          <NavLink
            to="add-product"
            className={activeClass}
          >
            <LuShoppingCart />
            Add Products
          </NavLink>

          <NavLink
            to="manage-products"
            className={activeClass}
          >
            <LuLayoutDashboard />
            Manage Products
          </NavLink>

          <NavLink
            to="orders"
            className={activeClass}
          >
            <LuMonitor />
            Manage Orders
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboard;
