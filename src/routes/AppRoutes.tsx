import {

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
import ProfileInfo from "../pages/profile/ProfileInfo";
import ProfileEdit from "../pages/profile/profileEdit";
import OrdersHistory from "../pages/profile/OrdersHistory";
import Home from "../pages/Home";
import Cart from "../pages/cart/Cart";
import OrderDetails from "../pages/profile/OrderDetails";
import CheckoutSucess from "../pages/CheckoutSucess";
function AppRoutes() {



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

          element: 
            <Register />
          
        },
        {
          path: "main/CheckoutSucess",

          element: 
            <CheckoutSucess />
          
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
