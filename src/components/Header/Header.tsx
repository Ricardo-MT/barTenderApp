import React, { FunctionComponent, useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './header.module.css';

type Props = {
	username:string
};



export const Header: FunctionComponent<Props> = (props) => {
	const [openOptions, setOpenOptions] = useState<boolean>(false);

	const handleClick = () => {
		setOpenOptions(!openOptions);
	};

	return (
		<React.Fragment>
			<div className={styles.headerContainer}>
				{/* <SearchBar resultados={[]} onSelectResult={() => {}} onChangeSearchValue={() => {}} /> */}

				<div className={styles.userInfo}>
					<span className={styles.textInfo}>
						<label className={styles.nombre}>{props.username}</label>
					</span>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Header;