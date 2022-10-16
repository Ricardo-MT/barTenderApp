import './App.css';
import Loader from './components/Loader/Loader';
import useAxios from './utils/api/useAxios';
import AppRoutes from './utils/routes/AppRoutes';
import Notification from './components/Notification/Notification';
import { NotificationProvider } from './utils/contexts/notificationContext';

function App() {
	const { requestsCounter } = useAxios();

  return (
    <div className="App">
      <NotificationProvider>
        <AppRoutes/>
        <Notification/>
        {requestsCounter > 0 && <Loader/>}
      </NotificationProvider>
    </div>
  );
}

export default App;
