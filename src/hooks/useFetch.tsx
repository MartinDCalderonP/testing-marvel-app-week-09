import { useState, useEffect } from 'react';
import { IUseFetch } from '../common/interfaces';
import { isCorrectData } from '../common/typeGuards';
import { API_KEY, API_HASH } from '../Keys';

export default function useFetch<T>(fetchUrl: string): IUseFetch<T> {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState(true);
	const [total, setTotal] = useState<number>();

	const url = `${fetchUrl}&ts=1&apikey=${API_KEY}&hash=${API_HASH}`;

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		const fetchData = async () => {
			setLoading(true);

			fetch(url, { signal })
				.then((res) => res.json())
				.then((result) => {
					if (isCorrectData(result)) {
						setData(result.data.results);
						setLoading(false);
						setTotal(result.data.total);
					}
				})
				.catch((err) => {
					if (err.name === 'AbortError') return;
					alert(`${err}. Try again later.`);
				});
		};

		fetchData();

		return () => abortController.abort();
	}, [url]);

	return { data, loading, total };
}
