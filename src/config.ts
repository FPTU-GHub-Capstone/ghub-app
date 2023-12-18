export default {
	REST_TIMEOUT: 60000,
	IDP_URL: import.meta.env.VITE_IDP_URL,
	GMS_URL: import.meta.env.VITE_GMS_URL,

	FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
	FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
	FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

	PUSHER_APP_KEY: import.meta.env.VITE_PUSHER_APP_KEY,
	PUSHER_CLUSTER: import.meta.env.VITE_PUSHER_CLUSTER,
	PUSHER_CHANNEL: import.meta.env.VITE_PUSHER_CHANNEL,
	BIND_INSERTED_EVENT: import.meta.env.VITE_PUSHER_BIND_INSERTED_EVENT,
	CLOUDINARY_CLOUDNAME: import.meta.env.VITE_CLOUDINARY_CLOUDNAME,
	CLOUDINARY_UPLOADPRESET: import.meta.env.VITE_CLOUDINARY_UPLOADPRESET,
};
