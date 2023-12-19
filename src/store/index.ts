import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import category from './category/categorySlice';
import products from './product/productSlice';
import cart from './cart/cartSlice';
import auth from './auth/authSlice';




const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['currentUser2'], 
};


const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items'], 
};

const persistedAuthReducer = persistReducer(authPersistConfig, auth);
const persistedCartReducer = persistReducer(cartPersistConfig, cart);

const store = configureStore({
  reducer: {
    category,
    products,
    cart: persistedCartReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistedStore };
