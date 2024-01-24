import {useState, useEffect} from 'react';

import { fetchUpcomingGames } from '../../../db/games';

import Loading from '../Loading';
import Summary from './Summary';

export default function UpcomingGames() {
    
    const [upcomingGames, setUpcomingGames] = useState(null);

    useEffect(() => {
        fetchUpcomingGames().then(games => setUpcomingGames(games))
    },[]);

    if(upcomingGames) {
        return (
            <div className='upcomingGames'>
                {upcomingGames.map(game => <Summary key={game.id} game={game} />)}
            </div>
        )
    }

    return (<Loading />)
}