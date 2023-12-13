
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'; 
import { router } from './routes/AppRoutes';
import { store, persistedStore } from './store';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate  persistor={persistedStore}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);