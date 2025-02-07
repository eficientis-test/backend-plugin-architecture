import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';
// import path from "path"

export class FirebaseApp {
	private static instance: FirebaseApp;
	private firebase: admin.app.App;
	private firestore: admin.firestore.Firestore;

	private constructor() {
		// const serviceAccount = path.join(__dirname, '../config/eficientis-firebase-adminsdk.json');

		this.firebase = admin.initializeApp({
			credential: admin.credential.applicationDefault(),

			// credential: admin.credential.cert(require(serviceAccount)),
			databaseURL: `https://microkernel-project.firebaseio.com/`,
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
