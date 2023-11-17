import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

import { EntityName } from '../common';


export type PermissionBody = {
	id: string,
	clientName: string,
	clientId: string,
	clientSecret: string,
	scopes: string[],
	gameId: string,
}

type Scopes = {
	[key in keyof typeof EntityName]?: [boolean, boolean, boolean, boolean]
}

export const permissionList = [...Array(24)].map((_) => {
	const numOfScope = faker.number.int({ min: 3, max: 20 });

	return ({
		id: faker.string.uuid(),
		clientName: faker.internet.userName(),
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

export const initScopes: Scopes = {
	[EntityName.game]: [false, false, false, false],
	[EntityName.user]:  [false, false, false, false],
	[EntityName.gameServer]: [false, false, false, false],
	[EntityName.characterType]: [false, false, false, false],
	[EntityName.character]: [false, false, false, false],
	[EntityName.assetType]: [false, false, false, false],
	[EntityName.asset]: [false, false, false, false],
	[EntityName.characterAsset]: [false, false, false, false],
	[EntityName.activityType]: [false, false, false, false],
	[EntityName.activity]: [false, false, false, false],
	[EntityName.walletCategory]: [false, false, false, false],
	[EntityName.wallet]: [false, false, false, false],
	[EntityName.transaction]: [false, false, false, false],
	[EntityName.payment]: [false, false, false, false],
	[EntityName.level]: [false, false, false, false],
	[EntityName.levelProgress]: [false, false, false, false],
	[EntityName.attributeGroup]: [false, false, false, false],
	[EntityName.characterAttribute]: [false, false, false, false],
	[EntityName.assetAttribute]: [false, false, false, false],
};
