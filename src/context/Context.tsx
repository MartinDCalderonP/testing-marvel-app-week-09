import { createContext, useReducer, useContext, ReactNode } from 'react';
import { Action, State, Context } from '../common/types';

const initialState = {
	bookmarks: {
		characters: [],
		comics: [],
		stories: [],
	},
};
export const actionTypes = {
	ADD_BOOKMARKS: 'ADD_BOOKMARKS',
	REMOVE_BOOKMARK: 'REMOVE_BOOKMARK',
};

const CounterContext = createContext<Context>({} as Context);

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
		default:
			throw new Error();
	}
}

export function CounterProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer<any>(reducer, initialState);

	return (
		<CounterContext.Provider value={{ state, dispatch }}>
			{children}
		</CounterContext.Provider>
	);
}

export function useCounter() {
	const context = useContext(CounterContext);

	if (!context) {
		throw new Error('useCounter must be used within a CounterProvider');
	}

	return context;
}
