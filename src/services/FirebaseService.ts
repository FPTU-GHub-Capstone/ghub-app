import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import {
	Auth,
	FacebookAuthProvider,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth';

import { throwFirebaseError } from './throwFirebaseErrorDecorator';


const firebaseConfig = Object.freeze<FirebaseOptions>({
	apiKey: process.env.FIREBASE_API_KEY,
	appId: process.env.FIREBASE_APP_ID,
	projectId: process.env.FIREBASE_PROJECT_ID,
	authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
});


class FirebaseService {
	private readonly _app: FirebaseApp;
	private readonly _auth: Auth;

	constructor() {
		this._app = initializeApp(firebaseConfig);
		this._auth = getAuth(this._app);
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
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(this._auth, provider);
		const credential = GoogleAuthProvider.credentialFromResult(result);
		return credential!.accessToken as string;
	}

	@throwFirebaseError()
	public async signInWithFacebook(): Promise<string> {
		const provider = new FacebookAuthProvider();
		const result = await signInWithPopup(this._auth, provider);
		const credential = FacebookAuthProvider.credentialFromResult(result);
		return credential!.accessToken as string;
	}

	public async signOut() {
		await signOut(this._auth);
	}
}

export default new FirebaseService();
