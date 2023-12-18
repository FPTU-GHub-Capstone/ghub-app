
import { BaseProperty, CharacterType, FailureResponseGMS, HttpResponseGMS } from '../common';
import config from '../config';
import { PropertyType } from '../pages/CharacterType/type';

import { RestService } from './RestService';



const propertyType = ['Text', 'Number', 'Array', 'Object'];
const convertType = (type: string, value: string) => {
	switch(type) {
		case propertyType[0]:
			return value;
		case propertyType[1]:
			return Number(value);
		case propertyType[2]:
			return value.split(',');
		case propertyType[3]:
			return JSON.parse(value);
		default:
			return value;
	}
};

export const convertArrayToObject = (array: PropertyType[]) => {
	const result: BaseProperty = {};
	array.map((item) => {
		if(item.name != '' && item.value != '') 
			result[item.name] = convertType(item.type, item.value);
	});

	return result;
};

export const createCharacterType = async (gameId: string, requestBody: CharacterType) => {
	const response = await RestService.getInstance().post<HttpResponseGMS<CharacterType> | FailureResponseGMS>(
		config.GMS_URL + `/games/${gameId}/character-types`,
		requestBody
	);
	console.log(`@statusCode:createCharacterTypeAPI:: ${response.data}`);
	return response;
};

export const deleteCharacterType = async (gameId: string, characterTypeId: string) => {
	const response = await RestService.getInstance().delete(
		config.GMS_URL + `/games/${gameId}/character-types/${characterTypeId}`
	);
	console.log(`@statusCode:deleteCharacterTypeAPI:: ${JSON.stringify(response.data)}`);
	return response;
};
