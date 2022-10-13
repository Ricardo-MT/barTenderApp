//Importacion css global
import './App.css';

//Importacion librerias
import React, {useState, useContext, useEffect} from 'react';
import moment from 'moment';

//Importacion de componentes absolutos.
import Loader from './components/Loader/Loader';

//Importaciones útiles.
import iturriApi from './utils/api/config';
import { UserContext } from './utils/contexts/userContext';
import { checkAuth } from './utils/api/auth.endpoints';
import useAxios from './utils/api/useAxios';

//Navegacion y rutas
import AppRoutes from './utils/routes/AppRoutes';
import Notification from './components/Notification/Notification';

//Configuracion moment
moment.updateLocale('es', {
	week: { dow: 1, doy: 4 },
	invalidDate: 'Fecha inválida',
	months: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
	weekdays: ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sábado'],
	weekdaysMin: ['l', 'm', 'x', 'j', 'v', 's', 'd'],
	weekdaysShort: ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom']
});

function App() {

  const [loaded, setLoaded] = useState(false);

	const { setUser } = useContext(UserContext);
	const { interceptors, axiosNotification, requestsCounter } = useAxios();

  useEffect(() => {

		//Iniciar Axios
		iturriApi.interceptors.request.use(interceptors.request, interceptors.error);
		iturriApi.interceptors.response.use(interceptors.response, interceptors.error);

		//Iniciar el contexto del usuario.
		checkAuth()
			.then((response) => {
				setUser(response.data.user);
				setLoaded(true);
			})
			.catch(() => setLoaded(true));
	}, [interceptors, setUser]);

  return (
    <div className="App">
      {loaded ? <AppRoutes/> : <div> PANTALLA INICIAL DE CARGA</div>}
      {requestsCounter > 0 && <Loader/>}
      {axiosNotification && <Notification show={!!axiosNotification} type={axiosNotification?.type} text={axiosNotification?.text} style={{ position: 'fixed' , right:'15px', top:'10px'}} />}
    </div>
  );
}

export default App;
