import Pusher, { Channel } from 'pusher-js';

import config from '../config';


type HandleEventCallback = (...args: unknown[]) => any

export class PusherService {
	private readonly _pusher: Pusher;
	private _channel: Channel;

	constructor() {
		this._pusher = new Pusher(config.PUSHER_APP_KEY, {
			cluster: config.PUSHER_CLUSTER,
		});
	}

	public static getInstance() {
		return new PusherService();
	}

	public bindEvent(gameId: string, event: string, callback: HandleEventCallback, context?: any): void {
		this._channel = this._pusher.subscribe(`${config.PUSHER_CHANNEL}-${gameId}`);
		this._channel.bind(event, callback, context);
		// this._channel.bind(config.VITE_PUSHER_BIND_INSERTED_EVENT, (data: any) => {
		// 	console.log('start inserted');
		// 	console.log(JSON.stringify(data, undefined, 2));
		// 	console.log('end inserted');
		// });
	}

	public unbindEvent(event: string): void {
		this._channel.unbind(event);
		this._channel.unsubscribe();
	}
}
