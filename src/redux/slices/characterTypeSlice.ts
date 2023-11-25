import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CharacterType } from '../../common';
import RestService from '../../services/RestService';
import config from '../../config';


type CharacterTypeState = {
	characterTypeList: CharacterType[],
}
const initialState: CharacterTypeState = {
	characterTypeList: []
};

export const characterTypeFetch = createAsyncThunk(
	'characterType/characterTypeFetch',
	async () => {
		const currentGameId = localStorage.getItem('gameId');
		const { data } = await RestService.get(
			config.GMS_URL + `/games/${currentGameId}/character-types`
		);
		return data;
	}
);

const characterTypeSlice = createSlice({
	name: 'characterType',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(characterTypeFetch.fulfilled, (state, action) => {
				state.characterTypeList = action.payload.result;
			});
	},
});

const { reducer } = characterTypeSlice;
export default reducer;
