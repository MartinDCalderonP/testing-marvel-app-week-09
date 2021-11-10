import React from 'react';
import styles from '../styles/Bookmarks.module.scss';
import { actionTypes, useContextState } from '../context/Context';
import { capitalizeWord } from '../common/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import CardsContainer from '../components/CardsContainer';

const bookmarksTypes = ['characters', 'comics', 'stories'];

export default function Bookmarks() {
	const { state, dispatch } = useContextState();

	const filterBookmarks = (type: string) => {
		return state.bookmarks.filter((bookmark: any) => bookmark.type === type);
	};

	const handleClearBookmarks = (e: any) => {
		e.preventDefault();
		window.localStorage.removeItem('bookmarks');
		dispatch({ type: actionTypes.CLEAR_BOOKMARKS });
	};

	return (
		<div className={styles.bookmarks}>
			<h1 className={styles.bookmarksTitle}>Bookmarks</h1>

			{bookmarksTypes.map(
				(type) =>
					filterBookmarks(type).length > 0 && (
						<div className={styles.section} key={`${type}Bookmarks`}>
							<h2 key={`${type}Title`}>{capitalizeWord(type)}</h2>

							<CardsContainer
								key={`${type}CardsContainer`}
								loading={state.loading}
								posts={filterBookmarks(type)}
								type={type}
							/>
						</div>
					)
			)}

			{state.bookmarks.length > 0 && (
				<button className={styles.clearButton} onClick={handleClearBookmarks}>
					Remove All Bookmarks
					<FontAwesomeIcon className={styles.clearIcon} icon={faTrash} />
				</button>
			)}

			{state.bookmarks.length === 0 && <h2>You have no bookmarks yet.</h2>}
		</div>
	);
}
