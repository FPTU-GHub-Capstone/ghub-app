export type User = {
	id: string,
	username: string,
	firstName: string,
	lastName: string,
	avatar: string,
	email: string,
	phone: string,
	code: string,
	status: number,
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

export type HttpResponse = {
	message: string,
	isError: boolean,
	result: Array<any> | any,
}
