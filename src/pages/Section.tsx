import React, { useState } from 'react';
import styles from '../styles/Section.module.scss';
import { useParams, useHistory } from 'react-router';
import { useContextState } from '../context/Context';
import {
	sectionFetchUrl,
	sectionNoResultsText,
	sectionPaginationUrl,
} from '../common/helpers';
import {
	ISectionProps,
	ISectionParams,
	IStory,
	PossibleArrayTypes,
	PossibleTypes,
} from '../common/interfaces';
import { isStory, isDataArray } from '../common/typeGuards';
import useFetch from '../hooks/useFetch';
import SearchInput from '../components/SearchInput';
import Select from '../components/Select';
import Spinner from '../components/Spinner';
import CardsContainer from '../components/CardsContainer';
import PaginationButtons from '../components/PaginationButtons';

export default function Section({ type }: ISectionProps) {
	const { page, query, comic, story, format } = useParams<ISectionParams>();
	const [currentPage, setCurrentPage] = useState<number>(parseInt(page));
	const postsPerPage = 8;
	const fetchUrl = sectionFetchUrl(
		currentPage,
		postsPerPage,
		query,
		comic,
		story,
		format,
		type
	);
	const { data, loading, total } = useFetch<PossibleArrayTypes>(fetchUrl);
	const history = useHistory();
	const { state } = useContextState();

	const filterHiddenPosts = isDataArray(data)?.filter(
		(item: PossibleTypes) => !state.hiddenPosts.includes(item.id)
	);

	const searchedPosts =
		type === 'stories' &&
		isStory(data)?.filter((story: IStory) =>
			story.title.toLowerCase().includes(query?.toLowerCase())
		);

	const currentPosts =
		state?.hiddenPosts?.length > 0
			? filterHiddenPosts
			: type === 'stories' && query
			? searchedPosts
			: data;

	const currentTotal =
		type === 'stories' && query ? currentPosts?.length : total;

	const handlePaginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);

		const newUrl = sectionPaginationUrl(
			pageNumber,
			query,
			comic,
			story,
			format,
			type
		);

		history.push(newUrl);
	};

	const noResultsText = sectionNoResultsText(query, comic, story, format, type);

	return (
		<div className={styles.section}>
			<SearchInput type={type} />

			{type === 'characters' && (
				<>
					<Select currentValue={comic} type="comics" />

					<Select currentValue={story} type="stories" />
				</>
			)}

			{type === 'comics' && <Select currentValue={format} type="formats" />}

			{loading && <Spinner />}

			{!loading && currentPosts?.length > 0 && (
				<>
					{query && (
						<h1 className={styles.resultsText}>Results for "{query}".</h1>
					)}

					<CardsContainer loading={loading} posts={currentPosts} type={type} />

					<PaginationButtons
						totalPosts={currentTotal}
						postsPerPage={postsPerPage}
						paginate={handlePaginate}
						currentPage={currentPage}
					/>
				</>
			)}

			{!loading && currentPosts.length === 0 && (
				<h1 className={styles.resultsText}>
					No results found for {noResultsText}.
				</h1>
			)}
		</div>
	);
}
