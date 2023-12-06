import { toast, ToastOptions } from 'react-toastify';

import { FailureResponse, httpStatusMsg } from '../common';


const config: ToastOptions = {
	position: 'bottom-left',
	autoClose: 2000,
	hideProgressBar: false,
	closeOnClick: true,
	draggable: true,
	progress: undefined,
};

export type HttpToastConfig = {
	id?: string,
	loading: {
		isShow?: boolean,
		message?: string,
	},
	success: {
		isShow?: boolean,
		message?: string,
	},
	error: {
		isShow?: boolean,
		message?: string,
	},
}
export type HttpToastConfigPartial = Partial<HttpToastConfig>

export const defaultHttpToastConfig: HttpToastConfig = {
	loading: {
		isShow: false,
	},
	success: {
		isShow: false,
	},
	error: {
		isShow: true,
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
