import React from 'react';
import styles from './Loader.module.css';

const Loader : React.FunctionComponent = () => {

    return <div className={styles.loaderWraper}>
                <div className={styles.loaderBck}></div>
                <div className={styles.loaderContainer}>
                    Loading ...
                </div>
            </div>;
}

export default Loader;
