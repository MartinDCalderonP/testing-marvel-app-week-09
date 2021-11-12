import React from 'react';
import styles from '../styles/Card.module.scss';
import { Link } from 'react-router-dom';
import { cardNavigationUrl } from '../common/helpers';
import { ICardProps } from '../common/interfaces';
import notFoundImage from '../img/notFound.jpg';
import CardButtons from './CardButtons';

export default function Card({ id, name, thumbnail, type }: ICardProps) {
	const cardStyle = `${styles.card} ${styles.appearCard}`;

	const navigationUrl = cardNavigationUrl(id, type);

	const imageUrl = thumbnail
		? thumbnail.path + '.' + thumbnail.extension
		: notFoundImage;

	return (
		<div className={cardStyle}>
			<Link className={styles.cardLink} to={navigationUrl}>
				<div className={styles.cardImage}>
					<img src={imageUrl} alt={name} />
				</div>

				<p>{name}</p>
			</Link>

			<CardButtons id={id} name={name} thumbnail={thumbnail} type={type} />
		</div>
	);
}
