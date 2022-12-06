import LineupSlot from "./LineupSlot";
import PlayerDetails from './PlayerDetails';
import PlateAppearance from './PlateAppearance';

function Scorecard(props) {
    const lineup = props.team.roster.lineups.primary

    function generateInnings() {
        let innings = [];
        for(let i = 1; i < 11; i++) {
            innings.push(
                <div key={`inning${i}`} className={`inning inning${i}`}>
                    <p className='inningHeader'>{i}</p>
                    {generatePAs()}
                </div>)
        }

        function generatePAs(inning) {
            let boxes = [];
            for(let pa= 0; pa < 9; pa++) {
                boxes.push(
                    <div key={`${inning}-${pa}`}className={`pa pa${inning}-${pa}`}>
                        <PlateAppearance />
                    </div>
                )
            }

            return boxes;
        }

        return innings;
    }

    function generateLineup() {
        let lineupSlots = []
        for(let i = 1; i < 10; i++) {
            lineupSlots.push(
                <div key={i} className={`lineupSlot slot${i}`}>
                    <div className='player'>
                        <PlayerDetails starter={true} player={lineup[i.toString()]} />
                        <PlayerDetails />
                        <PlayerDetails />
                    </div>
                </div>
            )
        }

        return lineupSlots;
    }

    return (
        <div className="Scorecard">
            <div className='lineup'>
                <div className='lineupSpot headers'>
                    <p className="lineupSpot">#</p>
                    <p className="name">Player</p>
                    <p className='position'>POS</p>
                    <p className='range'>R</p>
                    <p className='error'>eRat</p>
                </div>
                {generateLineup()}
            </div>
            {generateInnings()}
            
        </div>
    );
}

export default Scorecard