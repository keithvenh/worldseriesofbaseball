import {useNavigate} from 'react-router-dom';

export default function DivisionStandings({standings, teams, label}) {

  const navigate = useNavigate();
  standings.sort((a, b) => {
    if(a.pct > b.pct) {
      return -1;
    }
    if(a.pct < b.pct) {
      return 1;
    }
    return 0;
  })

  function gamesBack(allTeams, team) {
    const leadTeam = {wins: allTeams[0].wins, losses: allTeams[0].losses}
    const gb = ((leadTeam.wins - team.wins) + (team.losses - leadTeam.losses)) / 2

    if(gb == 0) {
      return '-';
    }

    return gb.toFixed(1);
  }

  
  
  return (
    <tbody key={label}>
      <tr className='standingsHeader'>
        <th className='divisionTitle'>{label}</th>
        <th className='teamWins'>W</th>
        <th className='teamLosses'>L</th>
        <th className='teamWinPct'>W%</th>
        <th className='teamGB'>GB</th>
        <th className='teamRuns'>RS</th>
        <th className='teamRunsAllowed'>RA</th>
        <th className='teamRunDiff'>DIFF</th>
        <th className='teamHome'>Home</th>
        <th className='teamAway'>Away</th>
      </tr>
      {standings.map(t => {
        const team = teams.filter(team => team.id === t.team_id)
        return (
          <tr className='standingsData' key={t.team_id} onClick={() => navigate(`/teams/${t.team_id}`)}>
            <td className='teamName'>{team[0].name || t.team_id}</td>
            <td className='teamWins'>{t.wins}</td>
            <td className='teamLosses'>{t.losses}</td>
            <td className='teamWinPct'>{t.pct.toFixed(3)}</td>
            <td className='teamGB'>{gamesBack(standings, t)}</td>
            <td className='teamRuns'>{t.rs}</td>
            <td className='teamRunsAllowed'>{t.ra}</td>
            <td className='teamRunDiff'>{t.diff}</td>
            <td className='teamHome'>{t.home_wins}-{t.home_losses}</td>
            <td className='teamAway'>{t.away_wins}-{t.away_losses}</td>
          </tr>
        )
      })}

    </tbody>
  )
}