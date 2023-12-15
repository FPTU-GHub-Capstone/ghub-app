import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { User } from '../../common';
import { RestService } from '../../services/RestService';
import config from '../../config';


type TeamState = {
	memberList: User[],
};
const initialState: TeamState = {
	memberList: [],
};

export const membersFetch = createAsyncThunk(
	'team/membersFetch',
	async (currentGameId: string) => {
		const { data } = await RestService.getInstance().get(
			config.IDP_URL + `/games/${currentGameId}/users`,
		);
		return data;
	},
);

const teamSlice = createSlice({
	name: 'team',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(membersFetch.fulfilled, (state, action) => {
			state.memberList = action.payload.users;
		});
	},
});

const { reducer } = teamSlice;
export default reducer;
