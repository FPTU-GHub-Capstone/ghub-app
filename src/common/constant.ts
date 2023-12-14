export enum RequestHeaders {
	AUTHORIZATION = 'Authorization',
	CONTENT_TYPE = 'Content-Type',
	CORRELATION_ID = 'x-correlationid',
}

export const ACCESS_TOKEN = 'access_token';
export const GAME_ID = 'gameId';

export const enum EntityName {
	game = 'games',
	user = 'users',
	gameServer = 'gameservers',
	characterType = 'charactertypes',
	character = 'characters',
	assetType = 'assettypes',
	asset = 'assets',
	characterAsset = 'characterassets',
	activityType = 'activitytypes',
	activity = 'activities',
	walletCategory = 'walletcategories',
	wallet = 'wallets',
	transaction = 'transactions',
	payment = 'payments',
	level = 'levels',
	levelProgress = 'levelprogresses',
	attributeGroup = 'attributegroups',
	characterAttribute = 'characterattributes',
	assetAttribute = 'assetattributes',
}

export const convertEntityNameToLabel = (entityName: string) => {
	const entityLabel = {
		[EntityName.user]:  'User',
		[EntityName.gameServer]: 'Game Server',
		[EntityName.characterType]: 'Character Type',
		[EntityName.character]: 'Character',
		[EntityName.assetType]: 'Asset Type',
		[EntityName.asset]: 'Asset',
		[EntityName.characterAsset]: 'Character Asset',
		[EntityName.activityType]: 'Activity Type',
		[EntityName.activity]: 'Activity',
		[EntityName.walletCategory]: 'Wallet Category',
		[EntityName.wallet]: 'Wallet',
		[EntityName.transaction]: 'Transaction',
		[EntityName.payment]: 'Payment',
		[EntityName.level]: 'Level',
		[EntityName.levelProgress]: 'Level Progress',
		[EntityName.attributeGroup]: 'Attribute Group',
		[EntityName.characterAttribute]: 'Character Attribute',
		[EntityName.assetAttribute]: 'Asset Attribute',
	};

	return entityLabel[entityName];
};

export const enum HttpStatusCode {
	SUCCESS = 200,
	CREATED = 201,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	SERVER_ERROR = 500,
}

export const httpStatusMsg = {
	[HttpStatusCode.SUCCESS]: 'The request succeeded.',
	[HttpStatusCode.CREATED]: 'New resource is created.',
	[HttpStatusCode.NO_CONTENT]: 'Deleted successfully.',
	[HttpStatusCode.BAD_REQUEST]: 'Bad request.',
	[HttpStatusCode.UNAUTHORIZED]: 'Unauthorized! Please log in.',
	[HttpStatusCode.FORBIDDEN]: 'Forbidden! You do not have permission.',
	[HttpStatusCode.NOT_FOUND]: 'Resource not found!',
	[HttpStatusCode.SERVER_ERROR]: 'Internal server error!',
};
