import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import Dashboard from '../layout/dashboard/Dashboard';
import Home from '../pages/Home/Home/Home';
import Products from '../pages/Home/products/Products';
import { Users } from '../pages/Users/Users';
import AddProduct from '../pages/addProduct/AddProduct';
import CartModal from '../pages/cartModal/CartModal';
import Login from '../pages/login/Login';
import Orders from '../pages/order/Order';
import OrderSuccess from '../pages/orderSuccess.jsx/OrderSuccess';
import PaymentPage from '../pages/payment/Payment';
import PlaceOrderPage from '../pages/placeOrder/PlaceOrder';
import ProductManage from '../pages/productListManage/ProductManage';
import Register from '../pages/register/Register';
import ShippingPage from '../pages/shipping/Shipping';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: 'register',
        element: <Register></Register>,
      },
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'shipping',
        element: (
          <PrivateRoute>
            <ShippingPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'shipping/payment',
        element: (
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'shipping/payment/placeorder',
        element: (
          <PrivateRoute>
            <PlaceOrderPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'shipping/payment/placeorder/success',
        element: (
          <PrivateRoute>
            <OrderSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'cart',
        element: (
          <PrivateRoute>
            <CartModal />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/',
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'add-product',
        element: <AddProduct />,
      },
      {
        path: 'manage-products',
        element: <ProductManage />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
    ],
  },
]);
