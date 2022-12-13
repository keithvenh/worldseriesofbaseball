import { useEffect, useState } from 'react';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { db } from '../../../db/db';

import Loading from '../Loading';

export default function Schedule(props) {

    const [initializing, setInitializing] = useState(true);
    const [games, setGames] = useState(null);


    async function fetchGames(team) {

        let gamesRef = collection(db, "leagues/1/games")
        const q1 = query(gamesRef, where("visitor", "==", team.id));
        const q2 = query(gamesRef, where("home", "==", team.id));
        const awayGames = await getDocs(q1);
        const homeGames = await getDocs(q2);
        let teamGames = awayGames.docs.concat(homeGames.docs)
        teamGames = teamGames.map((doc) => {
            return doc.data();
        })

        let orderedGames = teamGames.sort((a, b) => a.id - b.id);

        setGames(orderedGames);
    } 

    function initialize() {
        fetchGames(props.team)
        setInitializing(false)
    }
    useEffect(() => {
        initialize();
    }, [])

    if(games) {
        return (
            <div className='teamGames'>
                <h1>Schedule</h1>
                {games.map(g => {
                    return (
                        <div key={g.id} className={`teamGame final${g.final}`} onClick={() => props.appView('game', {game: g})}>
                            <p className='gameID'>Game {g.id}</p>
                            <p className='homeAway'>
                                {props.team.id === g.home ? 'vs' : '@'}
                            </p>
                            <p className='opponent'>
                                {props.team.id === g.home ? g.visitor.toUpperCase() : g.home.toUpperCase()}
                            </p>

                            {g.final ? (
                                <div className='final'>
                                    <p className={`result win${g.winTeam === props.team.id}`}>
                                        {g.winTeam === props.team.id ? "W" : "L"}
                                    </p>
                                    <p>
                                        <span>{g.visRuns} - {g.homeRuns}</span>
                                    </p>
                                    <p>
                                        ({props.team.id === g.home ? g.homeRecord : g.visRecord})
                                    </p>
                                </div>
                            ) : ''}
                        </div>
                    )
                })}
            </div>
        )
    }
    return (<Loading />)
}