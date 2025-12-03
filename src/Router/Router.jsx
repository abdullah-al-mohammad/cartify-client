import { createBrowserRouter } from 'react-router-dom';
import Login from '../auth/login/Login';
import Register from '../auth/register/Register';
import CartModal from '../components/cartModal/CartModal';
import Main from '../layout/Main';
import Dashboard from '../layout/dashboard/Dashboard';
// import Products from '../pages/Home/products/Products';
import { Users } from '../pages/Users/Users';
import AddProduct from '../pages/addProduct/AddProduct';
import Home from '../pages/home/Home/Home';
import Orders from '../pages/order/Order';
import OrderSuccess from '../pages/order/orderSuccess.jsx/OrderSuccess';
import PlaceOrderPage from '../pages/order/placeOrder/PlaceOrder';
import PaymentPage from '../pages/payment/Payment';
import DiscountProducts from '../pages/product/DiscountProducts/DiscountProducts';
import ProductDetails from '../pages/product/productDetails/ProductDetails';
import ProductManage from '../pages/product/productListManage/ProductManage';
import Products from '../pages/product/products/Products';
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
        path: 'discount-products',
        element: <DiscountProducts />,
      },
      {
        path: 'products/:id',
        element: <ProductDetails />,
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
