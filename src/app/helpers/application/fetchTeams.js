import { collection, query, getDocs, where } from 'firebase/firestore';

import { db } from '../../../db/db';

export default async function fetchTeams(divisions) {

    let divisionList;
    switch(divisions) {
        case 'all':
            divisionList = ['afr', 'asi', 'eur', 'nam', 'oce', 'sam'];
            break;
        case 'west':
            divisionList = ['nam', 'oce', 'sam'];
            break;
        case 'east':
            divisionList = ['afr', 'asi', 'eur'];
            break;
        default:
            divisionList = [divisions];
    }

    let teamsRef = collection(db, "leagues/1/teams");

    const q = query(teamsRef, where('division.id', 'in', divisionList));

    const querySnapshot = await getDocs(q);

    let teams = querySnapshot.docs.map((doc) => {
        return doc.data();
    })

    return teams;
        
}