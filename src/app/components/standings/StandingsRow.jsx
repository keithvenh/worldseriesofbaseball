
export default function StandingsRow(props) {

    const team = props.team

    return (
        <tr key={team.id} className='standingsRow' onClick={() => props.appView('teams', {subview: 'team', team: team})}>
            <td className='teamName'>{team.name}</td>
            <td className='teamWins'>{team.wins}</td>
            <td className='teamLosses'>{team.losses}</td>
            <td className='teamWinPct'>{team.winPct.toFixed(3)}</td>
            <td className='teamGB'>{team.gb}</td>
        </tr>
    )
}