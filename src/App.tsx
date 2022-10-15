//Importacion css global
import './App.css';

//Importacion de componentes absolutos.
import Loader from './components/Loader/Loader';

//Importaciones útiles.
import useAxios from './utils/api/useAxios';

//Navegacion y rutas
import AppRoutes from './utils/routes/AppRoutes';
import Notification from './components/Notification/Notification';
import { NotificationProvider } from './utils/contexts/notificationContext';

function App() {
	const { requestsCounter } = useAxios();

  return (
    <div className="App">
      <NotificationProvider>
        <AppRoutes/>
        {requestsCounter > 0 && <Loader/>}
        <Notification />
      </NotificationProvider>
    </div>
  );
}

export default App;
