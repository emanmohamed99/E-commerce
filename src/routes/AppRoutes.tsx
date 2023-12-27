import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import RootLayout from "../Layouts/MainLayout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Products from "../pages/Products";
import Category from "../pages/Category";

import Login from "../pages/login/login";
import Register from "../pages/register/Register";
import Profile from "../Layouts/ProfileLayout/ProfileLayout";

import { useAppSelector } from "../Hooks/hooks";

import ProfileInfo from "../pages/profile/ProfileInfo";
import ProfileEdit from "../pages/profile/profileEdit";
import OrdersHistory from "../pages/profile/OrdersHistory";
import Home from "../pages/Home";
import Cart from "../pages/cart/Cart";
import OrderDetails from "../pages/profile/OrderDetails";
function AppRoutes() {
  const user = useAppSelector((state) => state.auth.currentUser);
  const userId = user.id;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "main",
          element: <Home />,
        },
        {
          path: "main/category",
          element: <Category />,
        },
        {
          path: "main/category/:name",
          element: <Products />,
        },

        {
          path: "main/cart",
          element: <Cart />,
        },

        {
          path: "main/register",

          element: !userId ? (
            <Register />
          ) : (
            <Navigate to="/main/profile"></Navigate>
          ),
        },

        {
          path: "main/profile",
          element: <Profile />,
          children: [
            {
              index: true,
              element: <ProfileInfo />,
            },
            {
              path: "information",
              element: <ProfileInfo />,
            },
            {
              path: "edit",
              element: <ProfileEdit />,
            },
            {
              path: "ordershistory",
              element: <OrdersHistory />,
            },
            {
              path: "ordershistory/:id",
              element: <OrderDetails />,
            },
          ],
        },
        {
          path: "main/login",
          element: <Login />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}
export default AppRoutes;
