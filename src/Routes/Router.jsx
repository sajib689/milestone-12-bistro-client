import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layout/Main";
import Menu from "../Pages/Menu";
import Order from "../Pages/Order";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart";
import UserHome from "../Pages/Dashboard/UserHome";
import PrivateRoute from './../Provider/PrivateRoute';
import AllUsers from "../Pages/AllUsers";
import AddItem from "../Pages/Dashboard/AddItem";
import AdminRoute from './../Provider/AdminRoute';
import ManageItems from "../Pages/Dashboard/ManageItems";
import UpdateItems from "../Pages/Dashboard/UpdateItems";
import Payment from "../Pages/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import AdminHome from "../Pages/Dashboard/AdminHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'userHome',
        element: <UserHome />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'payment',
        element: <Payment />,
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory />,
      },
      // admin routes
      {
        path: 'users',
        element: <PrivateRoute><AllUsers /></PrivateRoute>,
      },
      {
        path: 'adminHome',
        element: <PrivateRoute><AdminHome /></PrivateRoute>,
      },
      {
        path: 'addItems',
        element: <AdminRoute><AddItem /></AdminRoute>,
      },
      {
        path: 'manageItems',
        element: <AdminRoute><ManageItems /></AdminRoute>,
      },
      {
        path: 'updateItems/:id',
        element: <AdminRoute><UpdateItems /></AdminRoute>,
        loader: ({params}) => fetch(`http://localhost:3000/menu/${params.id}`)
      },
    ]
  }
]);

export default router;
