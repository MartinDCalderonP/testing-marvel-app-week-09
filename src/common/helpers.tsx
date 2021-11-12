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

	const charactersPaginationUrls: IObjects = {
		default: `${paths.characters}${paginationParams}`,
		searchedTerm: `${paths.characters}${searchParams}${paginationParams}`,
		comic: `${paths.characters}${paths.comic}${comic}${paginationParams}`,
		story: `${paths.characters}${paths.story}${story}${paginationParams}`,
	};

	const comicsPaginationUrls: IObjects = {
		comics: `${paths.comics}${paginationParams}`,
		searchedTerm: `${paths.comics}${searchParams}${paginationParams}`,
		format: `${paths.comics}${paths.format}${format}${paginationParams}`,
	};

	const storiesPaginationUrls: IObjects = {
		stories: `${paths.stories}${paginationParams}`,
		searchedTerm: `${paths.stories}${searchParams}${paginationParams}`,
	};

	if (type === 'characters') {
		return searchedTerm
			? charactersPaginationUrls.searchedTerm
			: comic
			? charactersPaginationUrls.comic
			: story
			? charactersPaginationUrls.story
			: charactersPaginationUrls.default;
	}

	if (type === 'comics') {
		return searchedTerm
			? comicsPaginationUrls.searchedTerm
			: format
			? comicsPaginationUrls.format
			: comicsPaginationUrls.default;
	}

	if (type === 'stories') {
		return searchedTerm
			? storiesPaginationUrls.searchedTerm
			: storiesPaginationUrls.default;
	}

	return '';
};

export const sectionNoResultsText = (
	searchedTerm: string,
	comic: string,
	story: string,
	format: string,
	type: string
): string => {
	const charactersNoResultsTexts: IObjects = {
		characters: ' characters section',
		comic: ' this comic',
		story: 'this story',
	};

	const comicsNoResultsTexts: IObjects = {
		comics: ' comics section',
		format: ' this format',
	};

	if (searchedTerm) {
		return ` "${searchedTerm.replaceAll('+', ' ')}"`;
	}

	if (type === 'characters') {
		return comic
			? charactersNoResultsTexts.comic
			: story
			? charactersNoResultsTexts.story
			: charactersNoResultsTexts.default;
	}

	if (type === 'comics') {
		return format ? comicsNoResultsTexts.format : comicsNoResultsTexts.default;
	}

	if (type === 'stories') {
		return ' stories section';
	}

	return '';
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
