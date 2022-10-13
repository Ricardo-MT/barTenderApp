import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

//Importacion de paginas
import Login from '../../pages/Login/Login';
import Centros from '../../pages/Centros/Centros';

const AppRoutes = () => {
    return <Router>
        <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/centros">
                <Centros/>
            </PrivateRoute>
        </Switch>
    </Router>
}

export default AppRoutes;