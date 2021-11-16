import React, { useState, ChangeEvent, MouseEvent, useCallback } from 'react';
import styles from '../styles/SearchInput.module.scss';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { searchNavigationUrl } from '../common/helpers';
import { ISearchInputProps } from '../common/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchInput({ type }: ISearchInputProps) {
	const [query, setQuery] = useState<string>('');
	const history = useHistory();

	const searchQuery = (query: string) => {
		if (query !== '') {
			const navigationUrl = searchNavigationUrl(query, type);

			history.push(navigationUrl);
		}
	};

	const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		debounceQuery(e.target.value);
	};

	// eslint-disable-next-line
	const debounceQuery = useCallback(
		_.debounce((query) => {
			searchQuery(query);
		}, 500),
		[searchQuery]
	);

	const handleSearchButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		searchQuery(query);
	};

	return (
		<form className={styles.searchForm} autoComplete="off">
			<div className={styles.searchInput}>
				<input
					value={query}
					onChange={handleQueryChange}
					type="text"
					name="search"
					placeholder="Search"
				/>

				<button
					className={styles.searchButton}
					onClick={handleSearchButtonClick}
				>
					<FontAwesomeIcon icon={faSearch} />
				</button>
			</div>
		</form>
	);
}
