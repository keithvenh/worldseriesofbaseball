import { useState, useEffect } from 'react';
import fetchPlayers from '../../../helpers/application/fetchPlayers';
import Loading from '../../Loading';

export default function Roster(props) {

    const [mode, setMode] = useState(null);
    const [players, setPlayers] = useState(null);
    const [allPlayers, setAllPlayers] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const [playerSelectors, setPlayerSelectors] = useState([]);

    function changeHandler(event) {
        let player = allPlayers.find(p => p.id === parseInt(event.target.value));
        setPlayers({
            ...players,
            [player.id]: player
        })
        console.log(playerSelectors)
        playerSelectors.splice(event.target.id, 1);
        console.log(playerSelectors);
        setPlayerSelectors([...playerSelectors])
    }

    function addPlayerSlot() {
        const playerSelector = (
            <select id={playerSelectors.length} key={playerSelectors.length} defaultValue='select' onChange={e => changeHandler(e)} className='playerSelector'>
                <option disabled key='select' value='select'>Select Player</option>
                {allPlayers.map(p => {
                    return <option key={p.id} value={p.id}>{p.nameDisplayLastFirst}</option>
                })}
            </select>
        )
        setPlayerSelectors([...playerSelectors, playerSelector])
    }

    async function initialize() {
        const allPlayers = await fetchPlayers('all');
        if(props.team.roster.players) {
            setPlayers(props.team.roster.players)
        } else {
            setPlayers([])
        }
        setAllPlayers(allPlayers);
        setInitializing(false);
    }

    function displayPlayers() {
        let playersDisplay = Object.keys(players).map((player, index) => {
            console.log(players[player].nameDisplayLastFirst)
            return <p key={player}>{players[player].nameDisplayLastFirst}</p>
        })

        return playersDisplay;
    }

    if(initializing) {
        initialize();
        return (<Loading />)
    }

    if(players && allPlayers) {
        if(mode == 'edit') {
            return (
                <div className="Roster">
                    <p>Roster Edit Page</p>
                    <div id='editRoster'>
                        {displayPlayers()}
                        <hr />
                        {playerSelectors}
                    </div>
                    <div id='addButtom' className='button add' onClick={addPlayerSlot}><i className='fa-solid fa-circle-plus'></i></div>
                    <div id='saveButton' className='button save' onClick={() => setMode('show')}><i className='fa-solid fa-floppy-disk'></i> Save</div>
                </div>
            )
        }
        return (
            <div className="Roster">
                <p>Roster Show Page</p>
                {players.map((p) => <p>{p.nameDisplay}</p>)}
                
                <div id='editButton' className='button edit' onClick={() => {setMode('edit')}}><i className='fa-solid fa-pencil'></i> Edit</div>
            </div>
        )
    }
}