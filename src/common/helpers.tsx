import { API, paths } from './enums';
import { IObjects } from './interfaces';

export const capitalizeWord = (word: string) => {
	if (!word) return word;
	return word[0].toUpperCase() + word.substr(1).toLowerCase();
};

export const sectionFetchUrl = (
	currentPage: number,
	postsPerPage: number,
	searchedTerm: string,
	comic: string,
	story: string,
	format: string,
	type: string
): string => {
	const offset = postsPerPage * (currentPage - 1);
	const paginationParams = `${API.limit}${postsPerPage}&${API.offset}${offset}`;

	const charactersFetchUrls: IObjects = {
		default: `${API.characters}?${paginationParams}`,
		searchedTerm: `${API.characters}?${paginationParams}&${API.charactersSearch}${searchedTerm}`,
		comic: `${API.comics}/${comic}${paths.characters}?${paginationParams}`,
		story: `${API.stories}/${story}${paths.characters}?${paginationParams}`,
	};

	const comicsFetchUrls: IObjects = {
		default: `${API.comics}?${paginationParams}`,
		searchedTerm: `${API.comics}?${paginationParams}&${API.comicsSearch}${searchedTerm}`,
		format: `${API.comics}?${API.format}${format}&${paginationParams}`,
	};

	const storiesFetchUrls: IObjects = {
		default: `${API.stories}?${paginationParams}`,
	};

	if (type === 'characters') {
		return searchedTerm
			? charactersFetchUrls.searchedTerm
			: comic
			? charactersFetchUrls.comic
			: story
			? charactersFetchUrls.story
			: charactersFetchUrls.default;
	}

	if (type === 'comics') {
		return searchedTerm
			? comicsFetchUrls.searchedTerm
			: format
			? comicsFetchUrls.format
			: comicsFetchUrls.default;
	}

	if (type === 'stories') {
		return storiesFetchUrls.default;
	}

	return '';
};

export const sectionPaginationUrl = (
	pageNumber: number,
	searchedTerm: string,
	comic: string,
	story: string,
	format: string,
	type: string
): string => {
	const paginationParams = `${paths.page}${pageNumber}`;
	const searchParams = `${paths.search}${searchedTerm}`;

	const newUrls: IObjects = {
		characters: `${paths.characters}${paginationParams}`,
		charactersBySearch: `${paths.characters}${searchParams}${paginationParams}`,
		charactersByComic: `${paths.characters}${paths.comic}${comic}${paginationParams}`,
		charactersByStory: `${paths.characters}${paths.story}${story}${paginationParams}`,
		comics: `${paths.comics}${paginationParams}`,
		comicsBySearch: `${paths.comics}${searchParams}${paginationParams}`,
		comicsByFormat: `${paths.comics}${paths.format}${format}${paginationParams}`,
		stories: `${paths.stories}${paginationParams}`,
		storiesBySearch: `${paths.stories}${searchParams}${paginationParams}`,
	};

	return newUrls[type];
};

export const sectionNoResultsText = (
	searchedTerm: string,
	type: string
): string => {
	const noResultForSearchedTerm = ` "${searchedTerm.replaceAll('+', ' ')}"`;

	const noResultsTexts: IObjects = {
		characters: ' characters section',
		charactersBySearch: noResultForSearchedTerm,
		charactersByComic: ' this comic',
		charactersByStory: 'this story',
		comics: ' comics section',
		comicsBySearch: noResultForSearchedTerm,
		comicsByFormat: ' this format',
		stories: ' stories section',
		storiesBySearch: noResultForSearchedTerm,
	};

	return noResultsTexts[type];
};

export const selectFetchUrl = (type: string) => {
	const fetchUrls: IObjects = {
		comics: `${API.comics}?${API.limit}10`,
		stories: `${API.stories}?${API.limit}10`,
		formats: `${API.comics}?${API.limit}10`,
	};

	return fetchUrls[type];
};

export const selectNewUrl = (term: string, type: string) => {
	const params = `${term}${paths.page}1`;

	const newUrls: IObjects = {
		comics: `${paths.characters}${paths.comic}${params}`,
		stories: `${paths.characters}${paths.story}${params}`,
		formats: `${paths.comics}${paths.format}${params}`,
	};

	return newUrls[type];
};

export const selectPlaceholder = (type: string) => {
	const placeholders: IObjects = {
		comics: ' comic',
		stories: ' story',
		formats: ' format',
	};

	return placeholders[type];
};
