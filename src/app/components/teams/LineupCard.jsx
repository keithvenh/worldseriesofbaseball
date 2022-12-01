
export default function LineupCard(props) {

    const lineup = props.lineup;

    return (
        <div className='LineupCard'>
            <div className='lineupSpot first'>
                <p>{lineup["1"].lineupSpot}</p>
                <p>{lineup["1"].nameDisplayRoster}</p>
                <p>{lineup["1"].position}</p>
            </div>
            <div className='lineupSpot second'>
                <p>{lineup["2"].lineupSpot}</p>
                <p>{lineup["2"].nameDisplayRoster}</p>
                <p>{lineup["2"].position}</p>
            </div>
            <div className='lineupSpot third'>
                <p>{lineup["3"].lineupSpot}</p>
                <p>{lineup["3"].nameDisplayRoster}</p>
                <p>{lineup["3"].position}</p>
            </div>
            <div className='lineupSpot fourth'>
                <p>{lineup["4"].lineupSpot}</p>
                <p>{lineup["4"].nameDisplayRoster}</p>
                <p>{lineup["4"].position}</p>
            </div>
            <div className='lineupSpot fifth'>
                <p>{lineup["5"].lineupSpot}</p>
                <p>{lineup["5"].nameDisplayRoster}</p>
                <p>{lineup["5"].position}</p>
            </div>
            <div className='lineupSpot sixth'>
                <p>{lineup["6"].lineupSpot}</p>
                <p>{lineup["6"].nameDisplayRoster}</p>
                <p>{lineup["6"].position}</p>
            </div>
            <div className='lineupSpot seventh'>
                <p>{lineup["7"].lineupSpot}</p>
                <p>{lineup["7"].nameDisplayRoster}</p>
                <p>{lineup["7"].position}</p>
            </div>
            <div className='lineupSpot eigth'>
                <p>{lineup["8"].lineupSpot}</p>
                <p>{lineup["8"].nameDisplayRoster}</p>
                <p>{lineup["8"].position}</p>
            </div>
            <div className='lineupSpot ninth'>
                <p>{lineup["9"].lineupSpot}</p>
                <p>{lineup["9"].nameDisplayRoster}</p>
                <p>{lineup["9"].position}</p>
            </div>
        </div>
    )
}