import PlayerDetails from '../scorecard/PlayerDetails';

export default function Lineup(props) {

    function generateLineup(lineup) {
        let lineupSlots = []
        for(let i = 1; i < 10; i++) {
            const player = lineup[i.toString()]
            lineupSlots.push(
                <div key={i} className={`lineupSlot slot${i}`}>
                    <div className='player'>
                        <div className="PlayerDetails starter">
                            <p className="lineupSpot">{player.lineupSpot}</p>
                            <p className="name">
                                <select>
                                    <option>{player.nameDisplayRoster}</option>
                                </select>
                            </p>
                            <p className='position'>{player.position}</p>
                            <p className='range'>1</p>
                            <p className='error'>5</p>
                        </div>      
                    </div>
                </div>
            )
        }

        return lineupSlots;
    }

    if(props.lineup) {
        return (
            <div className={props.team[0] + "Lineup lineup"}>
                {generateLineup(props.lineup)}
            </div>
        )
    }

    return (
        <div className={props.team[0] + "Lineup lineup"}>
            {generateLineup(props.team[1].roster.lineups.primary)}
        </div>
    )
}