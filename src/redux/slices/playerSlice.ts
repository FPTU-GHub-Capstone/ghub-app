import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { GAME_ID, User } from '../../common';
import { RestService } from '../../services/RestService';
import config from '../../config';


type PlayerState = {
	playerList: User[],
};
const initialState: PlayerState = {
	playerList: [],
};

export const playersFetch = createAsyncThunk(
	'player/playersFetch',
	async (currentGameId: string) => {
		const { data } = await RestService.getInstance().get(
			config.GMS_URL + `/games/${currentGameId}/users`,
		);
		return data;
	},
);

const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(playersFetch.fulfilled, (state, action) => {
			state.playerList = action.payload.result;
		});
	},
});

const { reducer } = playerSlice;
export default reducer;
