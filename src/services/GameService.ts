import { ACCESS_TOKEN, FailureResponse, Game, RequestHeaders } from '../common';
import config from '../config';

import RestService from './RestService';


const token = localStorage.getItem(ACCESS_TOKEN);

export const createGame = async (requestBody: Game) => {
	const response = await RestService.post<Game | FailureResponse>(
		config.GMS_URL + '/games',
		requestBody,
		{
			headers: {
				[RequestHeaders.AUTHORIZATION]: `Bearer ${token}`
			},
		},
	);
	console.log(`@statusCode:CreateGameAPI:: ${response.data}`);
	return response;
};
