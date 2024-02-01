import {Link} from 'react-router-dom'
export default function Summary({game}) {

  return (
    <Link to={`/games/${game.id}`}>
    <table className={`gameSummary final-${game.final}`}>
      <thead>
        <tr>
          <th>GAME {game.game_number}</th>
          <th>R</th>
          <th>H</th>
          <th>E</th>
        </tr>
      </thead>
      <tbody>
        <tr className={`visitor ${game.visitor === game.winner ? 'winner' : 'loser'}`}>
          <td className='team'>{game.visitor.toUpperCase()} {`(${game.visitor_wins} - ${game.visitor_losses})`}</td>
          <td>{game.final ? game.visitor_runs : ''}</td>
          <td>{game.final ? game.visitor_hits : ''}</td>
          <td>{game.final ? game.visitor_errors : ''}</td>
        </tr>
        <tr className={`home ${game.home === game.winner ? 'winner' : 'loser'}`}>
          <td className='team'>{game.home.toUpperCase()} {`(${game.home_wins} - ${game.home_losses})`}</td>
          <td>{game.final ? game.home_runs : ''}</td>
          <td>{game.final ? game.home_hits : ''}</td>
          <td>{game.final ? game.home_errors : ''}</td>
        </tr>
      </tbody>
    </table>
    </Link>
  )
}