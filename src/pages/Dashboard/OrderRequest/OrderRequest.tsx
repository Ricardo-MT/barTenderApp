import React from "react";
import { useState, useContext, useCallback } from "react";
import Button from "../../../components/Button/Button";
import { drinks, IDrink } from "../../../models/Drink/drink";
import { IOrder } from "../../../models/Order/order";
import appApi from "../../../utils/api/config";
import OrderEndpoints from "../../../utils/api/order.endpoints";
import { NotificationContext } from "../../../utils/contexts/notificationContext";
import styles from './OrderRequest.module.css';


const OrderRequestContainer : React.FunctionComponent = () => {
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
        <h2>Order your drinks here</h2>
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

export default OrderRequestContainer;
