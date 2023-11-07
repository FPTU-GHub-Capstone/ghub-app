import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

import { EntityName } from '../common';


export type PermissionBody = {
	id: string,
	email: string,
	avatarUrl: string,
	scopes: Record<string, Array<string>>,
}

const permissionList = [...Array(24)].map((_) => {
	const numOfCharacter = faker.number.int({min: 3, max: 10});
	const entity1 = sample([EntityName.ACTIVITY, EntityName.ASSET, EntityName.CHARACTER, EntityName.GAME_SERVER, EntityName.WALLET]);
	const entity2 = sample([EntityName.ACTIVITY, EntityName.ASSET, EntityName.CHARACTER, EntityName.GAME_SERVER, EntityName.WALLET]);

	return ({
		id: faker.string.uuid(),
		email: faker.internet.email(),
		avatarUrl: `/assets/images/avatars/avatar_${faker.number.int({min: 1, max: 24})}.jpg`,
		scopes: {
			[EntityName.GAME]: [
				`${EntityName.GAME}:${faker.string.uuid()}:get`,
			],
			[entity1]: [...Array(numOfCharacter)].map(() =>
				`${entity1}:${faker.string.uuid()}:${sample(['get', 'create', 'update', 'delete'])}`,
			),
			[entity2]: [...Array(numOfCharacter)].map(() =>
				`${entity2}:${faker.string.uuid()}:${sample(['get', 'create', 'update', 'delete'])}`,
			),
		}
	}) as PermissionBody;
});

export default permissionList;
