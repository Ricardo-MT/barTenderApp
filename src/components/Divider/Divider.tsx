import React, { FunctionComponent } from 'react';
import styles from './Divider.module.css';

type Props = {
	className?: string,
};

export const DividerHorizontal: FunctionComponent<Props> = (props) => {
	return (
		<div className={`${styles.dividerHorizontal} ${props.className}`}/>
	);
};

export const DividerVertical: FunctionComponent<Props> = (props) => {
	return (
		<div className={`${styles.dividerVertical} ${props.className}`}/>
	);
};
