
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Home from "../pages/Home/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Dashboard from "../layout/dashboard/Dashboard";
import { Users } from "../pages/Users/Users";
import AdminRoute from "./AdminRoute";
import AddProduct from "../pages/addProduct/AddProduct";
import Orders from "../pages/order/Order";
import ProductDetails from "../pages/productDetails/ProductDetails";
import ShippingPage from "../pages/shipping/Shipping";
import PaymentPage from "../pages/payment/Payment";
import PlaceOrderPage from "../pages/placeOrder/PlaceOrder";
import OrderSuccess from "../pages/orderSuccess.jsx/OrderSuccess";
import PrivateRoute from "./PrivateRoute";
import ProductList from "../pages/Home/productList/ProductList";
import CartModal from "../pages/cartModal/CartModal";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      // ✅ Checkout Flow
      { path: "shipping", element: <PrivateRoute><ShippingPage /></PrivateRoute> },
      { path: "shipping/payment", element: <PrivateRoute><PaymentPage /></PrivateRoute> },
      { path: "shipping/payment/placeorder", element: <PrivateRoute><PlaceOrderPage /></PrivateRoute> },
      { path: "/shipping/payment/placeorder/success", element: <PrivateRoute><OrderSuccess /></PrivateRoute> },
      {
        path: "productDetails",
        element: <ProductList></ProductList>
      },
      {
        path: "cart",
        element: <CartModal></CartModal>
      }
    ],
  },
  {
    path: "/",
    element: <AdminRoute>
      <Dashboard></Dashboard>
    </AdminRoute>,
    children: [
      {
        path: "users",
        element: <Users></Users>,
      },
      {
        path: "products",
        element: <AddProduct></AddProduct>
      },
      {
        path: "/orders",
        element: <Orders></Orders>
      },
    ]
  }
]);