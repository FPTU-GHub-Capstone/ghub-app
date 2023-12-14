import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Client } from '../../common';
import { RestService } from '../../services/RestService';
import config from '../../config';


type ClientState = {
	clientList: Client[],
};
const initialState: ClientState = {
	clientList: [],
};

export const clientsFetch = createAsyncThunk(
	'client/clientsFetch',
	async (currentGameId: string) => {
		const { data } = await RestService.getInstance().get(
			config.IDP_URL + `/games/${currentGameId}/clients`,
		);
		return data;
	},
);

const clientSlice = createSlice({
	name: 'client',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(clientsFetch.fulfilled, (state, action) => {
			state.clientList = action.payload.clients;
		});
	},
});

const { reducer } = clientSlice;
export default reducer;
