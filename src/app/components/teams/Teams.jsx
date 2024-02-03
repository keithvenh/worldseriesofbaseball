import { useState, useEffect} from 'react';
import { fetchTeams } from '../../../db/fetchTeams';
import TeamCard from './TeamCard';
import Loading from '../Loading';

import axios from 'axios';
import apiUrl from '../../helpers/apiUrl';

export default function Teams() {

    const [teams, setTeams] = useState(null);

    useEffect(() => {
        axios.get(apiUrl('/api/teams')).then(res => {
            console.log(res);
            setTeams(res.data)
        })
    }, [])

    if(teams) {
        return (
            <section className='teams'>
                <div className='teamCards'>
                    {teams.map(team => <TeamCard team={team} key={team.id}/>)}
                </div>
            </section>
        )
    }
    return (<Loading />)
}