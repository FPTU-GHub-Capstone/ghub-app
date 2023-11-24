import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Client } from '../../common';
import RestService from '../../services/RestService';
import config from '../../config';


type ClientState = {
	clientList: Client[],
}
const initialState: ClientState = {
	clientList: []
};

export const clientsFetch = createAsyncThunk(
	'client/clientsFetch',
	async () => {
		const currentGameId = localStorage.getItem('gameId');
		const { data } = await RestService.get(
			config.IDP_URL + `/games/${currentGameId}/clients`
		);
		return data;
	}
);

const clientSlice = createSlice({
	name: 'client',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(clientsFetch.fulfilled, (state, action) => {
				state.clientList = action.payload.clients;
			});
	},
});

const { reducer } = clientSlice;
export default reducer;
