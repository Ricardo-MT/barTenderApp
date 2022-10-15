import React, { createContext, Dispatch, FunctionComponent, SetStateAction, useState } from 'react';

export type NotificationType = {type:'error' |'success', text:string | null};

type Context = {
	notification: NotificationType | null;
	setNotification: Dispatch<SetStateAction<NotificationType | null>>;
};
export const NotificationContext = createContext<Context>({ notification: null, setNotification: () => {} });

type Props = {
    children: React.ReactNode
}
export const NotificationProvider: FunctionComponent<Props> = (props) => {
	const [notification, setNotification] = useState<NotificationType | null>(null);

	return <NotificationContext.Provider value={{notification, setNotification}}>{props.children}</NotificationContext.Provider>
};
