import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

export class FirebaseApp {
	private static instance: FirebaseApp;
	private firebase: admin.app.App;
	private firestore: admin.firestore.Firestore;

	private constructor() {
		this.firebase = admin.initializeApp({
			credential: admin.credential.applicationDefault(),
			databaseURL: `https://eficientis-default-rtdb.firebaseio.com/`,
		});

		this.firestore = this.firebase.firestore();
		this.firestore.settings({ ignoreUndefinedProperties: true });

		fireorm.initialize(this.firestore);
	}

	public static getInstance(): FirebaseApp {
		if (!FirebaseApp.instance) {
			FirebaseApp.instance = new FirebaseApp();
		}
		return FirebaseApp.instance;
	}

	public getFirestore(): admin.firestore.Firestore {
		return this.firestore;
	}
}
