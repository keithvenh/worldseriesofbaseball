import { updateDoc, doc } from "firebase/firestore";
import { db } from '../../../db/db';

export default async function updateRecords(teams) {
    for(let i = 0; i < teams.length; i++) {
        updateDoc(doc(db, 'leagues/1/teams', teams[i].id), {
            ...teams[i],
            wins: teams[i].wins,
            losses: teams[i].losses,
            winPct: teams[i].winPct
        })
    }
}