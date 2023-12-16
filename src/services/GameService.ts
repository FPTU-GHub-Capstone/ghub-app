import { ACCESS_TOKEN, FailureResponseGMS, Game, HttpResponseGMS, RequestHeaders } from '../common';
import config from '../config';

import { RestService } from './RestService';


const token = localStorage.getItem(ACCESS_TOKEN);

export const createGame = async (requestBody: Game) => {
	const response = await RestService.getInstance().post<HttpResponseGMS<Game> | FailureResponseGMS>(
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
	const response = await RestService.getInstance().get<HttpResponseGMS<Game> | FailureResponseGMS>(
		`${config.GMS_URL}/games/${gameId}`
	);
	console.log(`@statusCode:GetCurrentGameAPI:: ${response.data}`);
	if (!response.data.isError) {
		return response.data as HttpResponseGMS<Game>;
	} else {
		return response.data as FailureResponseGMS;
	}
};
