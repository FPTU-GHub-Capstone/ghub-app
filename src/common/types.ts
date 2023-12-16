export type Player = {
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
	logo?: string,
	link?: string,
	banner?: string,
	createdAt: string,
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

export type Activity = {
	name: string,
	status: number,
	activityTypeId: string,
	transactionId: string,
	characterId: string,
	id: string,
	createdAt: string,
	modifiedAt: string,
	deletedAt: string | null,
};

export type ActivityType = {
	name: string,
	gameId: string,
	game: any, 
	characterId: string,
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
export type HttpResponseGMS<T> = {
	message: string,
	isError: boolean,
	result: Array<T> | T,
}

export type Client = {
	name: string,
	gameId: string,
	clientId: string,
	clientSecret: string,
	scope: string[] | string,
	[x: string | number | symbol]: any,
}

export type FailureResponseGMS = {
	message: string,
	isError: string,
	responseException: Record<string, string>,
}

export type PricingPlan = {
	image?: string,
	name: string,
	description: string,
	price: number,
	numOfRecords: number,
}

export type User = {
	_id: string,
	email: string,
	picture: string,
	uid: string,
	scope: string,
	name?: string,
	username?: string,
	status?: boolean,
	[x: string | number | symbol]: any,
}

export type ExchangeToken = {
	access_token: string,
	token_type: string,
	expires_in: number,
	scope: string,
}

export type UserTokenPayload = {
	auth_time: number,
	iat: number,
	uid: string,
	scp: string[],
}

export type GameBill = {
	_id: string,
	gameId: string,
	writeUnits: number,
	readUnits: number,
	time: string,
	status: string,
	__v: number,
}
