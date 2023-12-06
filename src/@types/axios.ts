/* eslint-disable @typescript-eslint/naming-convention */
import { HttpToastConfigPartial } from '../utils/httpToast';


export {};
declare module 'axios' {
	export interface CreateAxiosDefaults {
		toast?: HttpToastConfigPartial;
	}

	export interface InternalAxiosRequestConfig {
		toast?: HttpToastConfigPartial;
	}
}
