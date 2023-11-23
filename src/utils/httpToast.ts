import { toast, ToastOptions } from 'react-toastify';
import { head } from 'lodash';

import { httpStatusMsg } from '../common';


const config: ToastOptions = {
	position: 'bottom-right',
	autoClose: 2000,
	hideProgressBar: false,
	closeOnClick: true,
	draggable: true,
	progress: undefined,
};

export type HttpToastConfig = {
	id?: string,
	loading: {
		show?: boolean,
		message?: string,
	},
	success: {
		show?: boolean,
		message?: string,
	},
	error: {
		show?: boolean,
		message?: string,
	},
}
export type HttpToastConfigPartial = Partial<HttpToastConfig>

export const defaultHttpToastConfig: HttpToastConfig = {
	loading: {
		show: false,
	},
	success: {
		show: false,
	},
	error: {
		show: true,
	},
};

export const HttpToast = {
	loading: (message: string): string => {
		return toast.loading(message, config).toString();
	},
	success: (id: string, message: string) => {
		if (!id) return toast.success(message, config);
		setTimeout(
			() =>
				toast.update(id, {
					render: message,
					type: 'success',
					isLoading: false,
					autoClose: 1500,
				}),
			1500
		);
	},
	error: (id: string, status: number) => {

		if (!id) return toast.error(httpStatusMsg[status], config);
		setTimeout(
			() =>
				toast.update(id, {
					render: httpStatusMsg[status],
					type: 'error',
					isLoading: false,
					autoClose: 1500,
				}),
			1500
		);
	},
};
