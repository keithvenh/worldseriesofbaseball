import {useState, useEffect} from 'react';
import fetchGames from '../../helpers/application/fetchGames';
import fetchTeams from '../../helpers/application/fetchTeams';
import calculateRecords from '../../helpers/application/calculateRecords';

export default function UpcomingGames(props) {
    
    const [upcomingGames, setUpcomingGames] = useState(null);
    const [teams, setTeams] = useState(null);

    async function getUpcomingGames() {
        let teams = await fetchTeams(props.teams);
        let games = await fetchGames(teams, 'incomplete');
        setTeams(teams)
        games = games.sort((a,b) => a.id - b.id);
        const lastGame = games[0].id
        games = games.filter(g => g.id < lastGame + props.count)
        setUpcomingGames(games);
    }

    useEffect(() => {
        getUpcomingGames()
    },[]);

    if(upcomingGames && teams) {
        return (
            <div className='upcomingGames'>
                <p className='label'>Upcoming</p>
                {upcomingGames.map((g) => {
                    const vis = teams.find(t => t.id == g.visitor);
                    const home = teams.find(t => t.id == g.home)
                    return(
                        <table key={g.id} className='gameQuickLook' onClick={() => props.appView('games/game', {game: g})}>

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
                                    <td className='teamName'>{`${g.visitor.toUpperCase()} (${vis.wins}-${vis.losses})`}</td>
                                    <td className='runs'>{g.visRuns}</td>
                                    <td className='hits'>{g.visHits}</td>
                                    <td className='err'>{g.visErrors}</td>
                                </tr>
                                <tr className={`${g.winTeam == g.home} home`}>
                                    <td className='teamName'>{`${g.home.toUpperCase()} (${home.wins}-${home.losses})`}</td>
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