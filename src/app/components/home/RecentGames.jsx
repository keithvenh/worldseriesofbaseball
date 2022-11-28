import { useEffect, useState } from 'react';
import { getDocs, collection, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../../db/db'

export default function RecentGames (props) {

    const [games, setGames] = useState(null);
    const [recentGames, setRecentGames] = useState(null);
    const [upcomingGames, setUpcomingGames] = useState(null);
    const [initializing, setInitializing] = useState(true);

    async function fetchGames() {

        let gamesRef = collection(db, "leagues/1/games")
        const q = query(gamesRef, orderBy("id", "desc"));
        const querySnapshot = await getDocs(q);
        let orderedGames = querySnapshot.docs.map((doc) => {
            return doc.data();
        })

        setGames(orderedGames);
        
        const completedGames = orderedGames.filter(game => game.final)
        setRecentGames(completedGames);
    } 

    useEffect(() => {
        fetchGames();
    },[])

    if(games) {
        return (
            <div className='RecentGames'>
                {games.map((g) => {
                    if(g.id > recentGames.length && g.id <= recentGames.length + 2){

                        return(
                            <div key={g.id} className='gameSummary'>
                                <div className='headers'>
                                    <p className='gameNumber'>GAME {g.id}</p>
                                    <p className='runs'>R</p>
                                    <p className='hits'>H</p>
                                    <p className='err'>E</p>
                                </div>
                                <div className={`${g.winTeam == g.visitor} visitor`}>
                                    <p className='team visTeam'>{g.visitor.toUpperCase()}</p>
                                    <p className='runs visRuns'></p>
                                    <p className='hits visHits'></p>
                                    <p className='err visErrors'></p>
                                </div>
                                <div className={`${g.winTeam == g.home} home`}>
                                    <p className='team homeTeam'>{g.home.toUpperCase()}</p>
                                    <p className='runs homeRuns'></p>
                                    <p className='hits homeHits'></p>
                                    <p className='err homeErrors'></p>
                                </div>
                            </div>
                        )
                    }
                })}
                {recentGames.map((g) => {
                    if(g.id > recentGames.length-6){

                        return(
                            <div key={g.id} className='gameSummary'>
                                <div className='headers'>
                                    <p className='gameNumber'>GAME {g.id}</p>
                                    <p className='runs'>R</p>
                                    <p className='hits'>H</p>
                                    <p className='err'>E</p>
                                </div>
                                <div className={`${g.winTeam == g.visitor} visitor`}>
                                    <p className='team visTeam'>{g.visitor.toUpperCase()}</p>
                                    <p className='runs visRuns'>{g.visRuns}</p>
                                    <p className='hits visHits'>{g.visHits}</p>
                                    <p className='err visErrors'>{g.visErrors}</p>
                                </div>
                                <div className={`${g.winTeam == g.home} home`}>
                                    <p className='team homeTeam'>{g.home.toUpperCase()}</p>
                                    <p className='runs homeRuns'>{g.homeRuns}</p>
                                    <p className='hits homeHits'>{g.homeHits}</p>
                                    <p className='err homeErrors'>{g.homeErrors}</p>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }

    return (
        <div className='RecentGames'>
            <p>Loading...</p>
        </div>
    )
}