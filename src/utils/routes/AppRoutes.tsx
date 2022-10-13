import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import DashboardPage from '../../pages/Dashboard/Dashboard';

//Importacion de paginas

const AppRoutes = () => {
    return <Router>
        <Switch>
            <Route path="/dashboard" component={()=><Layout><DashboardPage/></Layout>} />
        </Switch>
    </Router>
}

export default AppRoutes;