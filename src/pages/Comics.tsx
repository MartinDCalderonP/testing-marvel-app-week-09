import React, { useState } from 'react';
import styles from '../styles/Comics.module.scss';
import { useParams, useHistory } from 'react-router';
import { comicsCurrentFetchUrl, comicsCurrentNewUrl } from '../common/helpers';
import { IUseParams } from '../common/interfaces';
import { isCorrectData, hasTotal } from '../common/typeGuards';
import useFetch from '../hooks/useFetch';
import SearchInput from '../components/SearchInput';
import Select from '../components/Select';
import Spinner from '../components/Spinner';
import CardsContainer from '../components/CardsContainer';
import PaginationButtons from '../components/PaginationButtons';

export default function Comics() {
	const { page, searchedTerm, format } = useParams<IUseParams>();
	const [currentPage, setCurrentPage] = useState<number>(parseInt(page));
	const postsPerPage = 8;
	const fetchUrl = comicsCurrentFetchUrl(
		currentPage,
		postsPerPage,
		searchedTerm,
		format
	);
	const { data, loading } = useFetch(fetchUrl);
	const history = useHistory();

	const handlePaginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);

		const newUrl = comicsCurrentNewUrl(searchedTerm, pageNumber);

		history.push(newUrl);
	};

	const noResultsText =
		(searchedTerm && ` "${searchedTerm.replaceAll('+', ' ')}"`) ||
		' comics section';

	return (
		<div className={styles.comics}>
			<SearchInput type='comics' />

			<Select currentValue={format} comics formats />

			{loading && <Spinner />}

			{!loading && isCorrectData(data).length > 0 && (
				<>
					<CardsContainer
						loading={loading}
						posts={isCorrectData(data)}
						type="comics"
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
