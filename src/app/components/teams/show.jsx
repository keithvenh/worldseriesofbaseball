import { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';
import { db } from '../../../db/db';

export default function Team (props) {

    const [games, setGames] = useState(null);
    const [recentGames, setRecentGames] = useState(null);
    const [upcomingGames, setUpcomingGames] = useState(null);
    const [initializing, setInitializing] = useState(true);

    const team = props.options.team;

    async function fetchGames() {

        let gamesRef = collection(db, "leagues/1/games")
        const q1 = query(gamesRef, where('visitor', '==', team.id));
        const q2 = query(gamesRef, where('home', '==', team.id))
        let awayGames = await getDocs(q1);
        let homeGames = await getDocs(q2);
        let allGames = awayGames.docs.concat(homeGames.docs);
        allGames = allGames.map((doc) => {
            return doc.data();
        })

        let orderedGames = allGames.sort((a,b) => {
            return a.id - b.id;
        })

        setGames(allGames);
        
        const completedGames = orderedGames.filter(game => game.final)
        setRecentGames(completedGames);
    } 
    
    function getRecord(team, game = 1000) {
        const searchGames = games.filter(g => g.id <= game)
        let wins = searchGames.filter(g => g.winTeam === team).length
        let losses = searchGames.filter(g => g.loseTeam === team).length
        return `${wins}-${losses}`
    }

    useEffect(() => {
        fetchGames();
    },[])

    if(games) {
        return (
            <div className='Team'>
                <p>{team.name}</p>
                <div className='teamGames'>
                    <p>Games</p>
                    {games.map((g) => {
                        if(g.final) {
                            return(
                                <div key={g.id} className='gameSummary' onClick={() => props.appView('game', {game: g})}>
                                    <div className='headers'>
                                        <p className='gameNumber'>GAME {g.id}</p>
                                        <p className='runs'>R</p>
                                        <p className='hits'>H</p>
                                        <p className='err'>E</p>
                                    </div>
                                    <div className={`${g.winTeam == g.visitor} visitor`}>
                                        <p className='team visTeam'>{g.visitor.toUpperCase()} ({getRecord(g.visitor, g.id)})</p>
                                        <p className='runs visRuns'>{g.visRuns}</p>
                                        <p className='hits visHits'>{g.visHits}</p>
                                        <p className='err visErrors'>{g.visErrors}</p>
                                    </div>
                                    <div className={`${g.winTeam == g.home} home`}>
                                        <p className='team homeTeam'>{g.home.toUpperCase()} ({getRecord(g.home, g.id)})</p>
                                        <p className='runs homeRuns'>{g.homeRuns}</p>
                                        <p className='hits homeHits'>{g.homeHits}</p>
                                        <p className='err homeErrors'>{g.homeErrors}</p>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={g.id} className='gameSummary' onClick={() => props.appView('game', {game: g})}>
                                    <div className='headers'>
                                        <p className='gameNumber'>GAME {g.id}</p>
                                        <p className='runs'>R</p>
                                        <p className='hits'>H</p>
                                        <p className='err'>E</p>
                                    </div>
                                    <div className={`${g.winTeam == g.visitor} visitor`}>
                                        <p className='team visTeam'>{g.visitor.toUpperCase()} ({getRecord(g.visitor)})</p>
                                        <p className='runs visRuns'></p>
                                        <p className='hits visHits'></p>
                                        <p className='err visErrors'></p>
                                    </div>
                                    <div className={`${g.winTeam == g.home} home`}>
                                        <p className='team homeTeam'>{g.home.toUpperCase()} ({getRecord(g.home)})</p>
                                        <p className='runs homeRuns'></p>
                                        <p className='hits homeHits'></p>
                                        <p className='err homeErrors'></p>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className='teamRoster'>
                    
                </div>
            </div>
        )
    }
    return (
        <h2>Loading...</h2>
    )
}