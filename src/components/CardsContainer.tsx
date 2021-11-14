import React from 'react';
import styles from '../styles/CardsContainer.module.scss';
import {
	ICardsContainerProps,
	ICharacter,
	IComic,
	IStory,
} from '../common/interfaces';
import { isCharacter, isComic, isStory } from '../common/typeGuards';
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
				posts?.map((post: ICharacter | IComic | IStory) => (
					<Card
						key={`${type}${post.id}`}
						id={post.id}
						name={
							isCharacter(post)?.name ||
							isComic(post)?.title ||
							isStory(post)?.title
						}
						thumbnail={isCharacter(post)?.thumbnail || isComic(post)?.thumbnail}
						type={type}
					/>
				))}
		</div>
	);
}
