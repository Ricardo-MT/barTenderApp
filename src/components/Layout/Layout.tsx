import React, { FunctionComponent, useRef } from 'react';
import Header from '../Header/Header';
import styles from './Layout.module.css';

type Props = {
    children: React.ReactNode
}
const Layout : FunctionComponent<Props>= (props) => {

    const mainRef = useRef<HTMLElement>(null);

    return <main ref={mainRef}>
        <Header/>
        <div className={styles.layoutBody}>
            {props.children}
        </div>
    </main>

}

export default Layout;