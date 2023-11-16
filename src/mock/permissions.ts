import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

import { EntityName } from '../common';


export type PermissionBody = {
	id: string,
	clientId: string,
	clientSecret: string,
	scopes: string[],
	gameId: string,
}

export const permissionList = [...Array(24)].map((_) => {
	const numOfScope = faker.number.int({ min: 3, max: 20 });

	return ({
		id: faker.string.uuid(),
		clientId: faker.string.uuid(),
		clientSecret: faker.string.uuid(),
		scopes: [...Array(numOfScope)].map(() => `${sample([
			'user',
			'gameServer',
			'characterType',
			'character',
			'assetType',
			'asset',
			'characterAsset',
			'activityType',
			'activity',
			'walletCategory',
			'wallet',
			'transaction',
			'payment',
			'level',
			'levelProgress',
			'attributeGroup',
			'characterAttribute',
			'assetAttribute',
		])}:${sample(['read', 'create', 'update', 'delete'])}`),
		gameId: faker.string.uuid(),
	}) as PermissionBody;
});

export const initScopes = () => ({

});
