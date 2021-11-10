import React from 'react';
import styles from '../styles/CardsContainer.module.scss';
// eslint-disable-next-line
import { ICardsContainer, ICharacter, IComic } from '../common/interfaces';
import Spinner from './Spinner';
import Card from './Card';

export default function CardsContainer({
	className,
	loading,
	posts,
	type,
}: ICardsContainer) {
	return (
		<div className={styles.cardsContainer + (className ? ` ${className}` : '')}>
			{loading && <Spinner />}

			{!loading &&
				posts?.length > 0 &&
				posts?.map((post: any) => (
					<Card
						key={`character${post.id}`}
						id={post.id}
						name={post.name || post.title}
						thumbnail={post.thumbnail?.path + '.' + post.thumbnail?.extension}
						type={type}
					/>
				))}
		</div>
	);
}
