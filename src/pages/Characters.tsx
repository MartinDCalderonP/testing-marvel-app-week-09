import React, { useState } from 'react';
import styles from '../styles/Characters.module.scss';
import { useParams, useHistory } from 'react-router';
import { currentFetchUrl, currentNewUrl } from '../common/helpers';
import { IUseParams } from '../common/interfaces';
import { isCorrectData, hasTotal } from '../common/typeGuards';
import useFetch from '../hooks/useFetch';
import SearchInput from '../components/SearchInput';
import Select from '../components/Select';
import Spinner from '../components/Spinner';
import CardsContainer from '../components/CardsContainer';
import PaginationButtons from '../components/PaginationButtons';

export default function Characters() {
	const { page, searchedTerm, comic, story } = useParams<IUseParams>();
	const [currentPage, setCurrentPage] = useState<number>(parseInt(page));
	const postsPerPage = 8;
	const fetchUrl = currentFetchUrl(
		currentPage,
		postsPerPage,
		searchedTerm,
		comic,
		story
	);
	const { data, loading } = useFetch(fetchUrl);
	const history = useHistory();

	const handlePaginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);

		const newUrl = currentNewUrl(pageNumber, searchedTerm, comic, story);

		history.push(newUrl);
	};

	const noResultsText =
		(searchedTerm && ` "${searchedTerm.replaceAll('+', ' ')}"`) ||
		(comic && ' this comic') ||
		(story && ' this story');

	return (
		<div className={styles.characters}>
			<SearchInput characters />

			<Select comics />

			<Select stories />

			{loading && <Spinner />}

			{!loading && isCorrectData(data).length > 0 && (
				<>
					<CardsContainer
						loading={loading}
						posts={isCorrectData(data)}
						type="characters"
					/>

					<PaginationButtons
						totalPosts={hasTotal(data)}
						postsPerPage={postsPerPage}
						paginate={handlePaginate}
						currentPage={currentPage}
					/>
				</>
			)}

			{!loading && isCorrectData(data).length === 0 && (
				<h1 className={styles.noResults}>
					No results found for {noResultsText}.
				</h1>
			)}
		</div>
	);
}
