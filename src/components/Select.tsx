import React, { useState, ChangeEvent } from 'react';
import styles from '../styles/Select.module.scss';
import { useHistory } from 'react-router';
import {
	selectNavigationUrl,
	selectFetchUrl,
	selectPlaceholder,
} from '../common/helpers';
import { ISelect, IComic, IStory } from '../common/interfaces';
import useFetch from '../hooks/useFetch';

const comicFormats = [
	'comic',
	'magazine',
	'trade paperback',
	'hardcover',
	'digest',
	'graphic novel',
	'digital comic',
	'infinite comic',
];

export default function Select({ currentValue, type }: ISelect) {
	const fetchUrl = selectFetchUrl(type);
	const { data, loading } = useFetch<IComic[] | IStory[]>(fetchUrl);
	const [selectedValue, setSelectedValue] = useState(currentValue || '');
	const history = useHistory();

	const handleSelectValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedValue(e.target.value);

		const navigationUrl = selectNavigationUrl(e.target.value, type);

		history.push(navigationUrl);
	};

	const placeholder = selectPlaceholder(type);

	return (
		<>
			{!loading && (
				<select
					className={styles.select}
					value={selectedValue}
					onChange={handleSelectValueChange}
				>
					<option hidden>Select a {placeholder}</option>

					{type !== 'formats' &&
						data?.map((item: IComic | IStory) => (
							<option key={`${type}${item.id}`} value={item.id}>
								{item.title}
							</option>
						))}

					{type === 'formats' &&
						comicFormats?.map((item: string, index) => (
							<option key={`formats${index}`} value={item}>
								{item}
							</option>
						))}
				</select>
			)}
		</>
	);
}
