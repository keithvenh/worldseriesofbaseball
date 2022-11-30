import { doc,setDoc } from 'firebase/firestore';
import { db } from '../../../db/db';

import Games from '../../../db/games.json';
import HOFPlayers from '../../../db/hofPlayers.json';

export default function Dashboard(props) {

    function seedGames() {
        console.log(Games);
        for(const game in Games) {
            console.log (Games[game])
            setDoc(doc(db, "leagues/1/games", game), Games[game])
        }
    }

    function seedHOFPlayers() {
        for(const player in HOFPlayers) {
            setDoc(doc(db, 'players', player), HOFPlayers[player])
        }
    }

    return (
        <div className='Dashboard'>
            <p className='username'>{props.user.profile.username}</p>
            {/* <button onClick={seedGames}>Seed Games</button> */}
            {/* <button onClick={seedHOFPlayers}>Seed HOF Players</button> */}
        </div>
    )
}