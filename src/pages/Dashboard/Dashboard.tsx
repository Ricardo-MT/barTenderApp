import React from 'react';
import { DividerVertical } from '../../components/Divider/Divider';
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

