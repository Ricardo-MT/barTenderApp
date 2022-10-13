//Importacion css global
import './App.css';

//Importacion librerias
import {useEffect} from 'react';

//Importacion de componentes absolutos.
import Loader from './components/Loader/Loader';

//Importaciones útiles.
import appApi from './utils/api/config';
import useAxios from './utils/api/useAxios';

//Navegacion y rutas
import AppRoutes from './utils/routes/AppRoutes';
import Notification from './components/Notification/Notification';

function App() {

	// const { setUser } = useContext(UserContext);
	const { interceptors, axiosNotification, requestsCounter } = useAxios();

  useEffect(() => {
		//Iniciar Axios
		appApi.interceptors.request.use(interceptors.request, interceptors.error);
		appApi.interceptors.response.use(interceptors.response, interceptors.error);
	}, [interceptors]);

  return (
    <div className="App">
      <AppRoutes/>
      {requestsCounter > 0 && <Loader/>}
      {axiosNotification && <Notification show={!!axiosNotification} type={axiosNotification?.type} text={axiosNotification?.text} style={{ position: 'fixed' , right:'15px', top:'10px'}} />}
    </div>
  );
}

export default App;
