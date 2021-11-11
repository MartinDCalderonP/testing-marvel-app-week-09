import React from 'react';
import styles from '../styles/Detail.module.scss';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { API } from '../common/enums';
import { capitalizeWord } from '../common/helpers';
import {
	IDetailProps,
	IDetailParams,
	IDetailFetchUrls,
} from '../common/interfaces';
import { isCorrectData } from '../common/typeGuards';
import Spinner from '../components/Spinner';

const detailTypes = ['characters', 'comics', 'stories'];

export default function Detail({ type }: IDetailProps) {
	const { id } = useParams<IDetailParams>();

	const fetchUrl: IDetailFetchUrls = {
		characters: `${API.characters}/${id}?`,
		comics: `${API.comics}/${id}?`,
		stories: `${API.stories}/${id}?`,
	};

	const { data, loading } = useFetch(fetchUrl[type]);

	const notCurrentType = detailTypes.filter(
		(detailType) => detailType !== type
	);

	return (
		<div className={styles.detailPage}>
			{loading && <Spinner />}

			{!loading && data && (
				<>
					<h1>{isCorrectData(data)[0].name || isCorrectData(data)[0].title}</h1>
					<div className={styles.row}>
						<div className={styles.leftColumn}>
							{isCorrectData(data)[0].thumbnail && (
								<div className={styles.image}>
									<img
										src={
											isCorrectData(data)[0].thumbnail.path +
											'.' +
											isCorrectData(data)[0].thumbnail.extension
										}
										alt={
											isCorrectData(data)[0].name ||
											isCorrectData(data)[0].title
										}
									/>
								</div>
							)}

							{isCorrectData(data)[0].description && (
								<div className={styles.description}>
									<p>{isCorrectData(data)[0].description}</p>
								</div>
							)}
						</div>

						<div className={styles.dividerColumn}></div>

						<div className={styles.rightColumn}>
							<div className={styles.information}>
								<h3>Information</h3>

								<p>
									<b>Name: </b>
									{isCorrectData(data)[0].name || isCorrectData(data)[0].title}
								</p>
							</div>
						</div>
					</div>
					{notCurrentType.map((detailType) => (
						<div key={`${type}${detailType}`} className={styles.section}>
							<h2>
								{capitalizeWord(type)}'s {capitalizeWord(detailType)}
							</h2>

							<ul>
								{isCorrectData(data)[0]?.[detailType].items.map(
									(item: any, index: number) => (
										<li key={`${detailType}ListItem${index}`}>{item.name}</li>
									)
								)}
							</ul>
						</div>
					))}
				</>
			)}
		</div>
	);
}
