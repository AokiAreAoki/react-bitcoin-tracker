import { createSlice } from '@reduxjs/toolkit';

let uid = 0
export const methods = {
	byDate: ++uid,
	byPrice: ++uid,
}

const sortingSlice = createSlice({
	name: 'sortMethod',
	initialState: {
		method: methods.byDate,
		ascending: true,
	},
	reducers: {
		setSortMethodOrToggleAscending: ( state, action ) => {
			const method = Math.floor( action.payload )

			if( 1 <= method && method <= uid ){
				if( state.method !== method )
					state.method = method
				else
					state.ascending = !state.ascending
			}
		},
	},
})

export default sortingSlice
export const actions = sortingSlice.actions