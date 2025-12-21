import { createBrowserRouter, Outlet } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import DiscountProducts from '../components/Products/DiscountProducts';
import ProductDetails from '../components/Products/ProductDetails';
import ProductManage from '../components/Products/ProductManage';
import Products from '../components/Products/Products';
import Dashboard from '../layout/Dashboard';
import Public from '../layout/Public';
import AddProduct from '../pages/Dashboard/AddProduct';
import Orders from '../pages/Dashboard/Orders';
import OrderSuccess from '../pages/Dashboard/OrderSuccess';
import PaymentPage from '../pages/Dashboard/Payment';
import PlaceOrder from '../pages/Dashboard/PlaceOrder';
import ShippingPage from '../pages/Dashboard/Shipping';
import Users from '../pages/Dashboard/Users';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import PrivateRoute from './PrivateRoute';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Public />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:id', element: <ProductDetails /> },
      { path: 'discount-products', element: <DiscountProducts /> },
      { path: 'shipping', element: <ShippingPage /> },
      { path: 'shipping/payment', element: <PaymentPage /> },
      { path: 'shipping/payment/placeorder', element: <PlaceOrder /> },
      {
        path: 'shipping/payment/placeorder/success',
        element: <OrderSuccess />,
      },
    ],
  },

  {
    path: '/',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      { path: 'users', element: <Users /> },
      { path: 'add-product', element: <AddProduct /> },
      { path: 'manage-products', element: <ProductManage /> },
      { path: 'orders', element: <Orders /> },
    ],
  },

  {
    path: '/',
    element: <Outlet />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },

  { path: '*', element: <NotFound /> },
]);

export default Router;
