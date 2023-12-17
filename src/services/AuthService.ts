
import {
	ACCESS_TOKEN,
	ExchangeToken,
	HttpStatusCode,
	User,
} from '../common';
import { store } from '../redux/store';
import { setCurrentUser } from '../redux/slices/authSlide';
import config from '../config';

import { RestService } from './RestService';



export const getProfile = async () => {
	const { data, status } = await RestService.getInstance().get<User>(
		`${config.IDP_URL}/profile`,
	);

	if (status != HttpStatusCode.SUCCESS) return;
	store.dispatch(setCurrentUser(data));
};

export const exchangeToken = async () => {
	const { data, status } = await RestService.getInstance().post<ExchangeToken>(
		`${config.IDP_URL}/oauth/token/exchange`,
	);

	if (status == HttpStatusCode.CREATED)
		localStorage.setItem(ACCESS_TOKEN, data.access_token);
};
