import { doc,setDoc } from 'firebase/firestore';
import { db } from '../../../db/db';

import Games from '../../../db/games.json';

export default function Dashboard(props) {

    function seedGames() {
        console.log(Games);
        for(const game in Games) {
            console.log (Games[game])
            setDoc(doc(db, "leagues/1/games", game), Games[game])
        }
    }

    return (
        <div className='Dashboard'>
            <p className='username'>{props.user.profile.username}</p>
            {/* <button onClick={seedGames}>Seed Games</button> */}
        </div>
    )
}