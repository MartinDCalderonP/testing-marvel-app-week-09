import React from 'react';
import styles from '../styles/Detail.module.scss';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { capitalizeWord, detailFetchUrl } from '../common/helpers';
import { IDetailProps, IDetailParams } from '../common/interfaces';
import { isCorrectData } from '../common/typeGuards';
import Spinner from '../components/Spinner';
import notFoundImage from '../img/notFound.jpg';

const detailTypes = ['characters', 'comics', 'stories'];

export default function Detail({ type }: IDetailProps) {
	const { id } = useParams<IDetailParams>();
	const fetchUrl = detailFetchUrl(id, type);
	const { data, loading } = useFetch(fetchUrl);

	const currentImage = () => {
		if (isCorrectData(data) && isCorrectData(data)[0]?.thumbnail) {
			return (
				isCorrectData(data)[0].thumbnail.path +
				'.' +
				isCorrectData(data)[0].thumbnail.extension
			);
		}
		return notFoundImage;
	};

	const currentTitle = () => {
		if (isCorrectData(data) && isCorrectData(data)[0]) {
			return isCorrectData(data)[0]?.name || isCorrectData(data)[0]?.title;
		}
	};

	const notCurrentType = detailTypes.filter(
		(detailType) => detailType !== type
	);

	return (
		<div className={styles.detailPage}>
			{loading && <Spinner />}

			{!loading && data && (
				<>
					<h1>{currentTitle()}</h1>
					<div className={styles.row}>
						<div className={styles.leftColumn}>
							<div className={styles.image}>
								<img src={currentImage()} alt={currentTitle()} />
							</div>

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
									{currentTitle()}
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
