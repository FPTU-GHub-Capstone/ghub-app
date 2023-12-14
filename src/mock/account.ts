import { faker } from '@faker-js/faker';

import { User } from '../common';


export const account = {
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
	role: 'Game Manager'
};
