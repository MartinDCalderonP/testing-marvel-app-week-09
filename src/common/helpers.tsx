import { API, paths } from './enums';
import { IObjects } from './interfaces';

export const capitalizeWord = (word: string) => {
	if (!word) return word;
	return word[0].toUpperCase() + word.substr(1).toLowerCase();
};

export const cardNavigationUrl = (id: number, type: string): string => {
	const navigationUrls: IObjects = {
		characters: `${paths.characters}/${id}`,
		comics: `${paths.comics}/${id}`,
		stories: `${paths.stories}/${id}`,
	};

	return navigationUrls[type];
};

export const detailFetchUrl = (id: string, type: string): string => {
	const fetchUrls: IObjects = {
		characters: `${API.characters}/${id}?`,
		comics: `${API.comics}/${id}?`,
		stories: `${API.stories}/${id}?`,
	};

	return fetchUrls[type];
};

export const searchNavigationUrl = (term: string, type: string): string => {
	const termToPath = term.replaceAll(' ', '+');

	const sections: IObjects = {
		characters: paths.characters,
		comics: paths.comics,
		stories: paths.stories,
	};

	return `${sections[type]}${paths.search}${termToPath}${paths.page}1`;
};

export const sectionFetchUrl = (
	currentPage: number,
	postsPerPage: number,
	query: string,
	comic: string,
	story: string,
	format: string,
	type: string
): string => {
	const offset = postsPerPage * (currentPage - 1);
	const paginationParams = `${API.limit}${postsPerPage}&${API.offset}${offset}`;

	const charactersFetchUrls: IObjects = {
		default: `${API.characters}?${paginationParams}`,
		query: `${API.characters}?${paginationParams}&${API.charactersSearch}${query}`,
		comic: `${API.comics}/${comic}${paths.characters}?${paginationParams}`,
		story: `${API.stories}/${story}${paths.characters}?${paginationParams}`,
	};

	const comicsFetchUrls: IObjects = {
		default: `${API.comics}?${paginationParams}`,
		query: `${API.comics}?${paginationParams}&${API.comicsSearch}${query}`,
		format: `${API.comics}?${API.format}${format}&${paginationParams}`,
	};

	const storiesFetchUrls: IObjects = {
		default: `${API.stories}?${paginationParams}`,
	};

	if (type === 'characters') {
		return query
			? charactersFetchUrls.query
			: comic
			? charactersFetchUrls.comic
			: story
			? charactersFetchUrls.story
			: charactersFetchUrls.default;
	}

	if (type === 'comics') {
		return query
			? comicsFetchUrls.query
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
	query: string,
	comic: string,
	story: string,
	format: string,
	type: string
): string => {
	const paginationParams = `${paths.page}${pageNumber}`;
	const searchParams = `${paths.search}${query}`;

	const charactersPaginationUrls: IObjects = {
		default: `${paths.characters}${paginationParams}`,
		query: `${paths.characters}${searchParams}${paginationParams}`,
		comic: `${paths.characters}${paths.comic}${comic}${paginationParams}`,
		story: `${paths.characters}${paths.story}${story}${paginationParams}`,
	};

	const comicsPaginationUrls: IObjects = {
		comics: `${paths.comics}${paginationParams}`,
		query: `${paths.comics}${searchParams}${paginationParams}`,
		format: `${paths.comics}${paths.format}${format}${paginationParams}`,
	};

	const storiesPaginationUrls: IObjects = {
		stories: `${paths.stories}${paginationParams}`,
		query: `${paths.stories}${searchParams}${paginationParams}`,
	};

	if (type === 'characters') {
		return query
			? charactersPaginationUrls.query
			: comic
			? charactersPaginationUrls.comic
			: story
			? charactersPaginationUrls.story
			: charactersPaginationUrls.default;
	}

	if (type === 'comics') {
		return query
			? comicsPaginationUrls.query
			: format
			? comicsPaginationUrls.format
			: comicsPaginationUrls.default;
	}

	if (type === 'stories') {
		return query ? storiesPaginationUrls.query : storiesPaginationUrls.default;
	}

	return '';
};

export const sectionNoResultsText = (
	query: string,
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

	if (query) {
		return ` "${query.replaceAll('+', ' ')}"`;
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

export const selectNavigationUrl = (term: string, type: string) => {
	const params = `${term}${paths.page}1`;

	const navigationUrls: IObjects = {
		comics: `${paths.characters}${paths.comic}${params}`,
		stories: `${paths.characters}${paths.story}${params}`,
		formats: `${paths.comics}${paths.format}${params}`,
	};

	return navigationUrls[type];
};

export const selectPlaceholder = (type: string) => {
	const placeholders: IObjects = {
		comics: ' comic',
		stories: ' story',
		formats: ' format',
	};

	return placeholders[type];
};
