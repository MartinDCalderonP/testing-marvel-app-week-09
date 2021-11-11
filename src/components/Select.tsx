import React, { useState, ChangeEvent } from 'react';
import styles from '../styles/Select.module.scss';
import { useHistory } from 'react-router';
import { selectCurrentNewUrl, selectFetchUrl } from '../common/helpers';
import { ISelect, IComic, IStory } from '../common/interfaces';
import { isCorrectData } from '../common/typeGuards';
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

export default function Select({
	currentValue,
	comics,
	stories,
	formats,
}: ISelect) {
	const fetchUrl = selectFetchUrl(comics);
	const { data, loading } = useFetch(fetchUrl);
	const [selectedValue, setSelectedValue] = useState(currentValue || '');
	const history = useHistory();

	const handleSelectValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedValue(e.target.value);

		const newUrl = selectCurrentNewUrl(e.target.value, formats, comics);

		history.push(newUrl);
	};

	const showSelectOptions = () => {
		if (!formats && isCorrectData(data).length > 0) {
			return isCorrectData(data).map((item: IComic | IStory) => (
				<option key={item.id} value={item.id}>
					{item.title}
				</option>
			));
		} else {
			return comicFormats.map((item: string, index) => (
				<option key={`formats${index}`} value={item}>
					{item}
				</option>
			));
		}
	};

	return (
		<>
			{!loading && (
				<select
					className={styles.select}
					value={selectedValue}
					onChange={handleSelectValueChange}
				>
					<option hidden>
						Select a {formats ? 'Format' : comics ? 'Comic' : 'Story'}
					</option>

					{showSelectOptions()}
				</select>
			)}
		</>
	);
}
