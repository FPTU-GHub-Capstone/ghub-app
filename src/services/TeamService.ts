import { FailureResponse, User } from '../common';
import config from '../config';

import { RestService } from './RestService';


const actionMapping = {
	0: 'get',
	1: 'update',
	2: 'delete',
};
const restSvc = RestService.getInstance();
export const getUserByEmail = async (email: string) => {
	const response = await restSvc.get(
		config.IDP_URL + `/users?email=${email}`,
	);
	console.log(`@statusCode:getUserByEmailAPI:: ${response}`);
	return response;
};

export const setMemberPermission = async (uid: string, scope: string[]) => {
	const reqBody = { scope: scope };
	const response = await restSvc.put(
		config.IDP_URL + `/users/${uid}/add-scope`,
		reqBody
	);
	// console.log(`@statusCode:setMemberPermissionAPI:: ${JSON.stringify(response, undefined, 4)}`);
	return response;
};

export const convertToArrayScope = (gameId: string, list: boolean[]) => {
	const scopes: string[] = [];

	Object.entries(list).map(([index, action]) => {
		if(action) scopes.push(`games:${gameId}:${actionMapping[index]}`);
	});
	return scopes;
};
