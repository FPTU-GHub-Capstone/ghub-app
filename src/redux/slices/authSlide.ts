import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { User } from '../../common';
import { RestService } from '../../services/RestService';
import config from '../../config';


type AuthState = {
	isAuthenticated: boolean,
	currentUser?: User,
};
const initialState: AuthState = {
	isAuthenticated: false,
};

export const clientsFetch = createAsyncThunk(
	'client/clientsFetch',
	async () => {
		const currentGameId = localStorage.getItem('gameId');
		const { data } = await RestService.getInstance().get(
			config.IDP_URL + `/games/${currentGameId}/clients`,
		);
		return data;
	},
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCurrentUser: (state: AuthState, actions: PayloadAction<User>) => {
			state.currentUser = actions.payload;
			state.isAuthenticated = true;
		},
	},
	// extraReducers: (builder) => {
	// 	builder.addCase(logOut.fulfilled, (state, action) => {
	// 		state.isAuthenticated = false;
	// 		state.currentUser = undefined;
	// 	});
	// },
});

export const { setCurrentUser } = authSlice.actions;

const { reducer } = authSlice;
export default reducer;
