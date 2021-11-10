import React from 'react';
import styles from '../styles/Home.module.scss';

export default function Home() {
	return (
		<div className={styles.home}>
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
				alt="Logo"
			/>
			
			<p>
				Marvel Entertainment, LLC, a wholly-owned subsidiary of The Walt Disney
				Company, is one of the world's most prominent character-based
				entertainment companies, built on a proven library of more than 8,000
				characters featured in a variety of media over seventy-five years.
				Marvel utilizes its character franchises in entertainment, licensing and
				publishing. For more information visit marvel.com. © 2020 MARVEL
			</p>
		</div>
	);
}
