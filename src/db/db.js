import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import getFirebaseConfig from '../config/firebase';


initializeApp(getFirebaseConfig());
export const db = getFirestore();
export const auth = getAuth();
export const users = collection(db, 'users');