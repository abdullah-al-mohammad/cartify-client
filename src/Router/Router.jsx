import { createBrowserRouter } from 'react-router-dom';
import CartModal from '../components/cartModal/CartModal';
import Main from '../layout/Public';
import Dashboard from '../layout/Dashboard';
import { Users } from '../pages/Users/Users';
import AddProduct from '../pages/addProduct/AddProduct';
import Home from '../pages/home/Home/Home';
import Orders from '../pages/order/Order';
import OrderSuccess from '../pages/order/orderSuccess.jsx/OrderSuccess';
import PlaceOrderPage from '../pages/order/placeOrder/PlaceOrder';
import PaymentPage from '../pages/payment/Payment';
import DiscountProducts from '../pages/product/discountProducts/DiscountProducts';
import ProductDetails from '../pages/product/productDetails/ProductDetails';
import ProductManage from '../pages/product/productListManage/ProductManage';
import Products from '../pages/product/products/Products';
import ShippingPage from '../pages/shipping/Shipping';
import AdminRoute from './PrivateRoute';
import PrivateRoute from './PrivateRoute';
import Auth from '../layout/Auth';
import Login from '../auth/login/Login';
import Register from '../auth/register/Register';
import Error from '../pages/Error/Error';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main/>,
    errorElement:<Error/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: 'shipping',
        element: (
            <ShippingPage />
        ),
      },
      {
        path: 'shipping/payment',
        element: (
            <PaymentPage />
        ),
      },
      {
        path: 'shipping/payment/placeorder',
        element: (
            <PlaceOrderPage />
        ),
      },
      {
        path: 'shipping/payment/placeorder/success',
        element: (
            <OrderSuccess />
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
            <CartModal />
        ),
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
   {
    path:'/',
    element:<Auth/>,
    children:[
      {
        path:'login',
        element:<Login/>
      },
      {
        path:'register',
        element:<Register/>
      }
    ]
  },
  {
    path:'*',
    element:<Error/>
  }
]);
