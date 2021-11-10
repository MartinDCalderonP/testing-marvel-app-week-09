import React from 'react';
import styles from '../styles/Spinner.module.scss';
import spinner from '../img/spinner.gif';

export default function Spinner() {
	return (
		<div className={styles.spinnerContainer}>
			<img className={styles.spinner} src={spinner} alt="Loading..." />
		</div>
	);
}
