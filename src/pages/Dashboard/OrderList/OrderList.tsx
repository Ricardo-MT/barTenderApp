import React from "react";
import { useState, useContext, useCallback } from "react";
import Button from "../../../components/Button/Button";
import { IOrder } from "../../../models/Order/order";
import appApi from "../../../utils/api/config";
import OrderEndpoints from "../../../utils/api/order.endpoints";
import { NotificationContext } from "../../../utils/contexts/notificationContext";
import styles from './OrderList.module.css';

const OrderListContainer : React.FunctionComponent = () => {

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
        <h2>Check successful orders here</h2>
        <OrderList orders={orders} />
        <Button action={loadMoreOrders} text={'Load more'}/>
    </div>
}

export default OrderListContainer;

type OrderListProps = {
    orders: Array<IOrder>
}
export const OrderList : React.FunctionComponent<OrderListProps> = ({orders}) => {
    return <React.Fragment>
        {
            orders.map((order, i)=> 
                <div className={styles.orderItemContainer} key={`order${i}`}>User {order.user} ordered a {order.drink} at {new Date(order.timestamp).toUTCString()}</div>
            )
        }
    </React.Fragment>
}