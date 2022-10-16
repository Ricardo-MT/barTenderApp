import React, { useCallback, useContext } from 'react';
import Button from '../../components/Button/Button';
import { DividerVertical } from '../../components/Divider/Divider';
import { drinks, IDrink } from '../../models/Drink/drink';
import appApi from '../../utils/api/config';
import OrderEndpoints from '../../utils/api/order.endpoints';
import { NotificationContext } from '../../utils/contexts/notificationContext';
import styles from './Dashboard.module.css';
import OrderListContainer from './OrderList/OrderList';
import OrderRequestContainer from './OrderRequest/OrderRequest';

const DashboardPage : React.FunctionComponent = () => {
    return <div className={styles.dashboardContainer}>
        <OrderListContainer/>
        <DividerVertical/>
        <OrderRequestContainer/>
    </div>
}

export default DashboardPage;

