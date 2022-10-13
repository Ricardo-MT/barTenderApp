import { ReactNode, useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import Layout from '../../components/Layout/Layout';

const PrivateRoute = ({children, ...route} : {children:ReactNode,exact?:boolean, path:string}) => {

    const { user } = useContext(UserContext);
    const handleRender = ({location} : any) => {
        return user ? <Layout username={user.name}>
						{children}
					</Layout> : <Redirect to={{pathname:'/login', state:{ from:location }}}/>
    }
    return <Route {...route} render={handleRender} />
};

export default PrivateRoute;
