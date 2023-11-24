import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Game } from '../../common';
import { AppState } from '../store';


type GamesState = {
	gameList: Game[],
	currentGame: Game,
}
const initialState: GamesState = {
	gameList: [],
	currentGame: {} as Game,
};

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
});

export const { setCurrentGame } = gameSlice.actions;

export const getCurrentGame = (state: AppState) => state.game.currentGame;

const { reducer } = gameSlice;
export default reducer;
