import React, { FunctionComponent } from 'react';
import styles from './Header.module.css';

type Props = {
};

export const Header: FunctionComponent<Props> = (props) => {
	return (
		<header>
			<React.Fragment>
				<div className={styles.headerContainer}>
					<div className={styles.userInfo}>
						<span className={styles.textInfo}>
							<label className={styles.nombre}>Header</label>
						</span>
					</div>
				</div>
			</React.Fragment>
		</header>
	);
};

export default Header;