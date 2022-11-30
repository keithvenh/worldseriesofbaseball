import { doc,setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../db/db';

import Games from '../../../db/games.json';
import HOFPlayers from '../../../db/hofPlayers.json';
import HOFHitCards from '../../../db/hofHitCards.json';
import HOFPitchCards from '../../../db/hofPitchCards.json';

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

    function seedHOFHitCards() {
        for(const card in HOFHitCards) {
            updateDoc(doc(db, 'players', card), {
                cardSets: {
                    HOF2014: {
                        id: HOFHitCards[card].setID,
                        name: HOFHitCards[card].setName,
                        battingRecord: {
                            ...HOFHitCards[card].battingRecord
                        }
                    }
                }
            })
        }
    }

    function seedHOFPitchCards() {
        for(const card in HOFPitchCards) {
            updateDoc(doc(db, 'players', card), {
                "cardSets.HOF2014.pitchingRecord": {
                    ...HOFPitchCards[card].pitchingRecord
                }
            })
        }
    }

    return (
        <div className='Dashboard'>
            <p className='username'>{props.user.profile.username}</p>
            {/* <button onClick={seedGames}>Seed Games</button> */}
            {/* <button onClick={seedHOFPlayers}>Seed HOF Players</button> */}
            {/* <button onClick={seedHOFHitCards}>Seed HOF HitCards</button> */}
            {/* <button onClick={seedHOFPitchCards}>Seed HOF PitchCards</button> */}
        </div>
    )
}