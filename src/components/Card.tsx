import React from 'react';
import styles from '../styles/Card.module.scss';
import { Link } from 'react-router-dom';
import { ICard, IDetailUrls } from '../common/interfaces';
import { paths } from '../common/enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { actionTypes, useState } from '../context/Context';

export default function Card({ id, name, thumbnail, type }: ICard) {
	const { state, dispatch } = useState();

	const detailUrls: IDetailUrls = {
		characters: `${paths.characters}/${id}`,
		comics: `${paths.comics}/${id}`,
		stories: `${paths.stories}/${id}`,
	};

	const imageUrl = thumbnail?.path + '.' + thumbnail?.extension;

	const handleAddBookmark = () => {
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

	const handleRemoveBookmark = () => {
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

	const postInBookmarks = state.bookmarks.find(
		(bookmark: any) => bookmark.id === id && bookmark.type === type
	);

	const currentIcon = !postInBookmarks ? faHeart : faTrash;

	const currentOnClickFunction = !postInBookmarks
		? handleAddBookmark
		: handleRemoveBookmark;

	return (
		<div className={`${styles.card} ${styles.appearCard}`}>
			<Link className={styles.cardLink} to={detailUrls[type]}>
				{imageUrl !== 'undefined.undefined' && (
					<div className={styles.cardImage}>
						<img src={imageUrl} alt={name} />
					</div>
				)}

				<p>{name}</p>
			</Link>

			<button className={styles.bookmarkButton}>
				<FontAwesomeIcon
					className={styles.bookmarkIcon}
					icon={currentIcon}
					onClick={currentOnClickFunction}
				/>
			</button>
		</div>
	);
}
