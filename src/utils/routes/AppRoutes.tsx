import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import DashboardPage from '../../pages/Dashboard/Dashboard';

//Importacion de paginas

const AppRoutes = () => {
    return <Router>
        <Routes>
            <Route path="/" element={<Layout><DashboardPage/></Layout>} />
        </Routes>
    </Router>
}

export default AppRoutes;