import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getDocs, query, where, collection } from 'firebase/firestore';
import { firestoreDB } from '../../../db/db';

import Loading from '../Loading';

export default function Schedule(props) {

    const [initializing, setInitializing] = useState(true);
    const [games, setGames] = useState(null);
    const { id } = useParams();
    const teamImage = require(`../../assets/images/${id}.webp`)


    async function fetchGames(teamId) {

        let gamesRef = collection(firestoreDB, "leagues/1/games")
        const q1 = query(gamesRef, where("visitor", "==", teamId));
        const q2 = query(gamesRef, where("home", "==", teamId));
        const awayGames = await getDocs(q1);
        const homeGames = await getDocs(q2);
        let teamGames = awayGames.docs.concat(homeGames.docs)
        teamGames = teamGames.map((doc) => {
            return doc.data();
        })

        let orderedGames = teamGames.sort((a, b) => a.id - b.id);

        setGames(orderedGames);
    } 

    useEffect(() => {
    }, [])

    if(games) {
        return (
            <section className='teamSchedule'>

                <div className='scheduleFilters'>
                    <p>Home Games</p>
                    <p>Away Games</p>
                    <p>Completed Games</p>
                    <p>Upcoming Games</p>
                    <p>Opponent</p>
                </div>

                <div className='teamGames'>
                    {games.map(g => {
                        const oppImage = require(`../../assets/images/${id === g.home ? g.visitor : g.home}.webp`);
                        return (
                            <>
                                <div className='gameID'>Game {g.id}</div>
                                <div className='homeAway'>
                                    {id === g.home ? 'vs' : '@'}
                                </div>
                                <div className='opponent'>
                                    {id === g.home ? g.visitor.toUpperCase() : g.home.toUpperCase()}
                                </div>
                                <div className='oppFlag'>
                                    <img src={oppImage} />
                                </div>
                                <div className={`result win${g.winTeam === id}`}>
                                    {g.final ? (g.winTeam === id ? "W" : "L") : ''}
                                </div>
                                <div>
                                    {g.final ? (<span>{g.visRuns} - {g.homeRuns}</span>) : ''}
                                </div>
                                <div>
                                    {g.final ? `(${id === g.home ? g.homeRecord : g.visRecord})` : ''}
                                </div>
                                <div className='emptySpan'></div>
                            </>
                        )
                    })}
                </div>
            </section>
        )
    }
    return (<Loading />)
}