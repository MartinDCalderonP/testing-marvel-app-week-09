import React from 'react';
import styles from '../styles/Bookmarks.module.scss';
import { useCounter } from '../context/Context';

export default function Bookmarks() {
	const { state, dispatch } = useCounter();

	return (
		<div className={styles.bookmarks}>
			<h1>Bookmarks</h1>

			<ul>
				<h2>Characters</h2>
				{state.bookmarks.characters.map((bookmark: any, index: number) => (
					<li key={index}>
						<a href={bookmark.url}>{bookmark.title}</a>
						<button
							onClick={() =>
								dispatch({ type: 'REMOVE_BOOKMARK', payload: index })
							}
						>
							Remove
						</button>
					</li>
				))}
			</ul>

			<ul>
				<h2>Comics</h2>
				{state.bookmarks.comics.map((bookmark: any, index: number) => (
					<li key={index}>
						<a href={bookmark.url}>{bookmark.title}</a>
						<button
							onClick={() =>
								dispatch({ type: 'REMOVE_BOOKMARK', payload: index })
							}
						>
							Remove
						</button>
					</li>
				))}
			</ul>

			<ul>
				<h2>Stories</h2>
				{state.bookmarks.stories.map((bookmark: any, index: number) => (
					<li key={index}>
						<a href={bookmark.url}>{bookmark.title}</a>
						<button
							onClick={() =>
								dispatch({ type: 'REMOVE_BOOKMARK', payload: index })
							}
						>
							Remove
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
