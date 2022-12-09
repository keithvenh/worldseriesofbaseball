import { collection, query, getDocs, where } from 'firebase/firestore';

import { db } from '../../../db/db';

export default async function fetchPlayers(playerType) {

    let playersRef = collection(db, "players");

    const q = query(playersRef);

    const querySnapshot = await getDocs(q);

    let players = querySnapshot.docs.map((doc) => {
        return doc.data();
    })

    return players;
        
}