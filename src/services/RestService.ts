import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { v4 as uuidv4 } from 'uuid';


export type AxiosInitOptions = {
	header?: Record<string, string>,
	options?: AxiosRequestConfig,
};

const AUTHORIZATION     = 'Authorization';
const CONTENT_TYPE      = 'Content-Type';
const CORRELATION_ID    = 'x-correlationid';
const CONTENT_TYPE_JSON = 'application/json';

class RestService {
	private readonly _axiosInstance: AxiosInstance;

	constructor() {
		this._axiosInstance = this._initializeAxios({});
	}

	private _initializeAxios(initOptions: AxiosInitOptions): AxiosInstance {
		const { header, options } = initOptions;
		const axiosInstance = axios.create({
			timeout: 60000,
			headers: this._prepareHeader(header),
			withCredentials: true,
			...options,
		});
		return axiosInstance;
	}

	private _prepareHeader(
		additionalHeaders?: Record<string, string>
	): Record<string, string> {
		const header: Record<string, string> = {};
		header[CONTENT_TYPE] = CONTENT_TYPE_JSON;
		header[CORRELATION_ID] = uuidv4();
		return { ...header, ...additionalHeaders };
	}

	private _createAuthInterceptor(token: string) {
		return (request: InternalAxiosRequestConfig) => {
			request.headers = request.headers ?? {};
			request.headers[AUTHORIZATION] = `Bearer ${token}`;
			return request;
		};
	}

	public setAuthorizationHeader(token: string) {
		this._axiosInstance.interceptors.request.use(this._createAuthInterceptor(token));
	}

	public async get<TQuery = object>(
		url: string,
		payload?: TQuery,
		options?: AxiosRequestConfig
	): Promise<AxiosResponse> {
		return this._axiosInstance.get(url, {
			params: payload,
			...options,
		});
	}

	public async post<TBody = object>(
		url: string,
		payload?: TBody,
		options?: AxiosRequestConfig
	): Promise<AxiosResponse> {
		return this._axiosInstance.post(url, payload, options);
	}

	public async put<TBody = object>(
		url: string,
		payload?: TBody,
		options?: AxiosRequestConfig
	): Promise<AxiosResponse> {
		return this._axiosInstance.put(url, payload, options);
	}

	public async delete<TQuery = object>(
		url: string,
		payload?: TQuery,
		options?: AxiosRequestConfig
	): Promise<AxiosResponse> {
		return this._axiosInstance.delete(url, {
			params: payload,
			...options,
		});
	}
}

export default new RestService();
