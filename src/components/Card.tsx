import React from 'react';
import styles from '../styles/Card.module.scss';
import { Link } from 'react-router-dom';
import { ICard, IDetailUrls } from '../common/interfaces';
import { paths } from '../common/enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as outlinedHeart } from '@fortawesome/free-regular-svg-icons';
// import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { actionTypes, useState } from '../context/Context';

export default function Card({ id, name, thumbnail, type }: ICard) {
	const { state, dispatch } = useState();

	const detailUrls: IDetailUrls = {
		characters: `${paths.characters}/${id}`,
		comics: `${paths.comics}/${id}`,
		stories: `${paths.stories}/${id}`,
	};

	const toDetailUrl = detailUrls[type];

	const handleHeartIconClick = () => {
		const newBookmark = {
			id,
			type,
		};

		dispatch({
			type: actionTypes.ADD_BOOKMARKS,
			bookmarks: [...state.bookmarks, newBookmark],
		});
	};
	
	return (
		<div className={`${styles.card} ${styles.appearCard}`}>
			<Link className={styles.cardLink} to={toDetailUrl}>
				{thumbnail !== 'undefined.undefined' && (
					<div className={styles.cardImage}>
						<img src={thumbnail} alt={name} />
					</div>
				)}

				<p>{name}</p>
			</Link>

			<button className={styles.bookmarkButton}>
				<FontAwesomeIcon
					icon={outlinedHeart}
					className={styles.heartIcon}
					onClick={handleHeartIconClick}
				/>
			</button>
		</div>
	);
}
