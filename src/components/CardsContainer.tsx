import React from 'react';
import styles from '../styles/CardsContainer.module.scss';
// eslint-disable-next-line
import { ICardsContainerProps } from '../common/interfaces';
import Spinner from './Spinner';
import Card from './Card';

export default function CardsContainer({
	loading,
	posts,
	type,
}: ICardsContainerProps) {
	return (
		<div className={styles.cardsContainer}>
			{loading && <Spinner />}

			{!loading &&
				posts?.length > 0 &&
				posts?.map((post: any) => (
					<Card
						key={`${type}${post.id}`}
						id={post.id}
						name={post.name || post.title}
						thumbnail={post.thumbnail}
						type={type}
					/>
				))}
		</div>
	);
}
