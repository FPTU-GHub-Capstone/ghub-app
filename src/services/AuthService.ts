/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from 'react-router-dom';

import { ACCESS_TOKEN, ExchangeToken, HttpStatusCode, RequestHeaders, User } from '../common';
import { store } from '../redux/store';
import { setCurrentUser } from '../redux/slices/authSlide';
import config from '../config';
import { APPLICATION_ROUTES, PageNames } from '../routes';

import RestService from './RestService';


const token = localStorage.getItem(ACCESS_TOKEN);

export const getProfile = async () => {
	const { data, status } = await RestService.get<User>(
		`${config.IDP_URL}/profile`,
		null,
		{
			headers: {
				[RequestHeaders.AUTHORIZATION]: `Bearer ${token}`
			},
		},
	);

	if (status != HttpStatusCode.SUCCESS) return;
	store.dispatch(setCurrentUser(data));
};

export const exchangeToken = async () => {
	const { data, status } = await RestService.post<ExchangeToken>(
		`${config.IDP_URL}/oauth/token/exchange`,
		undefined,
		{
			headers: {
				[RequestHeaders.AUTHORIZATION]: `Bearer ${token}`
			},
		},
	);

	if(status == HttpStatusCode.CREATED) localStorage.setItem(ACCESS_TOKEN, data.access_token);
};
