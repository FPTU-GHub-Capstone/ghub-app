import { configureStore } from '@reduxjs/toolkit';

import gameReducer from './slices/gameSlice';
import playerReducer from './slices/playerSlice';
import clientReducer from './slices/clientSlice';
import characterTypeReducer from './slices/characterTypeSlice';


export const store = configureStore({
	reducer: {
		game: gameReducer,
		player: playerReducer,
		client: clientReducer,
		characterType: characterTypeReducer,
	}
});

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
