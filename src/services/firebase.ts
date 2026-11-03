import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Read from environment variables or custom local storage settings
export const getStoredFirebaseConfig = (): FirebaseConfig | null => {
  const envConfig: FirebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  };

  if (envConfig.apiKey && envConfig.projectId) {
    return envConfig;
  }

  const custom = localStorage.getItem('mgd_custom_firebase_config');
  if (custom) {
    try {
      const parsed = JSON.parse(custom);
      if (parsed.apiKey && parsed.projectId) return parsed;
    } catch {
      // ignore
    }
  }

  return null;
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

const config = getStoredFirebaseConfig();

if (config) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(config);
    auth = getAuth(app);
    db = getFirestore(app);
    console.log('Firebase initialized successfully with project:', config.projectId);
  } catch (err) {
    console.warn('Firebase initialization error, fallback to offline local mode:', err);
  }
} else {
  console.log('No Firebase config provided. Running in high-performance local demo mode with instant persistence.');
}

export const isFirebaseConfigured = (): boolean => !!(auth && db);
export { auth, db, app };
