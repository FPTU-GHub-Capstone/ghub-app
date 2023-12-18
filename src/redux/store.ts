import { configureStore } from '@reduxjs/toolkit';

import gameReducer from './slices/gameSlice';
import playerReducer from './slices/playerSlice';
import clientReducer from './slices/clientSlice';
import authReducer from './slices/authSlide';
import teamReducer from './slices/teamSlide';
import billReducer from './slices/billSlide';
import userReducer from './slices/userSlide';


export const store = configureStore({
	reducer: {
		game: gameReducer,
		player: playerReducer,
		client: clientReducer,
		auth: authReducer,
		team: teamReducer,
		bill: billReducer,
		user: userReducer
	}
});

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
