import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Public";
import Dashboard from "../layout/Dashboard";
import Auth from "../layout/Auth";

// Public Pages
import Home from "../pages/home/Home/Home";
import Products from "../pages/product/products/Products";
import DiscountProducts from "../pages/product/discountProducts/DiscountProducts";
import ProductDetails from "../pages/product/productDetails/ProductDetails";
import ShippingPage from "../pages/shipping/Shipping";
import PaymentPage from "../pages/payment/Payment";
import PlaceOrderPage from "../pages/order/placeOrder/PlaceOrder";
import OrderSuccess from "../pages/order/orderSuccess.jsx/OrderSuccess";
import CartModal from "../components/cartModal/CartModal";

// Auth Pages
import Login from "../auth/login/Login";
import Register from "../auth/register/Register";

// Dashboard Pages
import Users from "../pages/Users/Users";
import AddProduct from "../pages/addProduct/AddProduct";
import ProductManage from "../pages/product/productListManage/ProductManage";
import Orders from "../pages/order/Order";

// Others
import PrivateRoute from "./PrivateRoute";
import Error from "../pages/Error/Error";

export const router = createBrowserRouter([
  // ---------- PUBLIC LAYOUT ----------
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },

      // Product Routes
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "discount-products", element: <DiscountProducts /> },

      // Cart
      { path: "cart", element: <CartModal /> },

      // Shipping / Checkout Flow
      { path: "shipping", element: <ShippingPage /> },
      { path: "shipping/payment", element: <PaymentPage /> },
      { path: "shipping/payment/placeorder", element: <PlaceOrderPage /> },
      { path: "shipping/payment/placeorder/success", element: <OrderSuccess /> },
    ],
  },

  // ---------- DASHBOARD (PRIVATE ROUTES) ----------
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

  // ---------- AUTH ROUTES ----------
  {
    path: "/",
    element: <Auth />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // ---------- 404 ----------
  { path: "*", element: <Error /> },
]);
