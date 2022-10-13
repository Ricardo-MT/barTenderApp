import React, { createContext, Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import User from '../interfaces/user';

type Context = {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
};

export const UserContext = createContext<Context>({ user: null, setUser: () => {} });

export const UserProvider: FunctionComponent = (props) => {
	const [user, setUser] = useState<User | null>(null);

	return <UserContext.Provider value={{user, setUser}}>{props.children}</UserContext.Provider>
};
