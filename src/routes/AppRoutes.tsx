import { Suspense } from "react";
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import RootLayout from './pages/RootLayout.tsx';
// import ErrorPage from './pages/ErrorPage.tsx';
// import { Provider } from 'react-redux';
// import store from './store/index.ts';
// import Products from './pages/Products.tsx';
// import Category from './pages/Category.tsx';
// import ShoppingCard from './pages/Cart.tsx';

import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/Layouts/MainLayout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Products from "../pages/Products";
import Category from "../pages/Category";
import ShoppingCard from "../pages/Cart";

// const ShoppingCard = React.lazy(() => import("./pages/cart"));

// const CategoryPage = React.lazy(() => import("./pages/Category"));

// const ProductPage = React.lazy(() => import("./pages/Products"));
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback="loading please wait...">
            <Products />
          </Suspense>
        ),
      },
      {
        path: "main",
        element: (
          <Suspense fallback="loading please wait...">
            <Products />
          </Suspense>
        ),
      },
      {
        path: "main/category",
        element: (
          <Suspense fallback="loading please wait...">
            <Category />
          </Suspense>
        ),
      },
      {
        path: "main/category/:name",
        element: (
          <Suspense fallback="loading please wait...">
            <Products />
          </Suspense>
        ),
      },

      {
        path: "main/shoppingCard",
        element: (
          <Suspense fallback="loading please wait...">
            <ShoppingCard />
          </Suspense>
        ),
      },
    ],
  },
]);
