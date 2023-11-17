function generateAlphaNumericId(length: number): string {
	let text = '';
	const possible =
		'ABCDEFGHIkLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

function dec2hex(dec) {
	return dec.toString(16).padStart(2, '0');
}

// generateId :: Integer -> String
function generateId(len) {
	const arr = new Uint8Array((len || 40) / 2);
	window.crypto.getRandomValues(arr);
	return Array.from(arr, dec2hex).join('');
}

export const generateClientId = () => {
	let clientId = '';
	for (let i = 0; i < 4; i++) {
		clientId = clientId + generateAlphaNumericId(6) + (i == 3 ? '' : '-');
	}
	return clientId.toUpperCase();
};

export const generateClientSecret = () => {
	return generateId(28);
};
