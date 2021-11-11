import React from 'react';
import styles from '../styles/CardButtons.module.scss';
import { actionTypes, useContextState } from '../context/Context';
import { ICardButtonsProps } from '../common/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as outlinedHeart } from '@fortawesome/free-regular-svg-icons';
import {
	faHeart as solidHeart,
	faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

export default function CardButtons({
	id,
	name,
	thumbnail,
	type,
}: ICardButtonsProps) {
	const { state, dispatch } = useContextState();

	const postInBookmarks = state.bookmarks.find(
		(bookmark: any) => bookmark.id === id && bookmark.type === type
	);

	const currentIcon = !postInBookmarks ? outlinedHeart : solidHeart;

	const handleAddBookmark = (e: any) => {
		e.preventDefault();

		const newBookmark = {
			id,
			name,
			thumbnail,
			type,
		};

		window.localStorage.setItem(
			'bookmarks',
			JSON.stringify({
				bookmarks: [...state.bookmarks, newBookmark],
			})
		);

		dispatch({
			type: actionTypes.ADD_BOOKMARKS,
			bookmarks: [...state.bookmarks, newBookmark],
		});
	};

	const handleRemoveBookmark = (e: any) => {
		e.preventDefault();

		const newBookmarks = state.bookmarks.filter(
			(bookmark: any) => bookmark.id !== id && bookmark.type === type
		);

		window.localStorage.setItem(
			'bookmarks',
			JSON.stringify({
				bookmarks: newBookmarks,
			})
		);

		dispatch({
			type: actionTypes.REMOVE_BOOKMARK,
			bookmarks: newBookmarks,
		});
	};

	const currentOnClickFunction = !postInBookmarks
		? handleAddBookmark
		: handleRemoveBookmark;

	const handleHidePost = (e: any) => {
		e.preventDefault();

		const newHiddenPosts = { id, type };

		window.localStorage.setItem(
			'hidden',
			JSON.stringify({
				hiddenPosts: newHiddenPosts,
			})
		);

		dispatch({
			type: actionTypes.ADD_HIDDEN_POST,
			hiddenPosts: newHiddenPosts,
		});
	};

	return (
		<div className={styles.cardButtons}>
			<button className={styles.cardButton} onClick={currentOnClickFunction}>
				<FontAwesomeIcon className={styles.bookmarkIcon} icon={currentIcon} />
			</button>

			<button className={styles.cardButton} onClick={handleHidePost}>
				<FontAwesomeIcon className={styles.bookmarkIcon} icon={faEyeSlash} />
			</button>
		</div>
	);
}
