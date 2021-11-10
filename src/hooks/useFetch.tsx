import { useState, useEffect } from 'react';
import { IUseFetch } from '../common/interfaces';
import { API_KEY, API_HASH } from '../Keys';

export default function useFetch<T>(fetchUrl: string): IUseFetch<T> {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState(true);
	const url = `${fetchUrl}&ts=1&apikey=${API_KEY}&hash=${API_HASH}`;

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		const fetchData = async () => {
			setLoading(true);

			fetch(url, { signal })
				.then((res) => res.json())
				.then((result) => {
					setData(result);
					setLoading(false);
				})
				.catch((err) => {
					if (err.name === 'AbortError') return;
					alert(`${err}. Try again later.`);
				});
		};

		fetchData();

		return () => abortController.abort();
	}, [url]);

	return { data, loading };
}
