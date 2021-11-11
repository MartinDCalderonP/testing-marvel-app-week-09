import { API, paths } from './enums';
import { IUrlsObject } from './interfaces';

export const capitalizeWord = (word: string) => {
	if (!word) return word;
	return word[0].toUpperCase() + word.substr(1).toLowerCase();
};

export const currentFetchUrl = (
	currentPage: number,
	postsPerPage: number,
	searchedTerm: string,
	comic: string,
	story: string
): string => {
	const offset = postsPerPage * (currentPage - 1);
	const commonFetchParams = `${API.limit}${postsPerPage}&${API.offset}${offset}`;

	const fetchUrls: IUrlsObject = {
		default:
			`${API.characters}?${commonFetchParams}` +
			(searchedTerm ? `&${API.charactersSearch}${searchedTerm}` : ''),
		comic: `${API.comics}/${comic}${paths.characters}?${commonFetchParams}`,
		story: `${API.stories}/${story}${paths.characters}?${commonFetchParams}`,
	};

	const currentFetchUrl = comic
		? fetchUrls.comic
		: story
		? fetchUrls.story
		: fetchUrls.default;

	return currentFetchUrl;
};

export const currentNewUrl = (
	pageNumber: number,
	searchedTerm: string,
	comic: string,
	story: string
): string => {
	const paginationParams = `${paths.page}${pageNumber}`;

	const newUrls: IUrlsObject = {
		default: `${paths.characters}${paginationParams}`,
		searchedTerm: `${paths.search}${searchedTerm}${paginationParams}`,
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
