import React from 'react';
import styles from '../styles/Bookmarks.module.scss';
import { useState } from '../context/Context';
import { capitalizeWord } from '../common/helpers';
import CardsContainer from '../components/CardsContainer';

const bookmarksTypes = ['characters', 'comics', 'stories'];

export default function Bookmarks() {
	const { state } = useState();

	const filterBookmarks = (type: string) => {
		return state.bookmarks.filter((bookmark: any) => bookmark.type === type);
	};

	return (
		<div className={styles.bookmarks}>
			<h1 className={styles.bookmarksTitle}>Bookmarks</h1>

			{bookmarksTypes.map(
				(type) =>
					filterBookmarks(type).length > 0 && (
						<>
							<h2>{capitalizeWord(type)}</h2>

							<CardsContainer
								loading={state.loading}
								posts={filterBookmarks(type)}
								type={type}
							/>
						</>
					)
			)}

			{state.bookmarks.length === 0 && <h2>You have no bookmarks yet.</h2>}
		</div>
	);
}
