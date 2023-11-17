import { configureStore } from '@reduxjs/toolkit';

import gameReducer from './slices/gameSlice';
import playerReducer from './slices/playerSlice';


export const store = configureStore({
	reducer: {
		game: gameReducer,
		player: playerReducer,
	}
});

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
