
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Home from "../pages/Home/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";



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
      }
    ],
  },
]);