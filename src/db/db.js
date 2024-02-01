import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import getFirebaseConfig from '../config/firebase';

// ===== EXPORT FIREBASE DB ===== //
initializeApp(getFirebaseConfig());
export const firestoreDB = getFirestore();

export const auth = getAuth();
export const users = collection(firestoreDB, 'users');
export const seasonsRef = collection(firestoreDB, 'seasons');
export const conferencesRef = collection(firestoreDB, 'conferences');
export const divisionsRef = collection(firestoreDB, 'divisions');
export const teamsRef = collection(firestoreDB, 'teams');
export const leaguesRef = collection(firestoreDB, 'leagues');