
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from './store';
import { router } from './routes/AppRoutes';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <RouterProvider router={router} />
</Provider>
)
