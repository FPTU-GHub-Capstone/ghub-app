import { ACCESS_TOKEN, Client, EntityName, RequestHeaders } from '../common';
import config from '../config';

import RestService from './RestService';


const getActionEntity = (index: number) => {
	const actions = {
		0: 'read',
		1: 'create',
		2: 'update',
		3: 'delete',
	};

	return actions[index];
};

const token = localStorage.getItem(ACCESS_TOKEN);

export const createClient = async (requestBody: Client) => {
	
	try {
		const result = await RestService.post<Client>(
			config.IDP_URL + '/clients',
			requestBody,
			{
				headers: {
					[RequestHeaders.AUTHORIZATION]: `Bearer ${token}`
				},
			},
		);
		console.log(`@statusCode:CreateClientAPI:: ${result.status}`);
	} catch (error) {
		console.log(`@ERROR:Create Client API :: ${error}`);
	}
};

export const updateClient = async (requestBody: Client) => {
	await RestService.put<Client>(
		config.IDP_URL + '/clients',
		requestBody,
		{
			headers: {
				[RequestHeaders.AUTHORIZATION]: `Bearer ${token}`
			},
		},
	);
};

export const convertToArrayScope = (list: Record<EntityName, [boolean, boolean, boolean, boolean]>) => {
	const scopes: string[] = [];
	Object.entries(list).map(([entityName, actions]) => {
		actions.map((action, index) => {
			if(action) scopes.push(`${entityName}:${getActionEntity(index)}`);
		});
	});

	return scopes;
};
