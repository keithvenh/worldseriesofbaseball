import {useState, useEffect} from 'react';

import { fetchRecentGames } from '../../../db/games';

import Loading from '../Loading';
import Summary from './Summary';

export default function RecentGames(props) {
    
    const [recentGames, setRecentGames] = useState(null);

    useEffect(() => {
        fetchRecentGames().then(games => setRecentGames(games))
    },[]);

    if(recentGames) {
        return (
            <div className='recentGames'>
                {recentGames.map(game => <Summary key={game.id} game={game} />)}
            </div>
        )
    }

    return (<Loading />)
}