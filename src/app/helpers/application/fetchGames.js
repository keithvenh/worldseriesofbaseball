
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../../db/db';

export default async function fetchGames(teams, result='all') {

    teams = teams.map(t => t.id)
    let gamesRef = collection (db, "leagues/1/games");
    let q = query(gamesRef)
    
    if(result === 'complete') {
        q = query(gamesRef, where('final', '==', true))
    }

    let games = await getDocs(q);
    games = games.docs.map(doc => doc.data())
    if (result === 'incomplete') {
        games = games.filter(g => !g.final)
    }
    games = games.filter(g => (teams.includes(g.visitor) || teams.includes(g.home)))

    return games;
}