import React from 'react';
import styles from '../styles/Card.module.scss';
import { Link } from 'react-router-dom';
import { ICard } from '../common/interfaces';
import { paths } from '../common/enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Card({
	id,
	name,
	thumbnail,
	characters,
	comics,
	stories,
}: ICard) {
	let newUrl = '';

	if (characters) {
		newUrl = `${paths.characters}/${id}`;
	} else if (comics) {
		newUrl = `${paths.comics}/${id}`;
	} else if (stories) {
		newUrl = `${paths.stories}/${id}`;
	}

	const handleHeartIconClick = () => {
		console.log('Heart Clicked');
	};

	return (
		<Link className={`${styles.card} ${styles.appearCard}`} to={newUrl}>
			<FontAwesomeIcon
				icon={faHeart}
				className={styles.heartIcon}
				onClick={handleHeartIconClick}
			/>
			{thumbnail !== 'undefined.undefined' && (
				<div className={styles.cardImage}>
					<img src={thumbnail} alt={name} />
				</div>
			)}
			<p>{name}</p>
		</Link>
	);
}
