import React, { FunctionComponent, useRef } from 'react';
import Header from '../Header/Header';

type Props = {
}
const Layout : FunctionComponent<Props>= (props) => {

    const mainRef = useRef<HTMLElement>(null);

    return <main ref={mainRef}>
        <Header/>
        <div style={{padding:'0 0'}}>
            {props.children}
        </div>
    </main>

}

export default Layout;