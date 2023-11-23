import _ from 'lodash';

import { ACCESS_TOKEN, Client, EntityName, FailureResponse, RequestHeaders } from '../common';
import config from '../config';
import { initScopes } from '../mock/permissions';

import RestService from './RestService';


const actionMapping = {
	0: 'read',
	1: 'create',
	2: 'update',
	3: 'delete',
};

const reverseActionMapping = {
	'read': 0,
	'create': 1,
	'update': 2,
	'delete': 3,
};

const token = localStorage.getItem(ACCESS_TOKEN);

export const createClient = async (requestBody: Client) => {
	const response = await RestService.post<Client | FailureResponse>(
		config.IDP_URL + '/clients',
		requestBody,
		{
			headers: {
				[RequestHeaders.AUTHORIZATION]: `Bearer ${token}`
			},
		},
	);
	console.log(`@statusCode:CreateClientAPI:: ${response.status}`);
	return response;
};

export const updateClient = async (requestBody: Client, clientId: string) => {
	const response = await RestService.put<Client>(
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
	const response = await RestService.delete(
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

export const convertToArrayScope = (list: Record<EntityName, [boolean, boolean, boolean, boolean]>) => {
	const scopes: string[] = [];
	Object.entries(list).map(([entityName, actions]) => {
		actions.map((action, index) => {
			if(action) scopes.push(`${entityName}:${actionMapping[index]}`);
		});
	});

	return scopes;
};

export const convertArrayToRecordScope = (array: string[]) => {
	const list: Record<EntityName, [boolean, boolean, boolean, boolean]> = _.cloneDeep(initScopes);
	let permission: string[];
	array.map((item) => {
		permission = item.split(':');
		if(permission[0] && permission[1]) {
			list[permission[0]][reverseActionMapping[permission[1]]] = true;
		}
	});

	return list;
};
