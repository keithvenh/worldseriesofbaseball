import {useEffect, useState} from 'react'
import axios from 'axios';
import apiUrl from '../../../helpers/apiUrl';

export default function Roster({teamId}) {

    const [roster, setRoster] = useState();

    useEffect(() => {
        axios.get(apiUrl(`/api/teams/${teamId}/roster`)).then(res => {
            console.log(res.data);
            setRoster(res.data);
        })
    }, [])

    if(roster) {
        return (
            <div className='roster'>
                <h2>Roster</h2>
                {roster.map(player => {
                return <p key={player.id}>
                    {player.id} | 
                    {player.altid} | 
                    {player.last_name}, 
                    {player.first_name} | {player.primary_pos}
                    </p>
            })}
            </div>
        )
    }
}