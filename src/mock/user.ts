import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

import { User } from '../common';


const users = [...Array(24)].map((_, index) => ({
	id: faker.string.uuid(),
	avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
	name: faker.person.fullName(),
	company: faker.company.name(),
	isVerified: faker.datatype.boolean(),
	status: sample(['active', 'banned']),
	role: sample([
		'Player',
		'Game Manager',
	]),
}));
  
export default users;
