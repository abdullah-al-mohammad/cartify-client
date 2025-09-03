
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Home from "../pages/Home/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Dashboard from "../layout/dashboard/Dashboard";
import { Users } from "../pages/Users/Users";
import AdminRoute from "./AdminRoute";



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
  {
    path: "/",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "users",
        element: <Users></Users>,
        // loader: ({ params }) => fetch(`http://localhost:5000/users/admin${params.id}`)
      }
    ]
  }
]);