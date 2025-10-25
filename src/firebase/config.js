import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Configuration Firebase - Vos vraies clés
const firebaseConfig = {
  apiKey: "AIzaSyCz5q19PWYdMy-v5HAG7VGiPyfLTbMvLro",
  authDomain: "contracteasy-mvp.firebaseapp.com",
  projectId: "contracteasy-mvp",
  storageBucket: "contracteasy-mvp.firebasestorage.app",
  messagingSenderId: "33232439351",
  appId: "1:33232439351:web:307c37b338e67c6a5257b2",
  measurementId: "G-GPD2PDV9QY"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Services Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
