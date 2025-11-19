// Template firebaseConfig for the screens/ folder.
// Fill in the firebaseConfig object with your project's credentials.
// This file exports: app, db, auth, storageApp

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// TODO: replace with your Firebase Web config
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  // If already initialized in the bundle, reuse it (helps in RN hot reloads)
  // eslint-disable-next-line no-console
  console.warn('Firebase app init warning:', e.message || e);
}

const db = getFirestore(app);
const auth = getAuth(app);
const storageApp = getStorage(app);

export { app, db, auth, storageApp };
