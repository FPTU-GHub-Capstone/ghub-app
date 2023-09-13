import { createSlice } from '@reduxjs/toolkit';

import { Game } from '../../common';


type GamesState = {
	gameList: Game[],
}
const initialState: GamesState = {
	gameList: []
};

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {},
});

const { reducer } = gameSlice;
export default reducer;