import { ReactNode } from 'react';

export interface ICustomRoute {
	exact?: boolean;
	path: string;
	children: ReactNode;
}

export interface IUseFetch<T> {
	data: T | undefined;
	loading: boolean;
}

export interface ICardsContainer {
	className?: string;
	loading: boolean;
	posts: ICharacter[];
	type: string;
}

export interface IPaginationButtons<T> {
	totalPosts: T;
	postsPerPage: T;
	paginate: (paginate: number) => void;
	currentPage: T;
}

export interface ICard {
	id: number;
	name: string;
	thumbnail: {
		path: string;
		extension: string;
	};
	type: string;
}

export interface IDetailUrls {
	[key: string]: string;
}

export interface ICharacter {
	id: number;
	name: string;
	description: string;
	modified: string;
	thumbnail: Thumbnail;
	resourceURI: string;
	comics: Comics;
	series: Comics;
	stories: Stories;
	events: Comics;
	urls: URL[];
}

export interface Comics {
	available: number;
	collectionURI: string;
	items: ComicsItem[];
	returned: number;
}

export interface ComicsItem {
	resourceURI: string;
	name: string;
}

export interface Stories {
	available: number;
	collectionURI: string;
	items: StoriesItem[];
	returned: number;
}

export interface StoriesItem {
	resourceURI: string;
	name: string;
	type: Type;
}

export enum Type {
	Cover = 'cover',
	InteriorStory = 'interiorStory',
}

export interface Thumbnail {
	path: string;
	extension: string;
}

export interface URL {
	type: string;
	url: string;
}

export interface IUseParams {
	page: string;
	searchedTerm: string;
	comic: string;
	story: string;
	format: string;
}

export interface ISelect {
	comics?: boolean;
	stories?: boolean;
	format?: boolean;
}

export interface IComic {
	id: number;
	digitalId: number;
	title: Title;
	issueNumber: number;
	variantDescription: string;
	description: null;
	modified: string;
	isbn: string;
	upc: string;
	diamondCode: string;
	ean: string;
	issn: string;
	format: string;
	pageCount: number;
	textObjects: any[];
	resourceURI: string;
	urls: URL[];
	series: Series;
	variants: Series[];
	collections: any[];
	collectedIssues: any[];
	dates: DateElement[];
	prices: Price[];
	thumbnail: Thumbnail;
	images: any[];
	creators: Characters;
	characters: Characters;
	stories: Characters;
	events: Characters;
}

export interface Characters {
	available: number;
	collectionURI: string;
	items: Item[];
	returned: number;
}

export interface Item {
	resourceURI: string;
	name: string;
	role?: string;
	type?: string;
}

export interface DateElement {
	type: string;
	date: string;
}

export interface Price {
	type: string;
	price: number;
}

export interface Series {
	resourceURI: string;
	name: Title;
}

export enum Title {
	MarvelPreviews2017 = 'Marvel Previews (2017)',
	MarvelPreviews2017Present = 'Marvel Previews (2017 - Present)',
}

export interface Thumbnail {
	path: string;
	extension: string;
}

export interface URL {
	type: string;
	url: string;
}

export interface IStory {
	id: number;
	title: string;
	description: string;
	resourceURI: string;
	type: string;
	modified: string;
	thumbnail: null;
	creators: Characters;
	characters: Characters;
	series: Characters;
	comics: Characters;
	events: Characters;
	originalIssue: OriginalIssue;
}

export interface Characters {
	available: number;
	collectionURI: string;
	items: Item[];
	returned: number;
}

export interface OriginalIssue {
	resourceURI: string;
	name: string;
}

export interface IPostId {
	postId: string;
}

export interface ISearchInput {
	characters?: boolean;
	comics?: boolean;
	stories?: boolean;
}

export interface IDetailProps {
	type: string;
}

export interface IDetailParams {
	id: string;
}

export interface IDetailFetchUrls {
	[key: string]: string;
}
