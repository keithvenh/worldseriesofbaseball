import { firestoreDB } from './db';
import { collection, doc, getDocs, getDoc, orderBy, limit, where, query} from 'firebase/firestore';

export async function fetchRecentGames(num=6) {
  const gamesRef = collection(firestoreDB, 'leagues/1/games');
  let q = query(gamesRef, where('final', '==', true), orderBy('id', 'desc'), limit(num));

  let games = await getDocs(q);

  games = games.docs.map(doc => doc.data());

  return games;
}

export async function fetchUpcomingGames(num=3) {
  const gamesRef = collection(firestoreDB, 'leagues/1/games');
  let q = query(gamesRef, where('final', '!=', true), orderBy('final'),orderBy('id'), limit(num));

  let games = await getDocs(q);

  games = games.docs.map(doc => doc.data());

  return games;
}