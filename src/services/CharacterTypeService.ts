import { CharacterType, FailureResponse } from '../common';
import config from '../config';

import RestService from './RestService';


export const createClient = async (requestBody: CharacterType) => {
	const response = await RestService.post<CharacterType | FailureResponse>(
		config.GMS_URL + '/character-types',
		requestBody,
	);
	console.log(`@statusCode:CreateCharacterTypeAPI:: ${response.status}`);
	return response;
};
