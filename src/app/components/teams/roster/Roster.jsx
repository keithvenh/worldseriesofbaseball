import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../../db/db';
import { useState, useEffect } from 'react';
import fetchPlayers from '../../../helpers/application/fetchPlayers';
import Loading from '../../Loading';
import EditRoster from './edit';
import ShowRoster from './show';

export default function Roster(props) {

    const [players, setPlayers] = useState(null);
    const [allPlayers, setAllPlayers] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const [mode, setMode] = useState(null);

    function addPlayer(playerID) {
        let player = allPlayers.find(p => p.id === parseInt(playerID))
        setPlayers({
            ...players,
            [player.id]: player
        })
    }

    function removePlayer(playerID) {
        const {[playerID]: removedProperty, ...deletedPlayers} = players;
        setPlayers(deletedPlayers);
    }

    function saveChanges() {
        updateDoc(doc(db, 'leagues/1/teams', props.team.id), {
            'roster.active': players
        }).then(() => {
            setMode('show');
        })
    }

    async function initialize() {
        const allPlayers = await fetchPlayers('all');
        if(props.team.roster.active) {
            setPlayers(props.team.roster.active)
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
                <EditRoster 
                    players={players}
                    allPlayers={allPlayers}
                    addPlayer={addPlayer}
                    removePlayer={removePlayer}
                    saveChanges={saveChanges}
                    setMode={setMode}
                />
            )
        }
        return (
            <ShowRoster players={players} setMode={setMode} />
        )
    }
}