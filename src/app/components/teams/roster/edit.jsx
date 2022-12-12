import { useState } from 'react';

export default function EditRoster(props) {

    const [selectValue, setSelectValue] = useState('select');

    function changeHandler(event) {
        event.preventDefault();
        console.log(event);
        setSelectValue(event.target.value);
    }

    function displayPlayers() {
        let playersDisplay = Object.keys(props.players).map((player, index) => {
            return (
                <div key={player}className='activePlayer'>
                    <div id='removeButton' className='button remove' onClick={() => props.removePlayer(player)}><i className='fa-solid fa-circle-minus'></i></div>
                    <p className='playerName'>{props.players[player].nameDisplayLastFirst}</p>
                </div>
            )
        })

        return playersDisplay;
    }

    function addHandler() {
        setSelectValue('select');
        props.addPlayer(selectValue);
    }

    return (
        <div className="Roster">
            <div className='buttonContainer'>
                <div id='backButton' className='button back' onClick={() => props.setMode('show')}><i className='fa-solid fa-circle-xmark'></i> Back</div>
                <div id='saveButton' className='button save' onClick={props.saveChanges}><i className='fa-solid fa-floppy-disk'></i> Save</div>
            </div>
            <div className='playerSelect'>
                <select id='playerSelector' value={selectValue} onChange={e => changeHandler(e)} className='playerSelector'>
                    <option disabled key='select' value='select'>Select Player</option>
                    {props.allPlayers.map(p => {
                        return <option key={p.id} value={p.id}>{p.nameDisplayLastFirst}</option>
                    })}
                </select>
                <div id='addButton' className='button add' onClick={addHandler}><i className='fa-solid fa-circle-plus'></i></div>
            </div>
            <hr />
            {displayPlayers()}
        </div>
    )
}