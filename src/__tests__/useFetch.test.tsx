import React from 'react';
import useFetch from '../hooks/useFetch';
import 'whatwg-fetch';
import { renderHook, act } from '@testing-library/react-hooks';
import { sectionFetchUrl } from '../common/helpers';
import characters from '../jsons/characters.json';

test('should return fetched data', async () => {
	const { result, waitForNextUpdate } = renderHook(() =>
		useFetch(sectionFetchUrl(1, 10, '', '', '', '', 'characters'))
	);

	await waitForNextUpdate();

	expect(result.current.data).toEqual(characters.data.results);
});
