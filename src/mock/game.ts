import { faker } from '@faker-js/faker';

import { Game } from '../common';


const GAME_TITLES = [
	'Super Robot Wars OG Saga: Masō Kishin II – Revelation of Evil God',
	'Digimon Survive',
	'Dragon Ball: The Breakers',
	'Fast & Furious Crossroads',
	'Sword Art Online: Alicization Lycoris',
	'Captain Tsubasa: Rise of New Champions',
	'Tales of Arise',
	'My Hero Academia: One’s Justice 2',
	'40 Free Serif Fonts for Digital Designers',
	'Ace Combat 7: Skies Unknown',
	'Doraemon Story of Seasons',
	'Rad',
	'Naruto to Boruto: Shinobi Striker',
	'Black Clover: Project Knights',
	'Nari Kids Park: HUGtto! PreCure',
	'Nari Kids Park: Kaitou Sentai Lupinranger VS Keisatsu Sentai Patoranger',
	'11-11: Memories Retold',
	'Impact Winter',
	'Little Nightmares',
	'Accel World vs. Sword Art Online: Millennium Twilight',
	'My Hero Academia',
	'Gintama no Sugoroku',
	'Sword Art Online: Infinity Moment',
	'Super Robot Wars OG Infinite Battle',
];

const games = [...Array(23)].map((_, index) => ({
	id: faker.string.uuid(),
	link: `/assets/images/covers/cover_${index + 1}.jpg`,
	name: GAME_TITLES[index],
	createdAt: faker.date.past(),
	view: faker.number.int({ min: 0, max: 100000000 }),
	comment: faker.number.int({ min: 0, max: 100000 }),
	share: faker.number.int({ min: 0, max: 100000 }),
	favorite: faker.number.int({ min: 0, max: 100000000 }),
	logo: `/assets/images/avatars/avatar_${index + 1}.jpg`,
}) as Game);

export default games;
