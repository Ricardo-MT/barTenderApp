import React from "react";
import { useState, useContext, useCallback } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Modal from "../../../components/Modal/Modal";
import { drinks, IDrink } from "../../../models/Drink/drink";
import appApi from "../../../utils/api/config";
import OrderEndpoints from "../../../utils/api/order.endpoints";
import { NotificationContext } from "../../../utils/contexts/notificationContext";
import { isNumber } from "../../../utils/validators/Validators";
import styles from './OrderRequest.module.css';


const OrderRequestContainer : React.FunctionComponent = () => {
    const {setNotification} = useContext(NotificationContext);
    const [orderRequestDrink, setOrderRequestDrink] = useState<IDrink>();

    const requestOrder = useCallback((user: number, drink: IDrink)=>{
        const orderEndpoints = new OrderEndpoints(appApi);
            orderEndpoints.requestDrink(user, drink).then(response=>{
                if(response.message){
                    setNotification({type: 'success', text: response.message})
                }
            }).catch(err=>{
                if(err.response.data.message){
                    setNotification({type: 'error', text: err.response.data.message})
                }
            })
    }, [setNotification]);

    return <div className={styles.createOrdersPanelContainer}>
        <h2>Order your drinks here</h2>
        {
            drinks.map(
                drink => <Button 
                            key={`orderButton${drink}`}
                            text={`${drink}+`}
                            action={()=>{
                                setOrderRequestDrink(drink);
                            }} />)
        }
        <Modal
            open={orderRequestDrink!=undefined} 
            onClose={()=> setOrderRequestDrink(undefined)}>
            <OrderRequestForm
                drink={orderRequestDrink!}
                onSend={(user: number)=>{
                    requestOrder(user, orderRequestDrink!);
                    setOrderRequestDrink(undefined);
                }}
                onCancel={()=>setOrderRequestDrink(undefined)}
            />
        </Modal>
    </div>
}
export default OrderRequestContainer;

type OrderRequestFormProps = {
    drink: IDrink,
    onSend: (user: number)=>void,
    onCancel: ()=>void,
}
const OrderRequestForm : React.FunctionComponent<OrderRequestFormProps> = ({drink, onSend, onCancel,}) => {
    const [user, setUser] = useState<string>();
    const [userError, setUserError] = useState<string>();

    const validateSendRequest = useCallback((value?: string)=>{
        if(!value){
            setUserError('Required field');
            return false;
        }
        if(!isNumber(Number(value))){
            setUserError('Must be a number');
            return false;
        }
        return true;
    }, [user, setUser, userError, setUserError])

    return (
        <React.Fragment>
            <div className={styles.createOrderForm} >
                <h3>Requesting drink {drink}</h3>
                <span>
                    <p>Type the user and hit send to request a drink order</p>
                </span>
                <Input 
                    value={user} 
                    setValue={setUser}
                    error={userError}
                    type="number" 
                    name="user"
                />
                <Button
                    text={'Send'}
                    disabled={!user}
                    action={()=>{
                        if(validateSendRequest(user)){
                            onSend(Number(user));
                        }
                    }}
                />
            </div>
        </React.Fragment>
    )
}
