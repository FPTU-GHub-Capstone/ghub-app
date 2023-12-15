import { ACCESS_TOKEN, FailureResponse, Game, RequestHeaders } from '../common';
import config from '../config';

import { RestService } from './RestService';


const token = localStorage.getItem(ACCESS_TOKEN);

export const createGame = async (requestBody: Game) => {
	const response = await RestService.getInstance().post<Game | FailureResponse>(
		config.GMS_URL + '/games',
		requestBody,
		{
			headers: {
				[RequestHeaders.AUTHORIZATION]: `Bearer ${token}`,
			},
		},
	);
	console.log(`@statusCode:CreateGameAPI:: ${response.data}`);
	return response;
};

export const getCurrentGame = async (gameId: string) => {
	const response = await RestService.getInstance().get<Game | FailureResponse>(
		`${config.GMS_URL}/games/${gameId}`
	);
	console.log(`@statusCode:GetCurrentGameAPI:: ${response.data}`);
	return response;
};
