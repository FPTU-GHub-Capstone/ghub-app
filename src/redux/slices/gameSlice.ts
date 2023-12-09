import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Game } from '../../common';
import { AppState } from '../store';
import config from '../../config';
import RestService from '../../services/RestService';


type GamesState = {
	gameList: Game[],
	currentGame: Game,
}
const initialState: GamesState = {
	gameList: [],
	currentGame: {} as Game,
};

export const gamesFetch = createAsyncThunk(
	'game/gamesFetch',
	async () => {
		RestService.useAuthInterceptor();
		const { data } = await RestService.get(
			`${config.GMS_URL}/games`
		);
		return data;
	}
);

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setCurrentGame: (
			state: GamesState,
			actions: PayloadAction<Game>
		) => {
			state.currentGame = actions.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(gamesFetch.fulfilled, (state, action) => {
				state.gameList = action.payload.result;
			});
	},
});

export const { setCurrentGame } = gameSlice.actions;

export const getCurrentGame = (state: AppState) => state.game.currentGame;

const { reducer } = gameSlice;
export default reducer;
