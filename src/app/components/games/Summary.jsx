export default function Summary({game}) {

  return (
    <table className='gameSummary'>
      <thead>
        <tr>
          <th>GAME {game.id - 1000}</th>
          <th>R</th>
          <th>H</th>
          <th>E</th>
        </tr>
      </thead>
      <tbody>
        <tr className={game.visitor.team === game.winner ? 'winner' : 'loser'}>
          <td className='team'>{game.visitor.team.toUpperCase()} ({game.visitor.record})</td>
          <td>{game.final ? game.visitor.runs : ''}</td>
          <td>{game.final ? game.visitor.hits : ''}</td>
          <td>{game.final ? game.visitor.errors : ''}</td>
        </tr>
        <tr className={game.home.team === game.winner ? 'winner' : 'loser'}>
          <td className='team'>{game.home.team.toUpperCase()} ({game.home.record})</td>
          <td>{game.final ? game.home.runs : ''}</td>
          <td>{game.final ? game.home.hits : ''}</td>
          <td>{game.final ? game.home.errors : ''}</td>
        </tr>
      </tbody>
    </table>
  )
}