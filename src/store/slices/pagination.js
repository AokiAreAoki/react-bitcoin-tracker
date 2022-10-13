import { createSlice } from '@reduxjs/toolkit';

const pagination = createSlice({
	name: 'pagination',
	initialState: {
		page: 0,
		pageSize: 10,
	},
	reducers: {
		nextPage: ( state, action ) => {
			state.page = ++state.page % action.payload
		},
		prevPage: ( state, action ) => {
			if( --state.page < 0 )
				state.page += action.payload
		},
		setPageSize: ( state, action ) => {
			state.pageSize = action.payload
		},
	},
})

export default pagination
export const actions = pagination.actions