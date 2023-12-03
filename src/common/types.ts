export type User = {
	id: string,
	username: string,
	firstName: string,
	lastName: string,
	avatar: string,
	email: string,
	phone: string,
	code: string,
	status: boolean,
	balance: number,
	role: string,
}

export type Game = {
	id: string,
	name: string,
	logo: string,
	link: string,
	[other: string | number]: unknown,
};

export type NavItem = {
	title: string,
	path: string,
	icon: JSX.Element,
	info?: string,
}

export type GameServer = {
	id: string,
	name: string,
	location: string,
	artifactUrl: string,
	gameId: string,
	createdAt: string,
	modifiedAt: string,
	deletedAt: string | null,
};

export type Asset = {
	name: string,
	image: string,
	description: string,
	assetTypeId: string,
	id: string,
	createdAt: string,
	modifiedAt: string,
	deletedAt: string | null,
};

export type AssetType = {
	name: string,
	gameId: string,
	id: string,
	createdAt: string,
	modifiedAt: string,
	deletedAt: string | null,
};

export type Level = {
	id: string,
	description: string,
	levelNo: number,
	levelUpPoint: number,
	gameId: string,
	game: Game,
	[other: string | number]: unknown,
};
export type HttpResponse = {
	message: string,
	isError: boolean,
	result: Array<any> | any,
}

export type Client = {
	name: string,
	gameId: string,
	clientId: string,
	clientSecret: string,
	scope: string[] | string,
	[x: string | number | symbol]: any,
}

export type FailureResponse = {
	message: string,
	responseException: Record<string, string>,
}

export type PricingPlan = {
	image?: string,
	name: string,
	description: string,
	price: number,
	numOfRecords: number,
}
