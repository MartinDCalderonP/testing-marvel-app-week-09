import { createContext, useReducer, useContext, ReactNode } from 'react';
import { Action, State, Context } from '../common/types';

const initialState = {
	bookmarks: [],
};

export const actionTypes = {
	ADD_BOOKMARKS: 'ADD_BOOKMARKS',
	REMOVE_BOOKMARK: 'REMOVE_BOOKMARK',
	CLEAR_BOOKMARKS: 'CLEAR_BOOKMARKS',
};

const StateContext = createContext<Context>({} as Context);

function reducer(state: State, action: Action) {
	switch (action.type) {
		case actionTypes.ADD_BOOKMARKS:
			return {
				...state,
				bookmarks: action.bookmarks,
			};

		case actionTypes.REMOVE_BOOKMARK:
			return {
				...state,
				bookmarks: action.bookmarks,
			};

		case actionTypes.CLEAR_BOOKMARKS:
			return {
				...state,
				bookmarks: [],
			};

		default:
			throw new Error();
	}
}

export function StateProvider({ children }: { children: ReactNode }) {
	const storagedState = window.localStorage.getItem('bookmarks');
	const [state, dispatch] = useReducer(
		reducer,
		storagedState ? JSON.parse(storagedState) : initialState
	);

	return (
		<StateContext.Provider value={{ state, dispatch }}>
			{children}
		</StateContext.Provider>
	);
}

export function useContextState() {
	const context = useContext(StateContext);

	if (!context) {
		throw new Error('useStateValue must be used within a StateProvider');
	}

	return context;
}
