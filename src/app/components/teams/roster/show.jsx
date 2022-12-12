
export default function ShowRoster(props) {

    function displayPlayers() {
        let playersDisplay = Object.keys(props.players).map((player, index) => {
            return (
                <div key={player}className='activePlayer'>
                    <p>{props.players[player].nameDisplayLastFirst}</p>
                </div>
            )
        })

        return playersDisplay;
    }

    return (
        <div className="Roster">
            <h2 className='rosterHeader'>Active Roster</h2>
            {displayPlayers()}
            <div className='buttonContainer'>
                <div id='editButton' className='button edit' onClick={() => {props.setMode('edit')}}><i className='fa-solid fa-pencil'></i> Edit</div>
            </div>
        </div>
    )
}