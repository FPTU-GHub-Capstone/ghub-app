import { FirebaseOptions, initializeApp } from 'firebase/app';
import {
	Auth,
	AuthProvider,
	FacebookAuthProvider,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth';

import config from '../config';

import { throwFirebaseError } from './throwFirebaseErrorDecorator';


const firebaseConfig = Object.freeze<FirebaseOptions>({
	apiKey: config.FIREBASE_API_KEY,
	appId: config.FIREBASE_APP_ID,
	projectId: config.FIREBASE_PROJECT_ID,
	authDomain: config.FIREBASE_AUTH_DOMAIN,
});


class FirebaseService {
	private readonly _auth: Auth;

	constructor() {
		const app = initializeApp(firebaseConfig);
		this._auth = getAuth(app);
		this._auth.useDeviceLanguage(); // Apply the default browser preference instead of explicitly setting it.
	}	

	@throwFirebaseError()
	public async signUpWithEmailAndPassword(email: string, password: string): Promise<string> {
		const { user } = await createUserWithEmailAndPassword(this._auth, email, password);
		return await user.getIdToken();
	}

	@throwFirebaseError()
	public async signInWithEmailAndPassword(email: string, password: string): Promise<string> {
		const { user } = await signInWithEmailAndPassword(this._auth, email, password);
		return await user.getIdToken();
	}

	@throwFirebaseError()
	public async signInWithGoogle(): Promise<string> {
		return await this._signInWithProvider(new GoogleAuthProvider());

	}

	@throwFirebaseError()
	public async signInWithFacebook(): Promise<string> {
		return await this._signInWithProvider( new FacebookAuthProvider());
	}

	private async _signInWithProvider(provider: AuthProvider): Promise<string> {
		const { user } = await signInWithPopup(this._auth, provider);
		return user.getIdToken();
	}

	@throwFirebaseError()
	public async signOut() {
		await signOut(this._auth);
	}
}

export default new FirebaseService();
