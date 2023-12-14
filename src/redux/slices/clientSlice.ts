import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Client, GAME_ID } from '../../common';
import { RestService } from '../../services/RestService';
import config from '../../config';


type ClientState = {
	clientList: Client[],
};

type GetClientByGameIdResponse = {
	clients: Client[],
}

const initialState: ClientState = {
	clientList: [],
};

export const clientsFetch = createAsyncThunk(
	'client/clientsFetch',
	async () => {
		const currentGameId = localStorage.getItem(GAME_ID);
		const { data } = await RestService.getInstance().get<GetClientByGameIdResponse>(
			config.IDP_URL + `/games/${currentGameId}/clients`,
		);
		return data.clients;
	},
);

const clientSlice = createSlice({
	name: 'client',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(clientsFetch.fulfilled, (state, action) => {
			state.clientList = action.payload;
		});
	},
});

const { reducer } = clientSlice;
export default reducer;
