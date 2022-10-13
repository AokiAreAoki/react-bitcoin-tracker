import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
	name: 'history',
	initialState: [],
	reducers: {
		addCurrency: ( state, action ) => {
			state.push( action.payload )
		},
	},
})

export default historySlice
export const actions = historySlice.actions