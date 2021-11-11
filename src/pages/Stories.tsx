import React, { useState } from 'react';
import styles from '../styles/Stories.module.scss';
import { useParams, useHistory } from 'react-router';
import {
	storiesCurrentFetchUrl,
	storiesCurrentNewUrl,
} from '../common/helpers';
import { IUseParams } from '../common/interfaces';
import { isCorrectData, hasTotal } from '../common/typeGuards';
import useFetch from '../hooks/useFetch';
import SearchInput from '../components/SearchInput';
import Spinner from '../components/Spinner';
import CardsContainer from '../components/CardsContainer';
import PaginationButtons from '../components/PaginationButtons';

export default function Stories() {
	const { page, searchedTerm } = useParams<IUseParams>();
	const [currentPage, setCurrentPage] = useState<number>(parseInt(page));
	const postsPerPage = 8;
	const fetchUrl = storiesCurrentFetchUrl(currentPage, postsPerPage);
	const { data, loading } = useFetch(fetchUrl);
	const history = useHistory();

	const searchedPosts = isCorrectData(data)?.filter((story: any) =>
		story.title.toLowerCase().includes(searchedTerm?.toLowerCase())
	);

	const currentPosts = searchedTerm ? searchedPosts : isCorrectData(data);

	const currentTotal = searchedTerm ? currentPosts?.length : hasTotal(data);

	const handlePaginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);

		const newUrl = storiesCurrentNewUrl(searchedTerm, pageNumber);

		history.push(newUrl);
	};

	const noResultsText =
		(searchedTerm && ` "${searchedTerm.replaceAll('+', ' ')}"`) ||
		' stories section';

	return (
		<div className={styles.stories}>
			<SearchInput stories />

			{loading && <Spinner />}

			{!loading && currentPosts.length > 0 && (
				<>
					<CardsContainer
						loading={loading}
						posts={currentPosts}
						type="stories"
					/>

					<PaginationButtons
						totalPosts={currentTotal}
						postsPerPage={postsPerPage}
						paginate={handlePaginate}
						currentPage={currentPage}
					/>
				</>
			)}

			{!loading && currentPosts.length === 0 && (
				<h1 className={styles.noResults}>
					No results found for {noResultsText}.
				</h1>
			)}
		</div>
	);
}
