import Pusher, { Channel } from 'pusher-js';


const env = import.meta.env;


class PusherService {
	private readonly _pusher: Pusher;
	private readonly _channel: Channel;

	constructor() {
		this._pusher = new Pusher(env.VITE_PUSHER_APP_KEY, {
			cluster: env.VITE_PUSHER_CLUSTER,
		});
		this._channel = this._pusher.subscribe(env.VITE_PUSHER_CHANNEL);
	}

	public bindEvents(): void {
		this._channel.bind(env.VITE_PUSHER_BIND_INSERTED_EVENT, (data: any) => {
			console.log('start inserted');
			console.log(JSON.stringify(data, undefined, 2));
			console.log('end inserted');
		});
		this._channel.bind(env.VITE_PUSHER_BIND_DELETED_EVENT, (data: any) => {
			console.log('start deleted');
			console.log(data);
			console.log('end deleted');
		});
	}
}

export default new PusherService();
