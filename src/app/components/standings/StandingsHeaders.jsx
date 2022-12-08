export default function StandingsHeader(props) {

    return (
        <thead>
            <tr>
                <th colSpan='5' className='standingsTitle'>{props.title}</th>
            </tr>
            <tr className='standingsHeaders'>
                <th>Team</th>
                <th>W</th>
                <th>L</th>
                <th>Win %</th>
                <th>GB</th>
            </tr>
        </thead>
    )
}