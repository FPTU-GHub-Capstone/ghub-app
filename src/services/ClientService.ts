import _ from 'lodash';

import { ACCESS_TOKEN, Client, FailureResponseGMS, RequestHeaders } from '../common';
import config from '../config';
import { Scopes, initScopes } from '../mock/permissions';

import {RestService} from './RestService';


const actionMapping = {
	0: 'get',
	1: 'create',
	2: 'update',
	3: 'delete',
};

const reverseActionMapping = {
	'get': 0,
	'create': 1,
	'update': 2,
	'delete': 3,
};

const token = localStorage.getItem(ACCESS_TOKEN);
const restSvc = RestService.getInstance();

export const createClient = async (requestBody: Client) => {
	const response = await restSvc.post<Client | FailureResponseGMS>(
		config.IDP_URL + '/clients',
		requestBody,
		{
			headers: {
				[RequestHeaders.AUTHORIZATION]: `Bearer ${token}`
			},
		},
	);
	console.log(`@statusCode:CreateClientAPI:: ${response}`);
	return response;
};

export const updateClient = async (requestBody: Client, clientId: string) => {
	const response = await restSvc.put<Client>(
		config.IDP_URL + `/clients/${clientId}`,
		requestBody,
		{
			headers: {
				[RequestHeaders.AUTHORIZATION]: `Bearer ${token}`
			},
		},
	);

	return response;
};

export const deleteClient = async (clientId: string) => {
	const response = await restSvc.delete(
		config.IDP_URL + `/clients/${clientId}`,
		null,
		{
			headers: {
				[RequestHeaders.AUTHORIZATION]: `Bearer ${token}`
			},
		},
	);

	return response;
};

export const convertToArrayScope = (gameId: string, list: Scopes) => {
	const scopes: string[] = [];
	Object.entries(list).map(([entityName, actions]) => {
		actions.map((action, index) => {
			if(action) scopes.push(`${entityName}:${gameId}:${actionMapping[index]}`);
		});
	});

	return scopes;
};

export const convertArrayToRecordScope = (array: string[]) => {
	const list: Scopes = _.cloneDeep(initScopes);
	let permission: string[];
	array.map((item) => {
		permission = item.split(':');
		if(permission[0] && permission[2]) {
			list[permission[0]][reverseActionMapping[permission[2]]] = true;
		}
	});

	return list;
};
