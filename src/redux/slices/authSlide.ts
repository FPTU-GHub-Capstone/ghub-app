import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User, UserRole } from '../../common';


type AuthState = {
	isAuthenticated: boolean,
	currentUser?: User,
	role: string,
};
const initialState: AuthState = {
	isAuthenticated: false,
	role: ''
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCurrentUser: (state: AuthState, actions: PayloadAction<User>) => {
			state.currentUser = actions.payload;
			if(actions.payload != null){
				if( actions.payload.scope.includes('games:*')){
					state.role = UserRole.ADMIN;
				}
				else {
					state.role = UserRole.USER;
				}
			}
			
			state.isAuthenticated = true;
		},
	},
});

export const { setCurrentUser } = authSlice.actions;

const { reducer } = authSlice;
export default reducer;
