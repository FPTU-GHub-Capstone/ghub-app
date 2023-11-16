export enum RequestHeaders {
	AUTHORIZATION = 'Authorization',
	CONTENT_TYPE = 'Content-Type',
	CORRELATION_ID = 'x-correlationid',
}

export const ACCESS_TOKEN = 'access_token';

export const enum EntityName {
	game = 'game',
	user = 'user',
	gameServer = 'gameServer',
	characterType = 'characterType',
	character = 'character',
	assetType = 'assetType',
	asset = 'asset',
	characterAsset = 'characterAsset',
	activityType = 'activityType',
	activity = 'activity',
	walletCategory = 'walletCategory',
	wallet = 'wallet',
	transaction = 'transaction',
	payment = 'payment',
	level = 'level',
	levelProgress = 'levelProgress',
	attributeGroup = 'attributeGroup',
	characterAttribute = 'characterAttribute',
	assetAttribute = 'assetAttribute',
}

export const convertEntityNameToLabel = (entityName: string) => {
	const entityLabel = {
		[EntityName.game]: 'Game',
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
