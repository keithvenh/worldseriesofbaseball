import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../../db/db';

export default function Games(props) {

    const [games, setGames] = useState(null);

    async function fetchGames() {

        let gamesRef = collection(db, "leagues/1/games")
        const q = query(gamesRef, orderBy("id", "asc"));
        const querySnapshot = await getDocs(q);
        let orderedGames = querySnapshot.docs.map((doc) => {
            return doc.data();
        })

        setGames(orderedGames);
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
            <div className='Games'>
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
                                    <p className='runs visRuns'></p>
                                    <p className='hits visHits'></p>
                                    <p className='err visErrors'></p>
                                </div>
                                <div className={`${g.winTeam == g.home} home`}>
                                    <p className='team homeTeam'>{g.home.toUpperCase()} ({getRecord(g.home, g.id)})</p>
                                    <p className='runs homeRuns'></p>
                                    <p className='hits homeHits'></p>
                                    <p className='err homeErrors'></p>
                                </div>
                            </div>
                        ) 
                    }
                })}
            </div>
        )
    }

    return (
        <p>Loading Games...</p>
    )
}