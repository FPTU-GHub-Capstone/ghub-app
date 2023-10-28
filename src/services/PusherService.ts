import Pusher, { Channel } from 'pusher-js';

import config from '../config';


type HandleEventCallback = (...args: unknown[]) => any

class PusherService {
	private readonly _pusher: Pusher;
	private readonly _channel: Channel;

	constructor() {
		this._pusher = new Pusher(config.PUSHER_APP_KEY, {
			cluster: config.PUSHER_CLUSTER,
		});
		this._channel = this._pusher.subscribe(config.PUSHER_CHANNEL);
	}

	public bindEvent(event: string, callback: HandleEventCallback, context?: any): void {
		this._channel.bind(event, callback, context);
		// this._channel.bind(config.VITE_PUSHER_BIND_INSERTED_EVENT, (data: any) => {
		// 	console.log('start inserted');
		// 	console.log(JSON.stringify(data, undefined, 2));
		// 	console.log('end inserted');
		// });
	}

	public unbindEvent(event: string): void {
		this._channel.unbind(event);
	}
}

export default new PusherService();
