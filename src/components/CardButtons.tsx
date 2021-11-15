import React, { MouseEvent } from 'react';
import styles from '../styles/CardButtons.module.scss';
import { actionTypes, useContextState } from '../context/Context';
import { IBookmark, ICardButtonsProps } from '../common/interfaces';
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
		(bookmark: IBookmark) => bookmark.id === id && bookmark.type === type
	);

	const currentIcon = !postInBookmarks ? outlinedHeart : solidHeart;

	const handleAddBookmark = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const newBookmark = {
			id,
			name,
			thumbnail,
			type,
		};

		window.localStorage.setItem(
			'bookmarks',
			JSON.stringify([...state.bookmarks, newBookmark])
		);

		dispatch({
			type: actionTypes.ADD_BOOKMARKS,
			bookmarks: [...state.bookmarks, newBookmark],
		});
	};

	const handleRemoveBookmark = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const newBookmarks = state.bookmarks.filter(
			(bookmark: IBookmark) => bookmark.id !== id && bookmark.type === type
		);

		window.localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));

		dispatch({
			type: actionTypes.REMOVE_BOOKMARK,
			bookmarks: newBookmarks,
		});
	};

	const currentOnClickFunction = !postInBookmarks
		? handleAddBookmark
		: handleRemoveBookmark;

	const handleAddHiddenPost = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const newHiddenPost = id;

		window.localStorage.setItem(
			'hiddenPosts',
			JSON.stringify([...state.hiddenPosts, newHiddenPost])
		);

		dispatch({
			type: actionTypes.ADD_HIDDEN_POST,
			hiddenPosts: [...state.hiddenPosts, newHiddenPost],
		});
	};

	return (
		<div className={styles.cardButtons}>
			<button className={styles.cardButton} onClick={currentOnClickFunction}>
				<FontAwesomeIcon className={styles.bookmarkIcon} icon={currentIcon} />
			</button>

			<button className={styles.cardButton} onClick={handleAddHiddenPost}>
				<FontAwesomeIcon className={styles.bookmarkIcon} icon={faEyeSlash} />
			</button>
		</div>
	);
}
