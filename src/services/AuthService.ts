
import {
	ACCESS_TOKEN,
	ExchangeToken,
	HttpStatusCode,
	RequestHeaders,
	User,
} from '../common';
import { store } from '../redux/store';
import { setCurrentUser } from '../redux/slices/authSlide';
import config from '../config';

import { RestService } from './RestService';


const restSvc = RestService.getInstance();

export const getProfile = async () => {
	const { data, status } = await restSvc.get<User>(
		`${config.IDP_URL}/profile`,
	);

	if (status != HttpStatusCode.SUCCESS) return;
	store.dispatch(setCurrentUser(data));
};

export const exchangeToken = async () => {
	const { data, status } = await restSvc.post<ExchangeToken>(
		`${config.IDP_URL}/oauth/token/exchange`,
	);

	if (status == HttpStatusCode.CREATED)
		localStorage.setItem(ACCESS_TOKEN, data.access_token);
};
