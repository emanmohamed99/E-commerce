import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import category from "./category/categorySlice";
import products from "./product/productSlice";
import cart from "./cart/cartSlice";
import auth from "./auth/authSlice";


const rootReducer = combineReducers({
  category,
  products,
  cart,
  auth,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
 middleware: (getDefaultMiddleware) =>
 getDefaultMiddleware({
  
   serializableCheck: false,
 }),
});

const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistedStore };
