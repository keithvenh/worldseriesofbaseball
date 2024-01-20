import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import { fetchTeam } from '../../../db/fetchTeams';

import Loading from '../Loading';

export default function Team() {
    const [initializing, setInitializing] = useState(true);
    const [team, setTeam] = useState(null);
    const { id } = useParams();
    const teamImage = require(`../../assets/images/${id}.webp`)

    useEffect(() => {
        fetchTeam(id).then(team => {
            console.log(team);
            setTeam(team);
            setInitializing(false);
        });
    }, [])

    if(initializing) {
        return (<Loading />)
    }
    return (
        <section className='team'>
            <div className='teamHeader'>
                <div className='teamInfo'>{team.name}</div>
                <div className='divider'></div>
                <div className='teamFlag' style={{'backgroundImage': `url(${teamImage})`}}></div>
            </div>
            <div className='teamCards'>
                {team.name}
            </div>
        </section>
    )
}