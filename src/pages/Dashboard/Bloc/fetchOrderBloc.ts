import { useState } from 'react';
import { IOrder } from "../../../models/Order/order";
import appApi from '../../../utils/api/config';
import OrderEndpoints from '../../../utils/api/order.endpoints';

const limit = 20;

const useGetOrderReducer = (): [IOrder[], () => void] => {
    const orderEndpoints = new OrderEndpoints(appApi);
    const [orders, setOrders] = useState<Array<IOrder>>([]);

    const fetchNextOrders = async (): Promise<void> => {
        // try {
        //     const _orders = await orderEndpoints.getOrders(orders.length, limit);
        //     setOrders(_orders);
        // } catch (error) {

        // }
    };

    return [orders, fetchNextOrders];
}

export default useGetOrderReducer;