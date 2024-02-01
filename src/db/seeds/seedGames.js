import { writeBatch, doc } from "firebase/firestore";
import { db } from '../db.js';
import games from './games.json'

export default async function seedGames() {

    // Get a new write batch
    const batch = writeBatch(db);

    
    games.forEach(game => {
        const docRef = doc(db, "leagues/1/games", game.id.toString());
        const final = game.winner !== null;

        const visWins = games.filter(g => (g.id <= game.id && g.winner === game.visitor.team))
        const visLosses = games.filter(g => (g.id <= game.id && g.loser === game.visitor.team))
        const homeWins = games.filter(g => (g.id <= game.id && g.winner === game.home.team))
        const homeLosses = games.filter(g => (g.id <= game.id && g.loser === game.home.team))
    

        console.log(visWins)

        batch.set(docRef, {
          ...game,
          final: final,
          home: {
            ...game.home,
            record: `${homeWins.length} - ${homeLosses.length}`
          },
          visitor: {
            ...game.visitor,
            record: `${visWins.length} - ${visLosses.length}`
          }
        });
    });

    // Commit the batch
    await batch.commit();

    console.log("BATCH COMMITTED");
}
