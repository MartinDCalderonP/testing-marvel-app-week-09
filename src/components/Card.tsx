import React from 'react';
import styles from '../styles/Card.module.scss';
import { Link } from 'react-router-dom';
import { ICardProps, IObjects } from '../common/interfaces';
import { paths } from '../common/enums';
import notFoundImage from '../img/notFound.jpg';
import CardButtons from './CardButtons';

export default function Card({ id, name, thumbnail, type }: ICardProps) {
	const cardToDetailUrl: IObjects = {
		characters: `${paths.characters}/${id}`,
		comics: `${paths.comics}/${id}`,
		stories: `${paths.stories}/${id}`,
	};

	const imageUrl = thumbnail
		? thumbnail.path + '.' + thumbnail.extension
		: notFoundImage;

	return (
		<div className={`${styles.card} ${styles.appearCard}`}>
			<Link className={styles.cardLink} to={cardToDetailUrl[type]}>
				<div className={styles.cardImage}>
					<img src={imageUrl} alt={name} />
				</div>

				<p>{name}</p>
			</Link>

			<CardButtons id={id} name={name} thumbnail={thumbnail} type={type} />
		</div>
	);
}
