import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection, doc, onSnapshot, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import getFirebaseConfig from '../../config/firebase';


initializeApp(getFirebaseConfig());
export const db = getFirestore();
export const auth = getAuth();