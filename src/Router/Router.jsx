import { createBrowserRouter, Outlet } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import CartModal from '../components/cartModal/CartModal';
import DiscountProducts from '../components/Products/DiscountProducts';
import ProductDetails from '../components/Products/ProductDetails';
import ProductManage from '../components/Products/ProductManage';
import Products from '../components/Products/Products';
import Dashboard from '../layout/Dashboard';
import Public from '../layout/Public';
import AddProduct from '../pages/addProduct/AddProduct';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import Orders from '../pages/order/Order';
import OrderSuccess from '../pages/order/OrderSuccess/OrderSuccess';
import PlaceOrderPage from '../pages/order/placeOrder/PlaceOrder';
import PaymentPage from '../pages/payment/Payment';
import ShippingPage from '../pages/shipping/Shipping';
import Users from '../pages/Users/Users';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Public />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:id', element: <ProductDetails /> },
      { path: 'discount-products', element: <DiscountProducts /> },
      { path: 'cart', element: <CartModal /> },
      { path: 'shipping', element: <ShippingPage /> },
      { path: 'shipping/payment', element: <PaymentPage /> },
      { path: 'shipping/payment/placeorder', element: <PlaceOrderPage /> },
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

export default router;
