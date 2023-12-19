
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; 
import AppRoutes from './routes/AppRoutes';
import { store, persistedStore } from './store';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate  persistor={persistedStore}>
     <AppRoutes/>
    </PersistGate>
  </Provider>
);