import { API, paths } from '../common/enums';
import {
	capitalizeWord,
	cardNavigationUrl,
	detailFetchUrl,
	searchNavigationUrl,
	sectionFetchUrl,
	sectionPaginationUrl,
	sectionNoResultsText,
	selectFetchUrl,
	selectNavigationUrl,
	selectPlaceholder,
} from '../common/helpers';

test('should capitalize word', () => {
	expect(capitalizeWord('test')).toBe('Test');
});

test('should return url to navigate', () => {
	expect(cardNavigationUrl(1, 'characters')).toBe(`${paths.characters}/1`);
});

test('should return detail fetch url', () => {
	expect(detailFetchUrl('1', 'characters')).toBe(`${API.characters}/1?`);
});

test('should return search url to navigate', () => {
	expect(searchNavigationUrl('test', 'characters')).toBe(
		`${paths.characters}${paths.search}test${paths.page}1`
	);
});

test('should return section fetch url', () => {
	expect(sectionFetchUrl(1, 10, '', '', '', '', 'characters')).toBe(
		`${API.characters}?${API.limit}10&${API.offset}0`
	);
});

test('should return section pagination url', () => {
	expect(sectionPaginationUrl(5, '', '', '', '', 'characters')).toBe(
		`${paths.characters}${paths.page}5`
	);
});

test('should return no results text', () => {
	expect(sectionNoResultsText('', '', '', '', 'comics')).toBe(
		' comics section'
	);
});

test('should return select fetch url', () => {
	expect(selectFetchUrl('stories')).toBe(`${API.stories}?${API.limit}10`);
});

test('should return select url to navigate', () => {
	expect(selectNavigationUrl('183', 'comics')).toBe(
		`${paths.characters}${paths.comic}183${paths.page}1`
	);
});

test('should return select placeholder', () => {
	expect(selectPlaceholder('formats')).toBe(' format');
});
