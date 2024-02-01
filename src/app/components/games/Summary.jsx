import {Link} from 'react-router-dom'
export default function Summary({game, classes}) {

  return (
    <Link to={`/games/${game.id}`}>
    <table className={`gameSummary ${classes}`}>
      <thead>
        <tr>
          <th>GAME {game.id - 1000}</th>
          <th>R</th>
          <th>H</th>
          <th>E</th>
        </tr>
      </thead>
      <tbody>
        <tr className={`visitor ${game.visitor.team === game.winner ? 'winner' : 'loser'}`}>
          <td className='team'>{game.visitor.team.toUpperCase()} ({game.visitor.record})</td>
          <td>{game.final ? game.visitor.runs : ''}</td>
          <td>{game.final ? game.visitor.hits : ''}</td>
          <td>{game.final ? game.visitor.errors : ''}</td>
        </tr>
        <tr className={`home ${game.home.team === game.winner ? 'winner' : 'loser'}`}>
          <td className='team'>{game.home.team.toUpperCase()} ({game.home.record})</td>
          <td>{game.final ? game.home.runs : ''}</td>
          <td>{game.final ? game.home.hits : ''}</td>
          <td>{game.final ? game.home.errors : ''}</td>
        </tr>
      </tbody>
    </table>
    </Link>
  )
}