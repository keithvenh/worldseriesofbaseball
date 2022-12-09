import { useState, useEffect } from 'react';
import fetchPlayers from '../../../helpers/application/fetchPlayers';
import Loading from '../../Loading';

export default function Roster(props) {

    const [mode, setMode] = useState(null);
    const [players, setPlayers] = useState(null);
    const [allPlayers, setAllPlayers] = useState([{id: 1, nameDisplay: "Fake Player"}]);
    const [initializing, setInitializing] = useState(true);
    const [playerSelectors, setPlayerSelectors] = useState([])

    function addPlayerSlot() {
        console.log(playerSelectors);
        console.log(allPlayers);
        const playerSelector = (
            <select className='playerSelector'>
                <option disabled selected key='select'>Select Player</option>
                {allPlayers.map(p => {
                    console.log(p)
                    return <option key={p.id} value={p.id}>{p.nameDisplayLastFirst}</option>
                })}
            </select>
        )
        setPlayerSelectors([...playerSelectors, playerSelector])
    }

    async function initialize() {
        const allPlayers = await fetchPlayers('all');
        if(props.team.roster.players) {
            setPlayers([...props.team.roster.players])
        } else {
            setPlayers([])
        }
        setAllPlayers(allPlayers);
        setInitializing(false);
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