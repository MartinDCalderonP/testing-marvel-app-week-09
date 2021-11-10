import React from 'react';
import styles from '../styles/Detail.module.scss';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { API } from '../common/enums';
import { IDetail } from '../common/interfaces';
import { isCorrectData } from '../common/typeGuards';
import Spinner from '../components/Spinner';

export default function Detail({ character, comic, story }: IDetail) {
	const { id } = useParams<{ id: string }>();
	let fetchUrl = '';

	if (character) {
		fetchUrl = `${API.characters}/${id}?`;
	} else if (comic) {
		fetchUrl = `${API.comics}/${id}?`;
	} else if (story) {
		fetchUrl = `${API.stories}/${id}?`;
	}

	const { data: detailData, loading: detailLoading } = useFetch(fetchUrl);

	return (
		<div className={styles.detailPage}>
			{detailLoading && <Spinner />}

			{!detailLoading && detailData && (
				<>
					<h1>
						{isCorrectData(detailData)[0].name ||
							isCorrectData(detailData)[0].title}
					</h1>
					<div className={styles.row}>
						<div className={styles.leftColumn}>
							{isCorrectData(detailData)[0].thumbnail && (
								<div className={styles.image}>
									<img
										src={
											isCorrectData(detailData)[0].thumbnail.path +
											'.' +
											isCorrectData(detailData)[0].thumbnail.extension
										}
										alt={
											isCorrectData(detailData)[0].name ||
											isCorrectData(detailData)[0].title
										}
									/>
								</div>
							)}

							{isCorrectData(detailData)[0].description && (
								<div className={styles.description}>
									<p>{isCorrectData(detailData)[0].description}</p>
								</div>
							)}
						</div>

						<div className={styles.dividerColumn}></div>

						<div className={styles.rightColumn}>
							<div className={styles.information}>
								<h3>Information</h3>

								<p>
									<b>Name: </b>
									{isCorrectData(detailData)[0].name ||
										isCorrectData(detailData)[0].title}
								</p>
							</div>
						</div>
					</div>
					{character && (
						<>
							<h2>Character's Comics</h2>

							<ul>
								{isCorrectData(detailData)[0].comics.items.map((item: any) => (
									<li key={item.name}>{item.name}</li>
								))}
							</ul>

							<h2>Character's Stories</h2>

							<ul>
								{isCorrectData(detailData)[0].stories.items.map((item: any) => (
									<li key={item.name}>{item.name}</li>
								))}
							</ul>
						</>
					)}
					{comic && (
						<>
							<h2>Comic's Characters</h2>

							<ul>
								{isCorrectData(detailData)[0].characters.items.map(
									(item: any) => (
										<li key={item.name}>{item.name}</li>
									)
								)}
							</ul>

							<h2>Comic's Stories</h2>

							<ul>
								{isCorrectData(detailData)[0].stories.items.map((item: any) => (
									<li key={item.name}>{item.name}</li>
								))}
							</ul>
						</>
					)}
					{story && (
						<>
							<h2>Story's Characters</h2>

							<ul>
								{isCorrectData(detailData)[0].characters.items.map(
									(item: any) => (
										<li key={item.name}>{item.name}</li>
									)
								)}
							</ul>

							<h2>Story's Comics</h2>

							<ul>
								{isCorrectData(detailData)[0].comics.items.map((item: any) => (
									<li key={item.name}>{item.name}</li>
								))}
							</ul>
						</>
					)}
				</>
			)}
		</div>
	);
}
