import { FailureResponse, User } from '../common';
import config from '../config';

import { RestService } from './RestService';


const restSvc = RestService.getInstance();
export const getUserByEmail = async (email: string) => {
	const response = await restSvc.get(
		config.IDP_URL + `/users?email=${email}`,
	);
	console.log(`@statusCode:getUserByEmailAPI:: ${response}`);
	return response;
};
