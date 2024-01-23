import { db } from './db';
import { collection, query, getDocs, orderBy, getDoc, doc, where, limit } from 'firebase/firestore';

export async function getStandings(type='all', id='') {
  const leaguesRef = collection(db, 'leagues')
  const q = query(leaguesRef, where(current === true), limit(1))

  const querySnapshot = await getDocs(q)

  querySnapshot[0]
}