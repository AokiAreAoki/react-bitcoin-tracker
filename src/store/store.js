import { configureStore } from '@reduxjs/toolkit';
import { loadState } from './localStorage';
import history from './slices/history';
import tracker from './slices/tracker';
import sorting from './slices/sorting';
import pagination from './slices/pagination';

export const store = configureStore({
	reducer: {
		history: history.reducer,
		tracker: tracker.reducer,
		sorting: sorting.reducer,
		pagination: pagination.reducer,
	},
	preloadedState: loadState(),
})

export const actions = {
	...history.actions,
	...tracker.actions,
	...sorting.actions,
	...pagination.actions,
}