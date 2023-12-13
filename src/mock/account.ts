import { faker } from '@faker-js/faker';

import { User } from '../common';


export const account: User = {
	id: faker.string.uuid(),
	username: 'dg.panh',
	firstName: 'Panh',
	lastName: 'Dang',
	email: 'dg.panh@gmail.com',
	avatar: '/assets/images/avatar.jpg',
	phone: faker.phone.number(),
	code: faker.string.uuid(),
	status: true,
	balance: 3000,
	role: 'GHub Admin'
};



export const accountAdmin: User = {
	id: faker.string.uuid(),
	username: 'daniel.ng',
	firstName: 'Daniel',
	lastName: 'Nguyen',
	email: 'daniel.ng@gmail.com',
	avatar: '/assets/images/avatars/avatar_15.jpg',
	phone: faker.phone.number(),
	code: faker.string.uuid(),
	status: true,
	balance: 3000,
	role: 'GHub Admin'
};
