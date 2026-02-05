import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
// You can either use environment variables or a service account key file

let app;

if (!admin.apps.length) {
  // Option 1: Using environment variables
  if (process.env.FIREBASE_PROJECT_ID) {
    app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }
  // Option 2: Using application default credentials (for local development with gcloud)
  else {
    app = admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }
}

export const auth = admin.auth();
export const firestore = admin.firestore();
export default admin;
