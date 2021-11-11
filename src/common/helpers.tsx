import { API, paths } from './enums';
import { IUrlsObject } from './interfaces';

export const capitalizeWord = (word: string) => {
	if (!word) return word;
	return word[0].toUpperCase() + word.substr(1).toLowerCase();
};

export const charactersCurrentFetchUrl = (
	currentPage: number,
	postsPerPage: number,
	searchedTerm: string,
	comic: string,
	story: string
): string => {
	const offset = postsPerPage * (currentPage - 1);
	const commonFetchParams = `${API.limit}${postsPerPage}&${API.offset}${offset}`;

	const fetchUrls: IUrlsObject = {
		default: `${API.characters}?${commonFetchParams}`,
		comic: `${API.comics}/${comic}${paths.characters}?${commonFetchParams}`,
		story: `${API.stories}/${story}${paths.characters}?${commonFetchParams}`,
	};

	const searchParams = searchedTerm
		? `&${API.charactersSearch}${searchedTerm}`
		: '';

	const currentFetchUrl = comic
		? fetchUrls.comic
		: story
		? fetchUrls.story
		: fetchUrls.default;

	return currentFetchUrl + searchParams;
};

export const charactersCurrentNewUrl = (
	pageNumber: number,
	searchedTerm: string,
	comic: string,
	story: string
): string => {
	const paginationParams = `${paths.page}${pageNumber}`;

	const newUrls: IUrlsObject = {
		default: `${paths.characters}${paginationParams}`,
		searchedTerm: `${paths.characters}${paths.search}${searchedTerm}${paginationParams}`,
		comic: `${paths.characters}${paths.comic}${comic}${paginationParams}`,
		story: `${paths.characters}${paths.story}${story}${paginationParams}`,
	};

	const currentNewUrl = searchedTerm
		? newUrls.searchedTerm
		: comic
		? newUrls.comic
		: story
		? newUrls.story
		: newUrls.default;

	return currentNewUrl;
};

export const comicsCurrentFetchUrl = (
	currentPage: number,
	postsPerPage: number,
	searchedTerm: string,
	format: string
): string => {
	const offset = postsPerPage * (currentPage - 1);
	const commonFetchParams = `${API.limit}${postsPerPage}&${API.offset}${offset}`;

	const fetchUrls: IUrlsObject = {
		default: `${API.comics}?${commonFetchParams}`,
		format: `${API.comics}?${API.format}${format}&${commonFetchParams}`,
	};

	const searchParams = searchedTerm
		? `&${API.comicsSearch}${searchedTerm}`
		: '';

	const currentFetchUrl = format ? fetchUrls.format : fetchUrls.default;

	return currentFetchUrl + searchParams;
};

export const comicsCurrentNewUrl = (
	searchedTerm: string,
	pageNumber: number
) => {
	const newUrls: IUrlsObject = {
		default: `${paths.comics}${paths.page}${pageNumber}`,
		searchedTerm: `${paths.comics}${paths.search}${searchedTerm}${paths.page}${pageNumber}`,
	};

	const currentNewUrl = searchedTerm ? newUrls.searchedTerm : newUrls.default;

	return currentNewUrl;
};

export const storiesCurrentFetchUrl = (
	currentPage: number,
	postsPerPage: number
): string => {
	const offset = postsPerPage * (currentPage - 1);

	return `${API.stories}?${API.limit}${postsPerPage}&${API.offset}${offset}`;
};

export const storiesCurrentNewUrl = (
	searchedTerm: string,
	pageNumber: number
) => {
	const newUrls: IUrlsObject = {
		default: `${paths.stories}${paths.page}${pageNumber}`,
		searchedTerm: `${paths.stories}${paths.search}${searchedTerm}${paths.page}${pageNumber}`,
	};

	const currentNewUrl = searchedTerm ? newUrls.searchedTerm : newUrls.default;

	return currentNewUrl;
};

export const selectFetchUrl = (comics: boolean | undefined) => {
	if (comics) {
		return `${API.comics}?${API.limit}10`;
	} else {
		return `${API.stories}?${API.limit}10`;
	}
};

export const selectCurrentNewUrl = (
	term: string,
	formats: boolean | undefined,
	comics: boolean | undefined
) => {
	const newUrlCommonParams = `${term}${paths.page}1`;

	const newUrls: IUrlsObject = {
		comics: `${paths.characters}${paths.comic}${newUrlCommonParams}`,
		stories: `${paths.characters}${paths.story}${newUrlCommonParams}`,
		formats: `${paths.comics}${paths.format}${newUrlCommonParams}`,
	};

	const currentNewUrl = formats
		? newUrls.formats
		: comics
		? newUrls.comics
		: newUrls.stories;

	return currentNewUrl;
};
