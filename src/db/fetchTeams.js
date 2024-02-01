import { firestoreDB } from './db';
import { collection, query, getDocs, orderBy, getDoc, doc } from 'firebase/firestore';

export async function fetchTeams() {
    let teamsRef = collection(firestoreDB, "teams");
    const q = query(teamsRef, orderBy("name"));
    const querySnapshot = await getDocs(q);
    let allTeams = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
    })

    return allTeams;
}

export async function fetchTeam(id) {
  let teamRef = doc(firestoreDB, 'teams', id);
  const docSnap = await getDoc(teamRef);

  if (docSnap.exists()) {
    return {
      id: teamRef.id,
      ...docSnap.data()
    }
  } else {
    console.log("No Document");
  }
}