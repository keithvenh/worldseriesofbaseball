import {useState, useEffect} from 'react';
import fetchGames from '../../helpers/application/fetchGames';
import fetchTeams from '../../helpers/application/fetchTeams';

export default function RecentGames(props) {
    
    const [recentGames, setRecentGames] = useState(null);

    async function getRecentGames() {
        const teams = await fetchTeams(props.teams);
        let games = await fetchGames(teams, 'complete');
        games = games.sort((a,b) => b.id - a.id);
        const lastGame = games[0].id
        games = games.filter(g => g.id > lastGame - props.count)
        setRecentGames(games);
    }

    useEffect(() => {
        getRecentGames()
    },[]);

    if(recentGames) {
        return (
            <div className='recentGames'>
                <p className='label'>Recent</p>
                {recentGames.map((g) => {

                    return(
                        <table key={g.id} className='gameQuickLook' onClick={() => props.appView('game', {game: g})}>

                            <thead>

                                <tr className='gameQuickLookHeaders'>
                                    <th className='gameNumber'>GAME {g.id}</th>
                                    <th className='runs'>R</th>
                                    <th className='hits'>H</th>
                                    <th className='err'>E</th>
                                </tr>

                            </thead>

                            <tbody>

                                <tr className={`${g.winTeam == g.visitor} visitor`}>
                                    <td className='teamName'>{`${g.visitor.toUpperCase()} (${g.visRecord})`}</td>
                                    <td className='runs'>{g.visRuns}</td>
                                    <td className='hits'>{g.visHits}</td>
                                    <td className='err'>{g.visErrors}</td>
                                </tr>
                                <tr className={`${g.winTeam == g.home} home`}>
                                    <td className='teamName'>{`${g.home.toUpperCase()} (${g.homeRecord})`}</td>
                                    <td className='runs'>{g.homeRuns}</td>
                                    <td className='hits'>{g.homeHits}</td>
                                    <td className='err'>{g.homeErrors}</td>
                                </tr>


                            </tbody>

                        </table>
                    )
                    
                })}
            </div>
        )
    }

    return (
        <p>Loading...</p>
    )
}