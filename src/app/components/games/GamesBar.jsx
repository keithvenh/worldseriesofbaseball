import {useEffect, useState} from 'react';
import axios from 'axios';
import apiUrl from '../../helpers/apiUrl';
import Summary from './Summary';

export default function GamesBar() {

  const [games, setGames] = useState(null);

  useEffect(() => {
    axios.get(apiUrl('/api/games/gamesBar')).then(res => {
      setGames(res.data);
    })
  }, [])

  if(games) {
    return (
      <div className='gamesBar'>
        <div className='recentGames'>
          {games.recentGames.map(game => <Summary key={game.id} game={game} />)}
        </div>
        <div className='upcomingGames'>
          {games.upcomingGames.map(game => <Summary key={game.id} game={game} />)}
        </div>
      </div>
    )
  }
}