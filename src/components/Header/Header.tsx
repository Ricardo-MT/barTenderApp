import React, { FunctionComponent } from 'react';
import styles from './Header.module.css';

type Props = {
};

export const Header: FunctionComponent<Props> = () => {
	return (
		<header>
			<React.Fragment>
				<div className={styles.headerContainer}>
					<span className={styles.appTitle}>
						<label>Bartender App</label>
					</span>
				</div>
			</React.Fragment>
		</header>
	);
};

export default Header;