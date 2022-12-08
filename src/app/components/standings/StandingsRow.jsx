
export default function StandingsRow(props) {

    const team = props.team
    let currentTeam = false;
    if(props.currentTeam) {
        currentTeam = team.id === props.currentTeam.id;
    }

    return (
        <tr key={team.id} className={`standingsRow ${currentTeam}`} onClick={() => props.appView(`teams/team/${team.id}`, {team: team})}>
            <td className='teamName'>{team.name}</td>
            <td className='teamWins'>{team.wins}</td>
            <td className='teamLosses'>{team.losses}</td>
            <td className='teamWinPct'>{team.winPct.toFixed(3)}</td>
            <td className='teamGB'>{team.gb}</td>
        </tr>
    )
}