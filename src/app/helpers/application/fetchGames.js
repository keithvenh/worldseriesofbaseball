
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../../db/db';

export default async function fetchGames(teams, result='all') {
    console.log(teams);
    console.log("Fetching Games...")

    teams = teams.map(t => t.id)
    result = result == 'all' ? [true, false] : result == 'complete' ? [true] : [false]

    let gamesRef = collection (db, "leagues/1/games");
    const q = query(gamesRef, where('final', 'in', result))
    let games = await getDocs(q);
    games = games.docs.map(doc => doc.data())
    games = games.filter(g => (teams.includes(g.visitor) || teams.includes(g.home)))

    return games;
}