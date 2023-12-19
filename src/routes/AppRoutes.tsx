import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import RootLayout from "../Layouts/MainLayout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Products from "../pages/Products";
import Category from "../pages/Category";
import ShoppingCard from "../pages/Cart";
import Login from "../pages/login";
import Register from "../pages/Register";
import Profile from "../Layouts/ProfileLayout/ProfileLayout";

import {  useAppSelector } from "../Hooks/hooks";

import ProfileInfo from "../pages/profile/ProfileInfo";
import ProfileEdit from "../pages/profile/profileEdit";
import OrderHistory from "../pages/profile/OrderHistory";
function AppRoutes() {



  const user = useAppSelector((state) => state.auth.currentUser2);
 const userId=user.id


  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Products />,
        },
        {
          path: "main",
          element: <Products />,
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
          path: "main/shoppingCard",
          element: <ShoppingCard />,
        },
      
     
        {
          path: "main/register",
          
          element: !userId ? <Register />: <Navigate to="/main/profile"></Navigate>,
        },
      
        {
          path: "main/profile",
          element:
          userId ? <Profile /> : <Navigate to="/main/login"></Navigate>
              
            
            ,
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
                path: "orderhistory",
                element: <OrderHistory />,
              },
              
            ]
        },
        {
          path: "main/login",
          element:
          !userId ? <Login/> : <Navigate to="/main/profile"></Navigate>
           
            
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}
export default AppRoutes;
