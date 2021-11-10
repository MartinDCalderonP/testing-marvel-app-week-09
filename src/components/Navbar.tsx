import React from 'react';
import styles from '../styles/Navbar.module.scss';
import { paths } from '../common/enums';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<NavLink
				to={paths.home}
				className={(isActive) => (isActive ? styles.active : '')}
			>
				<FontAwesomeIcon className={styles.homeIcon} icon={faHome} />
				Home
			</NavLink>

			<NavLink
				to={`${paths.characters}${paths.page}1`}
				className={(isActive) => (isActive ? styles.active : '')}
			>
				Characters
			</NavLink>

			<NavLink
				to={`${paths.comics}${paths.page}1`}
				className={(isActive) => (isActive ? styles.active : '')}
			>
				Comics
			</NavLink>

			<NavLink
				to={`${paths.stories}${paths.page}1`}
				className={(isActive) => (isActive ? styles.active : '')}
			>
				Stories
			</NavLink>

			<NavLink
				to={paths.bookmarks}
				className={(isActive) => (isActive ? styles.active : '')}
			>
				Bookmarks
			</NavLink>
		</nav>
	);
}
