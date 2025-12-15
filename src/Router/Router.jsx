import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/login/Login";
import Register from "../auth/register/Register";
import CartModal from "../components/cartModal/CartModal";
import Auth from "../layout/Auth";
import Dashboard from "../layout/Dashboard";
import Main from "../layout/Public";
import Error from "../pages/Error/Error";
import Users from "../pages/Users/Users";
import AddProduct from "../pages/addProduct/AddProduct";
import Home from "../pages/home/Home/Home";
import Orders from "../pages/order/Order";
import OrderSuccess from "../pages/order/orderSuccess.jsx/OrderSuccess";
import PlaceOrderPage from "../pages/order/placeOrder/PlaceOrder";
import PaymentPage from "../pages/payment/Payment";
import DiscountProducts from "../pages/products/DiscountProducts";
import ProductDetails from "../pages/products/ProductDetails";
import ProductHeading from '../pages/products/ProductHeading';
import ProductManage from '../pages/products/ProductManage';
import ShippingPage from "../pages/shipping/Shipping";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "products", element: <ProductHeading /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "discount-products", element: <DiscountProducts /> },
      { path: "cart", element: <CartModal /> },
      { path: "shipping", element: <ShippingPage /> },
      { path: "shipping/payment", element: <PaymentPage /> },
      { path: "shipping/payment/placeorder", element: <PlaceOrderPage /> },
      {
        path: "shipping/payment/placeorder/success",
        element: <OrderSuccess />
      },
    ],
  },

  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      { path: "users", element: <Users /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "manage-products", element: <ProductManage /> },
      { path: "orders", element: <Orders /> },
    ],
  },

  {
    path: "/",
    element: <Auth />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  { path: "*", element: <Error /> },
]);

export default router

