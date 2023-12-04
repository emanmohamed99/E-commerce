import { configureStore } from "@reduxjs/toolkit";
import category from "./category/categorySlice";
import products from "./product/productSlice";
import cart from "./cart/cartSlice";

const store = configureStore({
  reducer: {
    category: category,
    products: products,
    cart: cart,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
