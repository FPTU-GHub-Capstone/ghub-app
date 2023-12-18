import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { User } from '../../common';
import { RestService } from '../../services/RestService';
import config from '../../config';


type UserState = {
	userList: User[],
};
const initialState: UserState = {
	userList: [],
};

export const usersFetch = createAsyncThunk(
	'user/usersFetch',
	async (currentGameId: string) => {
		const { data } = await RestService.getInstance().get(
			config.IDP_URL + `/games/${currentGameId}/users`,
		);
		return data;
	},
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(usersFetch.fulfilled, (state, action) => {
			state.userList = action.payload.users;
		});
	},
});

const { reducer } = userSlice;
export default reducer;
