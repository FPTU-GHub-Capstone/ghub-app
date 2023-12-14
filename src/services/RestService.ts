import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig , CreateAxiosDefaults, AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ToastOptions } from 'react-toastify';

import appConfig from '../config';
import { ACCESS_TOKEN, HttpStatusCode, RequestHeaders } from '../common';
import { HttpToast, defaultHttpToastConfig } from '../utils/httpToast';


export type AxiosInitOptions = {
	header?: Record<string, string>,
	options?: AxiosRequestConfig,
};

const CONTENT_TYPE_JSON = 'application/json';

const toastConfig: ToastOptions = {
	position: 'bottom-left',
	autoClose: 2000,
	hideProgressBar: false,
	closeOnClick: true,
	draggable: true,
	progress: undefined,
};

export class RestService {
	private readonly _axiosInstance: AxiosInstance;
	private _requestAuthInterceptorId: number;

	constructor() {
		this._axiosInstance = this._initializeAxios();
		this.useAuthInterceptor();
	}

	public static getInstance() {
		return new RestService();
	}

	private _initializeAxios(initOptions: AxiosInitOptions = {}): AxiosInstance {
		const { header, options } = initOptions;
		const axiosInstance = axios.create({
			timeout: appConfig.REST_TIMEOUT,
			headers: this._prepareHeader(header),
			toast: {
				...defaultHttpToastConfig,
			},
			...options,
		});
		axiosInstance.interceptors.response.use(
			this._createResponseInterceptor(),
			this._createHandleErrorResponseInterceptor()
		);
		return axiosInstance;
	}

	private _prepareHeader(
		additionalHeaders?: Record<string, string>
	): Record<string, string> {
		const headers: Record<string, string> = {
			[RequestHeaders.CONTENT_TYPE]: CONTENT_TYPE_JSON,
		};
		return { ...headers, ...additionalHeaders };
	}

	private _createResponseInterceptor() {
		return (response: AxiosResponse) => {
			const { config } = response;
			const { toast } = config;
			const isShow = toast?.success?.isShow;
			const message = toast?.success?.message;
			if (isShow)
				HttpToast.success(
					config?.toast?.id ?? '',
					message ?? 'Successfully'
				);
				
			return response;
		};
	}

	private _createHandleErrorResponseInterceptor() {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		return (error: AxiosError) => {
			const { status, config } = error.response;
			if(status == HttpStatusCode.UNAUTHORIZED) {
				localStorage.removeItem(ACCESS_TOKEN);
				window.location.href = '/login';
			}
			const { toast } = config;
			const isShow = toast?.error?.isShow;
			if (!isShow) return;
		
			const id = config?.toast?.id ?? '';
			HttpToast.error(id, status);

			return Promise.reject(error);
		};
	}

	private async _createAuthInterceptor(
		request: InternalAxiosRequestConfig
	): Promise<InternalAxiosRequestConfig> {
		const accessToken = await this._getToken();
		request.headers = request.headers ?? <AxiosRequestHeaders>{};
		request.headers[RequestHeaders.CORRELATION_ID] = uuidv4();
		request.headers[RequestHeaders.AUTHORIZATION] = `Bearer ${accessToken}`;
		return request;
	}

	private async _getToken(): Promise<string> {
		const accessToken = localStorage.getItem(ACCESS_TOKEN);
		if (!accessToken) {
			// if (! accessToken or token expired) implement call idp to get token
		}
		return accessToken;
	}

	public useAuthInterceptor() {
		this._requestAuthInterceptorId =
			this._axiosInstance.interceptors.request.use(this._createAuthInterceptor.bind(this));
	}

	public ejectAuthInterceptor() {
		this._axiosInstance.interceptors.request.eject(this._requestAuthInterceptorId);
	}

	public async get<
		TDownstreamResponse = any,
		TReturn = AxiosResponse<TDownstreamResponse>,
		TQuery = any,
	>(
		url: string,
		payload?: TQuery,
		options?: AxiosRequestConfig<TQuery>,
	): Promise<TReturn> {
		return this._axiosInstance.get(url, {
			params: payload,
			...options,
		});
	}

	public async post<
		TDownstreamResponse = any,
		TReturn = AxiosResponse<TDownstreamResponse>,
		TBody = any,
	>(
		url: string,
		payload?: TBody,
		options?: AxiosRequestConfig<TBody>,
	): Promise<TReturn> {
		return this._axiosInstance.post(url, payload, options);
	}

	public async put<
		TDownstreamResponse = any,
		TReturn = AxiosResponse<TDownstreamResponse>,
		TBody = any
	>(
		url: string,
		payload?: TBody,
		options?: AxiosRequestConfig<TBody>
	): Promise<TReturn> {
		return this._axiosInstance.put(url, payload, options);
	}

	public async delete<
		TDownstreamResponse = any,
		TReturn = AxiosResponse<TDownstreamResponse>,
		TQuery = any,
	>(
		url: string,
		payload?: TQuery,
		options?: AxiosRequestConfig
	): Promise<TReturn> {
		return this._axiosInstance.delete(url, {
			params: payload,
			...options,
		});
	}
}

