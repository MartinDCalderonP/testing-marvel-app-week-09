import { text } from '@fortawesome/fontawesome-svg-core';
import { IBookmark } from '../common/interfaces';
import { initialState, reducer, actionTypes } from '../context/Context';

test('should return default state if no action is passed', () => {
	expect(reducer(undefined, {})).toEqual(initialState);
});

test('should add Bookmark to state', () => {
	const newBookmark = {
		id: 1,
		name: 'Test',
		thumbnail: 'Test.jpg',
		type: 'comic',
	};

	const action = {
		type: actionTypes.ADD_BOOKMARKS,
		bookmarks: [newBookmark],
	};

	const newState = reducer(initialState, action);

	expect(newState.bookmarks).toEqual([newBookmark]);
});

test('should remove Bookmark in state', () => {
	const newBookmark = {
		id: 1,
		name: 'Test',
		thumbnail: 'Test.jpg',
		type: 'comic',
	};

	const toRemovedBookmark = {
		id: 2,
		name: 'Test2',
		thumbnail: 'Test2.jpg',
		type: 'story',
	};

	const addAction = {
		type: actionTypes.ADD_BOOKMARKS,
		bookmarks: [newBookmark],
	};

	const newState = reducer(initialState, addAction);

	const newBookmarks = newState.bookmarks.filter(
		(bookmark: IBookmark) =>
			bookmark.id !== toRemovedBookmark.id &&
			bookmark.type === toRemovedBookmark.type
	);

	const removeAction = {
		type: actionTypes.REMOVE_BOOKMARK,
		bookmarks: newBookmarks,
	};

	const finalState = reducer(newState, removeAction);

	expect(finalState.bookmarks).toEqual(newBookmarks);
});

test('should clear Bookmarks in state', () => {
	const newBookmark = {
		id: 1,
		name: 'Test',
		thumbnail: 'Test.jpg',
		type: 'comic',
	};

	const addAction = {
		type: actionTypes.ADD_BOOKMARKS,
		bookmarks: [newBookmark],
	};

	const newState = reducer(initialState, addAction);

	const clearAction = {
		type: actionTypes.CLEAR_BOOKMARKS,
	};

	const newState2 = reducer(newState, clearAction);

	expect(newState2.bookmarks).toEqual([]);
});

test('should add Hidden Post to state', () => {
	const newHiddenPost = '49';

	const action = {
		type: actionTypes.ADD_HIDDEN_POST,
		hiddenPosts: [newHiddenPost],
	};

	const newState = reducer(initialState, action);

	expect(newState.hiddenPosts).toEqual([newHiddenPost]);
});

test('should clear Hidden Posts in state', () => {
	const newHiddenPost = '49';

	const addAction = {
		type: actionTypes.ADD_HIDDEN_POST,
		hiddenPosts: [newHiddenPost],
	};

	const newState = reducer(initialState, addAction);

	const clearAction = {
		type: actionTypes.CLEAR_HIDDEN_POSTS,
	};

	const newState2 = reducer(newState, clearAction);

	expect(newState2.hiddenPosts).toEqual([]);
});
