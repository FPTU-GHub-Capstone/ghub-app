import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date: Date, newFormat?: string) {
	const fm = newFormat || 'dd MMM yyyy';

	return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: Date, newFormat?: string) {
	const fm = newFormat || 'dd MMM yyyy p';

	return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: Date) {
	return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: Date) {
	return date
		? formatDistanceToNow(new Date(date), {
			addSuffix: true,
		})
		: '';
}

export 	function formatDateToCustomString(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so we add 1 and pad with 0
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}
