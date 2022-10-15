import React, { useCallback, useContext, useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import { DividerVertical } from '../../components/Divider/Divider';
import { drinks, IDrink } from '../../models/Drink/drink';
import { IOrder } from '../../models/Order/order';
import appApi from '../../utils/api/config';
import OrderEndpoints from '../../utils/api/order.endpoints';
import { NotificationContext } from '../../utils/contexts/notificationContext';
import useGetOrderReducer from './Bloc/fetchOrderBloc';
import styles from './Dashboard.module.css';

const DashboardPage : React.FunctionComponent = () => {
    return <div className={styles.dashboardContainer}>
        <FetchOrdersPanel/>
        <DividerVertical/>
        <CreateOrdersPanel/>
    </div>
}

export default DashboardPage;

const FetchOrdersPanel : React.FunctionComponent = () => {

    const [orders, setOrders] = useState<Array<IOrder>>([]);
    const {setNotification} = useContext(NotificationContext);
    
    const loadMoreOrders = useCallback(()=>{
        const orderEndpoints = new OrderEndpoints(appApi);
        orderEndpoints.getOrders(orders.length).then(response=>{
            setOrders([...orders, ...response.orders]);
            if(response.message){
                setNotification({type: 'success', text: response.message})
            }
        }).catch(err=>{
            if(err.message){
                setNotification({type: 'error', text: err.message})
            }
        })
    }, [orders, setOrders]);

    return <div className={styles.fetchOrdersPanelContainer}>
        {
            orders.map((order, i)=> 
                <div key={`order${i}`}>User {order.user} ordered a {order.drink} at {new Date(order.timestamp).toUTCString()}</div>
                )
        }
        <Button action={loadMoreOrders} text={'Load more'}/>
    </div>
}

const CreateOrdersPanel : React.FunctionComponent = () => {
    const {setNotification} = useContext(NotificationContext);
    const requestOrder = useCallback((drink: IDrink)=>{
        const orderEndpoints = new OrderEndpoints(appApi);
            orderEndpoints.requestDrink(drink).then(response=>{
                if(response.message){
                    setNotification({type: 'success', text: response.message})
                }
            }).catch(err=>{
                if(err.response.data.message){
                    setNotification({type: 'error', text: err.response.data.message})
                }
            })
    }, []);

    return <div className={styles.createOrdersPanelContainer}>
        {
            drinks.map(
                drink=> <Button 
                            key={`orderButton${drink}`}
                            text={`${drink}+`}
                            action={()=>{
                                requestOrder(drink);
                            }} />)
        }
    </div>
}
