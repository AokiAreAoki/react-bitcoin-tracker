import { createSlice } from '@reduxjs/toolkit';

const trackerSlice = createSlice({
	name: 'tracker',
	initialState: {
		updateInterval: 60e3,
		lastRequest: 0,
	},
	reducers: {
		setInterval: ( state, action ) => {
			state.updateInterval = action.payload
		},
		setLastRequest: ( state, action ) => {
			state.lastRequest = action.payload
		}
	},
})

export default trackerSlice
export const actions = trackerSlice.actions