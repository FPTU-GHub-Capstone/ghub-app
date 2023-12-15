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

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCurrentUser: (state: AuthState, actions: PayloadAction<User>) => {
			state.currentUser = actions.payload;
			state.isAuthenticated = true;
		},
	},
});

export const { setCurrentUser } = authSlice.actions;

const { reducer } = authSlice;
export default reducer;
